/* Explicit Original/Dark/Darker selection; resilient to unavailable browser storage. */
(function () {
  'use strict';
  var root = document.documentElement;
  var controls = document.querySelectorAll('[data-theme-choice]');
  var key = 'johnapaz-appearance-v2';
  function apply(theme) {
    root.dataset.theme = ['original', 'dark', 'darker'].indexOf(theme) !== -1 ? theme : 'original';
    controls.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === root.dataset.theme));
    });
  }
  apply(root.dataset.theme);
  var menu = document.querySelector('.v2-theme-menu');
  if (menu) {
    var toggle = menu.querySelector('.v2-theme-toggle');
    var panel = menu.querySelector('.v2-theme-switch');
    function close() { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    menu.hidden = false;
    toggle.addEventListener('click', function () { panel.hidden = !panel.hidden; toggle.setAttribute('aria-expanded', String(!panel.hidden)); });
    document.addEventListener('click', function (event) { if (!menu.contains(event.target)) close(); });
    document.addEventListener('focusin', function (event) { if (!menu.contains(event.target)) close(); });
    menu.addEventListener('keydown', function (event) { if (event.key === 'Escape') { close(); toggle.focus(); } });
  }
  controls.forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.dataset.themeChoice);
      try { localStorage.setItem(key, root.dataset.theme); } catch (_) {}
    });
  });
  window.addEventListener('storage', function (event) {
    if (event.key === key) apply(event.newValue);
  });
}());

