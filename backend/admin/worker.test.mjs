import test from 'node:test';import assert from 'node:assert/strict';import worker,{authorize,dateRanges,reportRequests,normalize,PROPERTIES} from './worker.mjs';
const enc=new TextEncoder();const b64=bytes=>Buffer.from(bytes).toString('base64url');
let keys=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
const jwk=await crypto.subtle.exportKey('jwk',keys.publicKey);jwk.kid='test-key';
const env={ACCESS_TEAM_DOMAIN:'example.cloudflareaccess.com',ACCESS_AUD:'admin-aud',OWNER_EMAIL:'owner@example.com',READ_ONLY_EMAILS:'reader@example.com'};
const fetcher=async()=>new Response(JSON.stringify({keys:[jwk]}));
async function request(email,overrides={}){const now=Math.floor(Date.now()/1000);const h=b64(enc.encode(JSON.stringify({alg:'RS256',kid:'test-key'}))),p=b64(enc.encode(JSON.stringify({iss:'https://example.cloudflareaccess.com',aud:['admin-aud'],exp:now+60,iat:now,email,...overrides})));const s=b64(await crypto.subtle.sign('RSASSA-PKCS1-v1_5',keys.privateKey,enc.encode(h+'.'+p)));return new Request('https://admin.example.com/api/reports',{headers:{'Cf-Access-Jwt-Assertion':h+'.'+p+'.'+s}});}
test('logged-out, unconfigured, forged, expired and wrong-audience requests denied',async()=>{
 assert.equal(await authorize(new Request('https://admin.example.com'),env,fetcher),null);
 assert.equal((await worker.fetch(new Request('https://admin.example.com'),{},{})).status,403);
 for(const patch of [{exp:1},{aud:['other']},{iss:'https://evil.example'},{iat:Math.floor(Date.now()/1000)+600}])assert.equal(await authorize(await request('owner@example.com',patch),env,fetcher),null);
 const forged=await request('owner@example.com');forged.headers.set('Cf-Access-Jwt-Assertion',forged.headers.get('Cf-Access-Jwt-Assertion').slice(0,-8)+'AAAAAAAA');assert.equal(await authorize(forged,env,fetcher),null);
});
test('owner and reader authorized, unknown identity denied, revocation checked against current allowlist',async()=>{
 assert.equal((await authorize(await request('owner@example.com'),env,fetcher)).role,'owner');const reader=await request('reader@example.com');assert.equal((await authorize(reader,env,fetcher)).role,'reader');assert.equal(await authorize(reader,{...env,READ_ONLY_EMAILS:''},fetcher),null);assert.equal(await authorize(await request('stranger@example.com'),env,fetcher),null);
});
test('calendar periods cross month/year and exclude current New York day',()=>{
 assert.deepEqual(dateRanges(7,new Date('2026-01-01T02:00Z')),{start:'2025-12-24',end:'2025-12-30',previousStart:'2025-12-17',previousEnd:'2025-12-23'});assert.throws(()=>dateRanges(8));assert.notEqual(PROPERTIES.production,PROPERTIES.staging);
});
const report=(dims,records)=>({dimensionHeaders:dims.map(name=>({name})),rows:records.map(([d,m])=>({dimensionValues:d.map(value=>({value})),metricValues:m.map(value=>({value:String(value)}))}))});
test('GA4 mapping separates periods, preserves absent events, and handles suppressed/sampled rows',()=>{
 const range=dateRanges(7,new Date('2026-10-02T13:00Z'));const requests=reportRequests(range);assert.equal(requests.length,7);assert.equal(requests[0].dateRanges[1].name,'previous');assert.equal(requests[2].dimensions[0].name,'sessionDefaultChannelGroup');
 const summary=report(['dateRange'],[[['current'],[10,15,30,.6]],[['previous'],[5,8,20,.5]]]);const trend=report(['date','dateRange'],[[['20261001','current'],[9]],[['20260924','previous'],[4]]]);const event=report(['eventName'],[[['contact_click'],[2]]]);event.metadata={subjectToThresholding:true};
 const result=normalize([summary,trend,report(['sessionDefaultChannelGroup'],[[['Direct'],[15]]]),report(['pagePath'],[[['/'],[30]]]),event,report(['deviceCategory'],[]),report(['country'],[])],range,7);
 assert.deepEqual(result.current,[10,15,30,.6]);assert.deepEqual(result.previous,[5,8,20,.5]);assert.equal(result.trend[6],9);assert.equal(result.previousTrend[6],4);assert.equal(result.events[0].value,null);assert.equal(result.events[3].value,2);assert.match(result.dataQuality,/Privacy thresholds/);assert.throws(()=>normalize([],range,7));
});
test('protected endpoints are read-only, environment inputs are constrained, and assets require identity',async()=>{
 const owner=await request('owner@example.com');const headers=owner.headers;
 assert.equal((await worker.fetch(new Request('https://admin.example.com/api/reports?environment=evil&days=7',{headers}),env,{})).status,400);
 assert.equal((await worker.fetch(new Request('https://admin.example.com/api/reports?environment=production&days=8',{headers}),env,{})).status,400);
 assert.equal((await worker.fetch(new Request('https://admin.example.com/api/reports',{headers,method:'POST'}),env,{})).status,405);
 assert.equal((await worker.fetch(new Request('https://admin.example.com/index.html'),env,{})).status,403);
});
