const assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
const source = fs.readFileSync('assets/js/analytics.js','utf8');
function run(options = {}) {
 const requests=[], choices={}, listeners={}, values=new Map();
 if(options.consent) values.set('johnapaz-analytics-consent-v1',options.consent);
 if(options.exclusion) values.set('johnapaz-analytics-exclude-browser-v1',options.exclusion);
 const exclusionKey='johnapaz-analytics-exclude-browser-v1';
 const preferenceRoot={children:[],appendChild(el){this.children.push(el);}};
 let panel;
 const document={getElementById(){return preferenceRoot;},currentScript:{dataset:{measurementId:options.id||'G-STAGING123',analyticsHost:options.configHost||'staging.johnapaz.com',analyticsEnvironment:'staging',preferencesOnly:String(!!options.preferencesOnly)}}, referrer:'https://example.com/path?secret=1', readyState:'complete',cookie:'',head:{appendChild(el){if(el.src)requests.push(el.src);}},body:{appendChild(el){if(el.className==='analytics-consent')panel=el;}},addEventListener(n,fn){listeners[n]=fn;},createElement(type){
  const el={children:[],attributes:{},handlers:{},setAttribute(k,v){this.attributes[k]=v;},appendChild(child){this.children.push(child);},focus(){},addEventListener(n,fn){this.handlers[n]=fn;}};
  if(type==='section'){el.querySelectorAll=()=>['accepted','declined'].map(choice=>({dataset:{choice},addEventListener(n,fn){choices[choice]=fn;}}));el.querySelector=()=>({focus(){},addEventListener(){}});}return el;
 }};
 const window={addEventListener(n,fn){listeners[n]=fn;}};
 const location={hostname:options.host||'staging.johnapaz.com',protocol:options.protocol||'https:',origin:'https://staging.johnapaz.com',pathname:options.path||'/writing/',href:'https://staging.johnapaz.com/writing/?secret=1#fragment'};
 const localStorage={getItem(k){if(options.blockRead)throw Error('blocked');return values.get(k)||null;},setItem(k,v){if(options.blockStorage)throw Error('blocked');values.set(k,v);}};
 vm.runInNewContext(source,{document,window,location,localStorage,URL});
 return {requests,choices,panel,window,values,preferenceRoot,exclusionControls(){return options.preferencesOnly?preferenceRoot:panel.children[0];},storage(k,v){if(v===null)values.delete(k);else values.set(k,v);listeners.storage({key:k});},events(){return (window.dataLayer||[]).filter(x=>x[0]==='event');},click(href){listeners.click({target:{closest:()=>({href})}});}};
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

const exclusionKey = 'johnapaz-analytics-exclude-browser-v1';
for (const options of [{}, {host:'johnapaz.com',configHost:'johnapaz.com'}]) {
 const marked=run({...options,consent:'accepted',exclusion:'excluded'});
 assert.equal(marked.requests.length,0);
 assert.equal(marked.window['ga-disable-G-STAGING123'],true);
 marked.click('https://example.com/');assert.equal(marked.events().length,0);
 marked.choices.accepted();assert.equal(marked.requests.length,0,'Consent must not override exclusion');
 marked.exclusionControls().children[1].handlers.click();
 assert.equal(marked.values.get('johnapaz-analytics-consent-v1'),'accepted');
 assert.equal(marked.requests.length,1,'Undo resumes only previously accepted analytics');
 const before=marked.events().length;
 marked.exclusionControls().children[1].handlers.click();
 marked.click('https://example.com/');assert.equal(marked.events().length,before);
 assert.equal(marked.values.get(exclusionKey),'excluded');
 assert.equal(marked.window['ga-disable-G-STAGING123'],true);
}
for (const consent of [undefined,'declined']) {
 const marked=run({consent,exclusion:'excluded'});
 marked.exclusionControls().children[1].handlers.click();
 assert.equal(marked.requests.length,0,'Undo must not grant consent');
}
const crossTab=run({consent:'accepted'}), initial=crossTab.events().length;
crossTab.storage(exclusionKey,'excluded');crossTab.click('https://example.com/');
assert.equal(crossTab.events().length,initial);
assert.equal(crossTab.window['ga-disable-G-STAGING123'],true);
crossTab.storage(exclusionKey,'included');assert.equal(crossTab.events().length,initial+1);
crossTab.storage('johnapaz-analytics-consent-v1','declined');
crossTab.storage(exclusionKey,'excluded');crossTab.storage(exclusionKey,'included');
assert.equal(crossTab.events().length,initial+1,'Cross-tab undo must respect declined consent');
crossTab.values.clear();crossTab.storage(null,null);
assert.equal(crossTab.window['ga-disable-G-STAGING123'],true,'Storage clear stops collection');
for (const options of [{blockRead:true},{exclusion:'invalid'}]) {
 const closed=run({...options,consent:'accepted'});
 assert.equal(closed.requests.length,0);
 assert.equal(closed.exclusionControls().children[1].disabled,true);
}
const writeFailure=run({consent:'accepted',blockStorage:true});
writeFailure.exclusionControls().children[1].handlers.click();
assert.equal(writeFailure.window['ga-disable-G-STAGING123'],true);
assert.match(writeFailure.exclusionControls().children[0].textContent,/Could not save/);
for (const consent of [undefined,'accepted','declined']) {
 const prefs=run({preferencesOnly:true,consent});
 assert.equal(prefs.requests.length,0);
 prefs.preferenceRoot.children[1].handlers.click();
 assert.equal(prefs.values.get(exclusionKey),'excluded');
 prefs.preferenceRoot.children[1].handlers.click();
 assert.equal(prefs.requests.length,0,'Management page must remain untracked after undo');
 assert.equal(prefs.events().length,0);
}
console.log('Passed browser exclusion, undo, consent independence, storage failure and cross-tab checks');

for (const file of fs.readdirSync('_layouts').filter(x => x.endsWith('-v2.html'))) { assert.ok(fs.readFileSync('_layouts/' + file,'utf8').includes('include analytics-loader.html'), 'Missing analytics loader: ' + file); }
