(() => {
  'use strict';
  const root = document.querySelector('.admin-dashboard');
  if (!root) return;
  const preview = root.dataset.mode === 'preview';
  const $ = id => document.getElementById(id);
  const nf = new Intl.NumberFormat('en-US');
  let environment = 'production', requestNumber = 0;
  const names = ['Active users', 'Sessions', 'Page views', 'Engagement rate'];
  const definitions = ['Distinct users active in this period.', 'Visits, including returning visitors.', 'Views of pages; repeat views included.', 'Sessions lasting 10+ seconds, with a key event, or 2+ views.'];
  function node(tag, text, cls) { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
  function empty(id, text) { $(id).replaceChildren(node('p', text, 'admin-empty')); }
  function dates(days) {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year:'numeric',month:'2-digit',day:'2-digit' }).format(new Date());
    const end = new Date(today + 'T12:00:00Z'); end.setUTCDate(end.getUTCDate() - 1);
    const start = new Date(end); start.setUTCDate(start.getUTCDate() - days + 1);
    const previousEnd = new Date(start); previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
    const previousStart = new Date(previousEnd); previousStart.setUTCDate(previousStart.getUTCDate() - days + 1);
    const iso = d => d.toISOString().slice(0,10);
    return {start:iso(start),end:iso(end),previousStart:iso(previousStart),previousEnd:iso(previousEnd)};
  }
  function illustrative(days) {
    const scale = environment === 'production' ? 1 : .09;
    const series = Array.from({length:days}, (_, i) => Math.round(scale * (32 + i * .9 + 14 * Math.sin(i * .8) + (i % 7 === 0 ? 17 : 0))));
    const previous = series.map((n,i) => Math.round(n * (.7 + .1 * Math.sin(i))));
    const sessions = Math.round(series.reduce((a,b)=>a+b,0)*1.3);
    const portions = (total, labels, weights) => {let remaining=total;return labels.map((label,i)=>{const value=i===labels.length-1?remaining:Math.round(total*weights[i]);remaining-=value;return {label,value};});};
    const users = Math.round(sessions*.64);
    return { range:dates(days), current:[users,sessions,Math.round(sessions*2.2),.642], previous:[Math.round(users*.76),Math.round(sessions*.8),Math.round(sessions*1.8),.603], trend:series, previousTrend:previous,
      sources:portions(sessions,['Organic Search','Direct','Organic Social','Referral','Unassigned'],[.42,.28,.17,.1,.03]),
      pages:portions(Math.round(sessions*2.2),['/','/resume/','/writing/','/coding/','/about/'],[.37,.25,.19,.11,.08]),
      devices:portions(sessions,['Desktop','Mobile','Tablet'],[.55,.42,.03]), locations:portions(users,['United States','Puerto Rico','United Kingdom','Canada','Other'],[.7,.12,.08,.06,.04]),
      events:[{label:'Résumé downloads',name:'resume_download',value:Math.round(sessions*.024)},{label:'Portfolio clicks',name:'portfolio_click',value:Math.round(sessions*.047)},{label:'Outbound clicks',name:'outbound_click',value:Math.round(sessions*.035)},{label:'Contact clicks',name:'contact_click',value:Math.round(sessions*.008)}], refreshedAt:new Date().toISOString(), status:'preview', ops:{status:'unknown',reason:'Live health checks are not connected in this preview.'} };
  }
  function metrics(report) {
    $('admin-metrics').replaceChildren(...names.map((name,i)=>{
      const card=node('article',undefined,'admin-metric'); card.append(node('h2',name));
      const value=report?.current?.[i], old=report?.previous?.[i];
      card.append(node('p',value==null?'—':i===3?(value*100).toFixed(1)+'%':nf.format(value),'admin-metric-value'));
      let change='Comparison unavailable';
      if(value!=null && old!=null) change=i===3?`${((value-old)*100)>=0?'+':''}${((value-old)*100).toFixed(1)} pp vs previous period`:old===0?(value===0?'No change vs previous period':'No previous-period baseline'):`${value>=old?'+':''}${((value-old)/old*100).toFixed(1)}% vs previous period`;
      card.append(node('p',change,'admin-metric-compare'),node('p',definitions[i],'admin-metric-definition'));return card;
    }));
  }
  function bars(id, rows, shares) {
    if(!rows?.length) return empty(id,'No data returned for this period.');
    const total=rows.reduce((s,r)=>s+r.value,0), max=Math.max(...rows.map(r=>r.value),1);
    $(id).replaceChildren(...rows.map(r=>{
      const row=node('div',undefined,'admin-bar-row'), label=node('div',undefined,'admin-bar-label');label.append(node('span',r.label),node('span',nf.format(r.value)+(shares&&total?' · '+Math.round(r.value/total*100)+'%':'')));
      const track=node('div',undefined,'admin-bar-track'), fill=node('div',undefined,'admin-bar-fill');track.setAttribute('aria-hidden','true');fill.style.width=(r.value/max*100)+'%';track.append(fill);row.append(label,track);return row;
    }));
  }
  function chart(current, previous, range) {
    if(!current?.length) return empty('traffic-chart','No daily audience data returned.');
    const ns='http://www.w3.org/2000/svg', svg=document.createElementNS(ns,'svg');svg.classList.add('admin-chart');svg.setAttribute('viewBox','0 0 500 175');svg.setAttribute('role','img');
    svg.setAttribute('aria-label',`Daily active users from ${range.start} to ${range.end}; current period ${current.join(', ')}; previous period ${(previous||[]).join(', ')}`);
    const max=Math.max(...current,...(previous||[]),1);
    const add=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text)e.textContent=text;svg.append(e);};
    for(let i=0;i<3;i++){let y=15+i*60;add('line',{x1:35,x2:490,y1:y,y2:y,class:'chart-grid'});add('text',{x:28,y:y+3,'text-anchor':'end'},nf.format(Math.round(max*(1-i/2))));}
    for(const [values,cls] of [[previous||[],'chart-previous'],[current,'chart-current']]) if(values.length) add('polyline',{points:values.map((n,i)=>`${35+i*455/Math.max(values.length-1,1)},${135-n/max*120}`).join(' '),class:cls});
    add('text',{x:35,y:160},range.start.slice(5));add('text',{x:490,y:160,'text-anchor':'end'},range.end.slice(5));
    const legend=node('div',undefined,'admin-chart-legend');legend.append(node('span','Selected period'),node('span','Previous period'));$('traffic-chart').replaceChildren(svg,legend);
  }
  function pages(rows) {
    if(!rows?.length)return empty('pages-table','No page views returned for this period.');
    const wrap=node('div',undefined,'admin-table-wrap'),table=node('table',undefined,'admin-table'); table.append(node('caption','Top 10 pages by views'));
    const head=node('thead'),tr=node('tr');for(const name of ['Page','Views']) {const th=node('th',name);th.scope='col';tr.append(th);}head.append(tr);table.append(head);
    const body=node('tbody');rows.forEach(r=>{const row=node('tr');row.append(node('td',r.label),node('td',nf.format(r.value)));body.append(row);});table.append(body);wrap.append(table);$('pages-table').replaceChildren(wrap);
  }
  function events(rows) {
    $('events-list').replaceChildren(...rows.map(r=>{const row=node('div',undefined,'admin-event-row'),label=node('span',r.label);label.append(node('small',r.name));const value=node('span',undefined,'admin-event-value');value.append(r.value==null?node('em','Not observed'):node('span',nf.format(r.value)));row.append(label,value);return row;}));
  }
  function ops(data) {
    const rows=[['Availability',data?.status==='operational'?'Operational':data?.status==='unavailable'?'Unavailable':data?.status==='degraded'?'Degraded':'Unknown'],['Last check',data?.checkedAt?new Date(data.checkedAt).toLocaleString():'Not checked'],['Deployed commit',data?.commit?data.commit.slice(0,12):'Unknown'],['Source comparison',data?.sourceStatus||'Not connected']];
    const nodes=rows.map(([label,value],i)=>{const row=node('div',undefined,'admin-ops-row'),v=node('span',value,i===0?'admin-health':undefined);if(i===0)v.dataset.status=data?.status||'unknown';row.append(node('span',label),v);return row;});
    nodes.push(node('p',data?.reason||'Availability checks have not been configured.','admin-widget-footnote'));$('ops-details').replaceChildren(...nodes);
  }
  function clear(message) {metrics(null);for(const id of ['traffic-chart','sources-chart','pages-table','events-list','devices-chart','locations-chart'])empty(id,message);ops(null);}
  async function load() {
    const ticket=++requestNumber, days=Number($('date-range').value), range=dates(days);
    $('report-dates').textContent=`${range.start} – ${range.end} · Compared with ${range.previousStart} – ${range.previousEnd}`;
    $('report-panel').setAttribute('aria-labelledby',environment==='production'?'tab-prod':'tab-staging');
    $('ga-link').href=`https://analytics.google.com/analytics/web/#/p${environment==='production'?'557084016':'557077138'}/reports/intelligenthome`;
    $('ops-env').textContent=environment.toUpperCase();$('report-state').textContent='Loading…';$('report-panel').setAttribute('aria-busy','true');clear('Loading…');$('admin-refresh').disabled=true;
    try {
      let report;
      if(preview) report=illustrative(days);
      else {const response=await fetch(`/api/reports?environment=${environment}&days=${days}`,{credentials:'same-origin',cache:'no-store',redirect:'error'});if(response.status===401||response.status===403)throw new Error('Access expired or revoked. Return to sign-in.');if(!response.ok)throw new Error(response.status===429?'Reporting quota reached. Please retry later.':'Reports unavailable. Please retry.');report=await response.json();}
      if(ticket!==requestNumber)return;
      metrics(report);chart(report.trend,report.previousTrend,report.range);bars('sources-chart',report.sources,true);pages(report.pages);events(report.events);bars('devices-chart',report.devices,true);bars('locations-chart',report.locations,false);ops(report.ops);
      const stamp=new Date(report.refreshedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'});
      $('report-state').textContent=preview?'Illustrative data · not live':`${report.status==='stale'?'Stale · ':''}Last successful refresh ${stamp} ET · ${report.current[0]===0?'No recorded users · ':''}${report.dataQuality||'GA4 data can take 24–48 hours to process'}`;
    }catch(error){if(ticket!==requestNumber)return;clear('Data unavailable; values are not zero.');$('report-state').textContent=error.message;}
    finally{if(ticket===requestNumber){$('report-panel').removeAttribute('aria-busy');$('admin-refresh').disabled=false;}}
  }
  function selectEnv(button){environment=button.dataset.env;document.querySelectorAll('[data-env]').forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});load();}
  const tabs=Array.from(document.querySelectorAll('[data-env]'));tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectEnv(b));b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowLeft')next=tabs[1-i];if(e.key==='Home')next=tabs[0];if(e.key==='End')next=tabs[1];if(next){e.preventDefault();next.focus();selectEnv(next);}});});
  function columns(value){root.dataset.columns=value;document.querySelectorAll('button[data-columns]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.columns===value)));try{localStorage.setItem('johnapaz-admin-columns',value);}catch(_){}}
  document.querySelectorAll('button[data-columns]').forEach(b=>b.addEventListener('click',()=>columns(b.dataset.columns)));
  try{const saved=localStorage.getItem('johnapaz-admin-columns');if(['1','2','3'].includes(saved))columns(saved);}catch(_){}
  $('date-range').addEventListener('change',load);$('admin-refresh').addEventListener('click',load);load();
})();
