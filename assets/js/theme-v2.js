/* Explicit Dark/Darker selection; resilient to unavailable browser storage. */
(function () {
  'use strict';
  var root = document.documentElement;
  var controls = document.querySelectorAll('[data-theme-choice]');
  var key = 'johnapaz-appearance-v1';
  function apply(theme) {
    root.dataset.theme = theme === 'darker' ? 'darker' : 'dark';
    controls.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === root.dataset.theme));
    });
  }
  apply(root.dataset.theme);
  document.querySelectorAll('.v2-theme-switch').forEach(function (group) { group.hidden = false; });
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
