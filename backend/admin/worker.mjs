/* Proposed Cloudflare Access reporting backend. No private data enters Pages. */
export const PROPERTIES = Object.freeze({production:'557084016',staging:'557077138'});
const EVENTS = [['Résumé downloads','resume_download'],['Portfolio clicks','portfolio_click'],['Outbound clicks','outbound_click'],['Contact clicks','contact_click']];
const decoder = new TextDecoder();
const decode = value => Uint8Array.from(atob(value.replace(/-/g,'+').replace(/_/g,'/')), c=>c.charCodeAt(0));
const encode = value => btoa(String.fromCharCode(...new Uint8Array(value))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
const json = (value,status=200) => new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
let googleToken, keyCache;
export async function authorize(request,env,fetcher=fetch) {
  if(!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || !env.OWNER_EMAIL) return null;
  const raw=request.headers.get('Cf-Access-Jwt-Assertion');if(!raw)return null;
  try {
    const parts=raw.split('.');if(parts.length!==3)return null;
    const header=JSON.parse(decoder.decode(decode(parts[0]))),claims=JSON.parse(decoder.decode(decode(parts[1])));
    const issuer=`https://${env.ACCESS_TEAM_DOMAIN}`;
    const now=Math.floor(Date.now()/1000);
    if(header.alg!=='RS256'||claims.iss!==issuer||!Array.isArray(claims.aud)||!claims.aud.includes(env.ACCESS_AUD)||!Number.isFinite(claims.exp)||claims.exp<=now||!Number.isFinite(claims.iat)||claims.iat>now+30||(claims.nbf&&claims.nbf>now+30))return null;
    if(!keyCache||keyCache.issuer!==issuer||keyCache.until<Date.now()){const response=await fetcher(issuer+'/cdn-cgi/access/certs');if(!response.ok)return null;keyCache={issuer,keys:(await response.json()).keys,until:Date.now()+300000};}
    const jwk=keyCache.keys.find(k=>k.kid===header.kid);if(!jwk)return null;
    const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
    if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode(parts[2]),new TextEncoder().encode(parts[0]+'.'+parts[1])))return null;
    if(typeof claims.email!=='string')return null;
    const email=claims.email.toLowerCase();
    const readers=(env.READ_ONLY_EMAILS||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
    // Checked on every request, including cached reports: removing a reader revokes data access.
    if(email!==env.OWNER_EMAIL.toLowerCase()&&!readers.includes(email))return null;
    return {email,role:email===env.OWNER_EMAIL.toLowerCase()?'owner':'reader'};
  }catch(_){return null;}
}
async function token(env) {
  if(googleToken?.expires>Date.now()+60000)return googleToken.value;
  if(!env.GA_CLIENT_EMAIL||!env.GA_PRIVATE_KEY)throw new Error('Reporting credentials not configured');
  const now=Math.floor(Date.now()/1000), text=new TextEncoder();
  const head=encode(text.encode(JSON.stringify({alg:'RS256',typ:'JWT'})));
  const body=encode(text.encode(JSON.stringify({iss:env.GA_CLIENT_EMAIL,scope:'https://www.googleapis.com/auth/analytics.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600})));
  const pem=env.GA_PRIVATE_KEY.replace(/\\n/g,'\n').replace(/-----[^-]+-----/g,'').replace(/\s/g,'');
  const key=await crypto.subtle.importKey('pkcs8',decode(pem),{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);
  const signature=encode(await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,text.encode(head+'.'+body)));
  const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:head+'.'+body+'.'+signature})});
  if(!response.ok)throw new Error('Reporting authentication unavailable');
  const data=await response.json();googleToken={value:data.access_token,expires:Date.now()+data.expires_in*1000};return googleToken.value;
}
export function dateRanges(days,now=new Date()) {
  if(![7,28,90].includes(days))throw new Error('Invalid period');
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  const end=new Date(today+'T12:00:00Z');end.setUTCDate(end.getUTCDate()-1);
  const start=new Date(end);start.setUTCDate(start.getUTCDate()-days+1);
  const previousEnd=new Date(start);previousEnd.setUTCDate(previousEnd.getUTCDate()-1);
  const previousStart=new Date(previousEnd);previousStart.setUTCDate(previousStart.getUTCDate()-days+1);
  const iso=d=>d.toISOString().slice(0,10);return {start:iso(start),end:iso(end),previousStart:iso(previousStart),previousEnd:iso(previousEnd)};
}
export function reportRequests(range) {
  const dateRanges=[{startDate:range.start,endDate:range.end,name:'current'},{startDate:range.previousStart,endDate:range.previousEnd,name:'previous'}];
  const req=(dimensions,metrics,extra={})=>({dateRanges:[dateRanges[0]],dimensions:dimensions.map(name=>({name})),metrics:metrics.map(name=>({name})),...extra});
  const ordered=metric=>({orderBys:[{metric:{metricName:metric},desc:true}],limit:'10'});
  return [
    req([],['activeUsers','sessions','screenPageViews','engagementRate'],{dateRanges}),
    req(['date'],['activeUsers'],{dateRanges,orderBys:[{dimension:{dimensionName:'date'}}]}),
    req(['sessionDefaultChannelGroup'],['sessions'],ordered('sessions')),
    req(['pagePath'],['screenPageViews'],ordered('screenPageViews')),
    req(['eventName'],['eventCount'],{dimensionFilter:{filter:{fieldName:'eventName',inListFilter:{values:EVENTS.map(e=>e[1])}}}}),
    req(['deviceCategory'],['sessions'],ordered('sessions')),
    req(['country'],['activeUsers'],ordered('activeUsers'))
  ];
}
function rows(report) {
  const dims=(report.dimensionHeaders||[]).map(h=>h.name);
  return (report.rows||[]).map(row=>({dimensions:Object.fromEntries(dims.map((d,i)=>[d,row.dimensionValues?.[i]?.value])),metrics:(row.metricValues||[]).map(v=>Number(v.value))}));
}
export function normalize(reports,range,days) {
  if(reports.length!==7)throw new Error('Incomplete reports');
  const summary=rows(reports[0]),current=summary.find(r=>r.dimensions.dateRange==='current'||r.dimensions.dateRange==='date_range_0'),previous=summary.find(r=>r.dimensions.dateRange==='previous'||r.dimensions.dateRange==='date_range_1');
  const daily=rows(reports[1]);
  const series=(start,label)=>Array.from({length:days},(_,i)=>{const date=new Date(start+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+i);const key=date.toISOString().slice(0,10).replace(/-/g,'');return daily.find(r=>r.dimensions.date===key&&r.dimensions.dateRange===label)?.metrics[0]||0;});
  const list=(report,dimension)=>rows(report).map(r=>({label:r.dimensions[dimension]||'(not set)',value:r.metrics[0]}));
  const eventRows=rows(reports[4]);
  const metadata=reports.map(r=>r.metadata||{}),sampling=metadata.some(m=>m.samplingMetadatas?.length),thresholded=metadata.some(m=>m.subjectToThresholding),other=metadata.some(m=>m.dataLossFromOtherRow);
  return {range,current:current?.metrics||[0,0,0,0],previous:previous?.metrics||[0,0,0,0],trend:series(range.start,'current'),previousTrend:series(range.previousStart,'previous'),sources:list(reports[2],'sessionDefaultChannelGroup'),pages:list(reports[3],'pagePath'),devices:list(reports[5],'deviceCategory'),locations:list(reports[6],'country'),events:EVENTS.map(([label,name])=>({label,name,value:eventRows.find(r=>r.dimensions.eventName===name)?.metrics[0]??null})),refreshedAt:new Date().toISOString(),status:'fresh',dataQuality:[sampling?'Sampled report':null,thresholded?'Privacy thresholds may withhold rows':null,other?'Some dimensions grouped into (other)':null,'GA4 processing may delay data 24–48 hours'].filter(Boolean).join(' · ')};
}
async function reports(env,environment,days) {
  const range=dateRanges(days),requests=reportRequests(range),access=await token(env),output=[];
  for(let i=0;i<requests.length;i+=5){const response=await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTIES[environment]}:batchRunReports`,{method:'POST',headers:{Authorization:`Bearer ${access}`,'Content-Type':'application/json'},body:JSON.stringify({requests:requests.slice(i,i+5)})});if(!response.ok){const error=new Error('GA4 reports unavailable');error.status=response.status===429?429:502;throw error;}output.push(...(await response.json()).reports);}
  return normalize(output,range,days);
}
async function health(environment) {
  const origin=environment==='production'?'https://johnapaz.com':'https://staging.johnapaz.com';
  const checkedAt=new Date().toISOString();
  try{const response=await fetch(origin+'/build-info.json',{redirect:'error',signal:AbortSignal.timeout(8000),cf:{cacheTtl:0}});if(!response.ok)return {status:'unknown',checkedAt,reason:'Build metadata unavailable; this is not proof the site is down.'};const info=await response.json();return {status:'operational',checkedAt,commit:info.commit,reason:'HTTPS build metadata responded. This is a point-in-time check, not measured uptime.',sourceStatus:'Source comparison not connected'};}catch(_){return {status:'unknown',checkedAt,reason:'Health check unavailable; no current availability evidence.'};}
}
export default {
  async fetch(request,env,ctx) {
    const url=new URL(request.url);
    if(!await authorize(request,env))return json({error:'Sign-in required or access revoked'},403);
    if(request.method!=='GET')return json({error:'Read-only dashboard'},405);
    if(url.pathname==='/api/reports') {
      const environment=url.searchParams.get('environment'),days=Number(url.searchParams.get('days'));
      if(!Object.hasOwn(PROPERTIES,environment)||![7,28,90].includes(days))return json({error:'Invalid environment or period'},400);
      // Canonical server-controlled property IDs, never browser-supplied property IDs.
      const range=dateRanges(days),cacheKey=new Request(url.origin+`/__report-cache/${environment}/${days}/${range.end}`);
      const cached=await caches.default.match(cacheKey);let prior=cached?await cached.json():null;
      if(prior&&Date.now()-Date.parse(prior.refreshedAt)<300000)return json({...prior,ops:await health(environment)});
      try{const result=await reports(env,environment,days);ctx.waitUntil(caches.default.put(cacheKey,new Response(JSON.stringify(result),{headers:{'Cache-Control':'max-age=1800'}})));return json({...result,ops:await health(environment)});}catch(error){if(prior&&Date.now()-Date.parse(prior.refreshedAt)<1800000)return json({...prior,status:'stale',dataQuality:'Refresh failed; showing the last successful report.',ops:await health(environment)});return json({error:'Reports unavailable'},error.status||503);}
    }
    if(url.pathname.startsWith('/api/'))return json({error:'Not found'},404);
    const asset=await env.ASSETS.fetch(request);
    const response=new Response(asset.body,asset);response.headers.set('Cache-Control','private, no-store');response.headers.set('X-Robots-Tag','noindex, nofollow');response.headers.set('X-Content-Type-Options','nosniff');response.headers.set('Referrer-Policy','same-origin');response.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");return response;
  }
};
