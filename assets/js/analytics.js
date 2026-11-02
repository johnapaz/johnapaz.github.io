/* Consent-gated GA4. No Google request is made until the visitor opts in. */
(function () {
  'use strict';
  var config = document.currentScript;
  var id = config && config.dataset.measurementId;
  var host = config && config.dataset.analyticsHost;
  var environment = config && config.dataset.analyticsEnvironment;
  var preferencesOnly = config && config.dataset.preferencesOnly === 'true';
  if (!/^G-[A-Z0-9]+$/.test(id || '') || location.hostname !== host ||
      location.protocol !== 'https:' || /^\/admin(?:\/|$)/.test(location.pathname)) return;
  var key = 'johnapaz-analytics-consent-v1';
  var exclusionKey = 'johnapaz-analytics-exclude-browser-v1';
  var active = false;
  var loaded = false;
  var panel;
  var settings;
  var exclusionControls = [];
  var exclusionWriteFailed = false;
  function readConsent() {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  // null means storage is unavailable or invalid. Fail closed in that case.
  function readExclusion() {
    try {
      var value = localStorage.getItem(exclusionKey);
      return value === null || value === 'included' ? false : value === 'excluded' ? true : null;
    } catch (_) { return null; }
  }
  function canCollect() {
    return !preferencesOnly && !exclusionWriteFailed && readExclusion() === false && readConsent() === 'accepted';
  }
  function updateExclusionControls() {
    var excluded = readExclusion();
    exclusionControls.forEach(function (controls) {
      controls.button.disabled = excluded === null;
      controls.button.setAttribute('aria-pressed', String(excluded === true));
      controls.button.textContent = excluded === true ? 'Undo browser exclusion' : 'Exclude this browser';
      controls.status.textContent = exclusionWriteFailed ? 'Could not save the change. Analytics is paused on this page. Allow browser storage and try again.' :
        excluded === null ? 'Browser storage is unavailable or invalid. Analytics is paused; allow storage or clear this site’s saved preferences to try again.' :
        excluded ? 'This browser is excluded from future analytics on this site. Earlier visits remain in reports.' :
        'This browser is not excluded. Analytics still requires your separate permission.';
    });
    if (settings) settings.textContent = readExclusion() === true ? 'Analytics: browser excluded' : 'Analytics preferences';
  }
  function toggleExclusion() {
    try {
      localStorage.setItem(exclusionKey, readExclusion() === true ? 'included' : 'excluded');
      exclusionWriteFailed = false;
    } catch (_) { exclusionWriteFailed = true; }
    if (canCollect()) start(); else stop();
    updateExclusionControls();
  }
  function mountExclusion(container) {
    var status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    var button = document.createElement('button');
    button.type = 'button';
    button.addEventListener('click', toggleExclusion);
    container.appendChild(status); container.appendChild(button);
    exclusionControls.push({status: status, button: button});
    updateExclusionControls();
  }
  function cleanReferrer() {
    try { return new URL(document.referrer).origin + '/'; } catch (_) { return ''; }
  }
  function event(name, params) {
    if (!active || !canCollect()) return;
    window.gtag('event', name, Object.assign({site_environment: environment}, params || {}));
  }
  function start() {
    if (active || !canCollect()) return;
    active = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    if (!loaded) {
      loaded = true;
      window.gtag('js', new Date());
      window.gtag('config', id, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: location.origin + location.pathname,
        page_referrer: cleanReferrer(), page_title: location.pathname
      });
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(tag);
    }
    window.gtag('consent', 'update', {analytics_storage: 'granted'});
    event('page_view', {page_location: location.origin + location.pathname,
      page_referrer: cleanReferrer(), page_title: location.pathname});
  }
  function stop() {
    active = false;
    window['ga-disable-' + id] = true;
    if (window.gtag) window.gtag('consent', 'update', {analytics_storage: 'denied'});
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', host, '.' + host, '.johnapaz.com'].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '') + '; SameSite=Lax; Secure';
      });
    });
  }
  function choose(value) {
    try { localStorage.setItem(key, value); } catch (_) {
      // Fail closed if the preference cannot persist.
      stop(); panel.hidden = true; return;
    }
    if (value === 'accepted') start(); else stop();
    panel.hidden = true;
    settings.focus();
  }
  function mount() {
    if (preferencesOnly) {
      var controls = document.getElementById('browser-analytics-controls');
      if (controls) { controls.textContent = ''; mountExclusion(controls); }
      // This management page never loads the Google tag, even after undo.
      window['ga-disable-' + id] = true;
      if (readExclusion() !== false) stop();
      return;
    }
    var style = document.createElement('style');
    style.textContent = '.analytics-consent{position:fixed;bottom:3.7rem;left:1rem;right:1rem;max-width:36rem;max-height:calc(100svh - 5rem);overflow-y:auto;padding:1.25rem;background:var(--theme-surface,#fff);color:var(--theme-text,#283442);border:1px solid var(--theme-border,#b6c8cf);border-radius:12px;box-shadow:0 4px 24px #0002;z-index:10001}.analytics-consent[hidden]{display:none}.analytics-consent p{margin:0 0 1rem}.analytics-consent .analytics-actions{display:flex;flex-wrap:wrap;gap:.6rem}.analytics-consent button{height:auto;white-space:normal;line-height:1.5;padding:.6rem 1rem}.analytics-browser-exclusion{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--theme-border,#b6c8cf)}.analytics-settings{position:fixed;bottom:.75rem;left:1rem;z-index:10000;background:var(--theme-surface,#fff);color:var(--theme-text,#283442);font-size:.7rem;height:auto;line-height:1.5;padding:.5rem .75rem}';
    document.head.appendChild(style);
    panel = document.createElement('section');
    panel.className = 'analytics-consent';
    panel.setAttribute('aria-label', 'Analytics preferences');
    panel.innerHTML = '<p>Allow optional analytics cookies to help John understand which pages and resources people use? Your choice does not affect access to the site. <a href="/privacy/">Privacy details</a></p><div class="analytics-actions"><button type="button" data-choice="accepted">Allow analytics</button><button type="button" data-choice="declined">No thanks</button><button type="button" data-close>Close</button></div>';
    settings = document.createElement('button');
    settings.type = 'button'; settings.className = 'analytics-settings';
    settings.textContent = 'Analytics preferences';
    settings.addEventListener('click', function () { panel.hidden = false; panel.querySelector('button').focus(); });
    panel.querySelectorAll('[data-choice]').forEach(function (button) {
      button.addEventListener('click', function () { choose(button.dataset.choice); });
    });
    panel.querySelector('[data-close]').addEventListener('click', function () { panel.hidden = true; settings.focus(); });
    panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { panel.hidden = true; settings.focus(); } });
    var exclusion = document.createElement('div');
    exclusion.className = 'analytics-browser-exclusion';
    panel.appendChild(exclusion);
    mountExclusion(exclusion);
    document.body.appendChild(panel); document.body.appendChild(settings);
    panel.hidden = readConsent() !== null || readExclusion() !== false;
    if (canCollect()) start(); else stop();
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    if (url.protocol === 'mailto:' || url.protocol === 'tel:') {
      event('contact_click', {contact_method: url.protocol.slice(0, -1)});
    } else if (/^https?:$/.test(url.protocol)) {
      if (/\.(pdf|docx?)$/i.test(url.pathname) && /resume|cv/i.test(url.pathname)) {
        event('resume_download', {file_type: url.pathname.split('.').pop().toLowerCase()});
      } else if (url.origin !== location.origin) {
        event('outbound_click', {destination_host: url.hostname});
      } else if (/^\/(coding|projects|portfolio)(?:\/|$)/.test(url.pathname)) {
        event('portfolio_click', {section: url.pathname.split('/')[1]});
      }
    }
  });
  window.addEventListener('storage', function (e) {
    if (e.key === key || e.key === exclusionKey || e.key === null) {
      if (canCollect()) start(); else stop();
      updateExclusionControls();
    }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
