const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const source = fs.readFileSync('assets/js/analytics.js','utf8');
function run(options = {}) {
 const requests=[], choices={}, listeners={}, values=new Map();
 if(options.consent) values.set('johnapaz-analytics-consent-v1',options.consent);
 let panel;
 const document={currentScript:{dataset:{measurementId:options.id||'G-STAGING123',analyticsHost:'staging.johnapaz.com',analyticsEnvironment:'staging'}}, referrer:'https://example.com/path?secret=1', readyState:'complete',cookie:'',head:{appendChild(el){if(el.src)requests.push(el.src);}},body:{appendChild(el){if(el.className==='analytics-consent')panel=el;}},addEventListener(n,fn){listeners[n]=fn;},createElement(type){
  const el={setAttribute(){},focus(){},addEventListener(){}};
  if(type==='section'){el.querySelectorAll=()=>['accepted','declined'].map(choice=>({dataset:{choice},addEventListener(n,fn){choices[choice]=fn;}}));el.querySelector=()=>({focus(){},addEventListener(){}});}return el;
 }};
 const window={addEventListener(n,fn){listeners[n]=fn;}};
 const location={hostname:options.host||'staging.johnapaz.com',protocol:options.protocol||'https:',origin:'https://staging.johnapaz.com',pathname:options.path||'/writing/',href:'https://staging.johnapaz.com/writing/?secret=1#fragment'};
 const localStorage={getItem(k){return values.get(k)||null;},setItem(k,v){if(options.blockStorage)throw Error('blocked');values.set(k,v);}};
 vm.runInNewContext(source,{document,window,location,localStorage,URL});
 return {requests,choices,panel,window,events(){return (window.dataLayer||[]).filter(x=>x[0]==='event');},click(href){listeners.click({target:{closest:()=>({href})}});}};
}
for(const options of [{host:'localhost'},{host:'johnapaz.com'},{path:'/admin/'},{protocol:'http:'},{id:'UA-123-1'}]){const h=run(options);assert.equal(h.requests.length,0);assert.equal(h.panel,undefined);}
const h=run();assert.equal(h.requests.length,0);assert.equal(h.events().length,0);
h.choices.accepted();assert.equal(h.requests.length,1);
assert.equal(h.events()[0][2].page_location,'https://staging.johnapaz.com/writing/');assert.equal(h.events()[0][2].page_referrer,'https://example.com/');
h.click('mailto:private@example.com');assert.equal(h.events().at(-1)[2].contact_method,'mailto');assert.ok(!JSON.stringify(h.events()).includes('private@'));
h.click('https://example.com/private?token=secret');assert.equal(h.events().at(-1)[2].destination_host,'example.com');assert.ok(!JSON.stringify(h.events()).includes('token'));
const count=h.events().length;h.choices.declined();h.click('mailto:private@example.com');assert.equal(h.events().length,count);assert.equal(h.window['ga-disable-G-STAGING123'],true);
h.choices.accepted();assert.equal(h.requests.length,1);
assert.equal(run({consent:'declined'}).requests.length,0);assert.equal(run({consent:'accepted'}).requests.length,1);
const blocked=run({blockStorage:true});blocked.choices.accepted();assert.equal(blocked.requests.length,0);
console.log('Passed consent, withdrawal, payload minimization and environment isolation checks');

for (const file of fs.readdirSync('_layouts').filter(x => x.endsWith('-v2.html'))) { assert.ok(fs.readFileSync('_layouts/' + file,'utf8').includes('include analytics-loader.html'), 'Missing analytics loader: ' + file); }
