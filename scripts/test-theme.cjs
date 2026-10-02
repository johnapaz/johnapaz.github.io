const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/js/theme-v2.js', 'utf8');
function setup(initial, blocked = false) {
  const listeners = {}, menuListeners = {}, windowListeners = {}, writes = [];
  const controls = ['original', 'dark', 'darker'].map(theme => ({
    dataset: { themeChoice: theme }, attrs: {}, handlers: {},
    setAttribute(k, v) { this.attrs[k] = v; },
    addEventListener(k, fn) { this.handlers[k] = fn; }
  }));
  const toggle = { attrs: {}, handlers: {}, focused: false,
    setAttribute(k, v) { this.attrs[k] = v; },
    addEventListener(k, fn) { this.handlers[k] = fn; },
    focus() { this.focused = true; }
  };
  const panel = { hidden: true };
  const menu = { hidden: true, querySelector(s) { return s === '.v2-theme-toggle' ? toggle : panel; },
    contains(el) { return el === toggle || el === panel; },
    addEventListener(k, fn) { menuListeners[k] = fn; }
  };
  const root = { dataset: { theme: initial } };
  vm.runInNewContext(source, {
    document: { documentElement: root, querySelectorAll() { return controls; }, querySelector() { return menu; }, addEventListener(k, fn) { listeners[k] = fn; } },
    window: { addEventListener(k, fn) { windowListeners[k] = fn; } },
    localStorage: { setItem(k, v) { if (blocked) throw Error('unavailable'); writes.push([k, v]); } }
  });
  return { root, controls, toggle, panel, menu, listeners, menuListeners, windowListeners, writes };
}
for (const initial of [undefined, 'invalid', 'original']) {
  const h = setup(initial); assert.equal(h.root.dataset.theme, 'original');
  assert.equal(h.controls[0].attrs['aria-pressed'], 'true');
}
const h = setup('dark');
assert.equal(h.controls[1].attrs['aria-pressed'], 'true');
assert.equal(h.menu.hidden, false);
h.toggle.handlers.click(); assert.equal(h.panel.hidden, false); assert.equal(h.toggle.attrs['aria-expanded'], 'true');
h.listeners.click({ target: h.panel }); assert.equal(h.panel.hidden, false);
h.menuListeners.keydown({ key: 'Escape' }); assert.equal(h.panel.hidden, true); assert.equal(h.toggle.focused, true);
for (const event of ['click', 'focusin']) {
  h.toggle.handlers.click(); h.listeners[event]({ target: {} });
  assert.equal(h.panel.hidden, true); assert.equal(h.toggle.attrs['aria-expanded'], 'false');
}
h.controls[2].handlers.click(); assert.equal(h.root.dataset.theme, 'darker');
assert.deepEqual(h.controls.map(x => x.attrs['aria-pressed']), ['false', 'false', 'true']);
assert.deepEqual(h.writes[0], ['johnapaz-appearance-v2', 'darker']);
h.windowListeners.storage({ key: 'unrelated', newValue: 'original' }); assert.equal(h.root.dataset.theme, 'darker');
h.windowListeners.storage({ key: 'johnapaz-appearance-v2', newValue: null }); assert.equal(h.root.dataset.theme, 'original');
const unavailable = setup('original', true); unavailable.controls[1].handlers.click(); assert.equal(unavailable.root.dataset.theme, 'dark');
console.log('Passed appearance selection, dismissal, focus recovery, storage isolation and unavailable-storage checks');
