/* Consent-gated GA4. No Google request is made until the visitor opts in. */
(function () {
  'use strict';
  var config = document.currentScript;
  var id = config && config.dataset.measurementId;
  var host = config && config.dataset.analyticsHost;
  var environment = config && config.dataset.analyticsEnvironment;
  if (!/^G-[A-Z0-9]+$/.test(id || '') || location.hostname !== host ||
      location.protocol !== 'https:' || /^\/admin(?:\/|$)/.test(location.pathname)) return;
  var key = 'johnapaz-analytics-consent-v1';
  var active = false;
  var loaded = false;
  var panel;
  var settings;
  function readConsent() {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function cleanReferrer() {
    try { return new URL(document.referrer).origin + '/'; } catch (_) { return ''; }
  }
  function event(name, params) {
    if (!active || readConsent() !== 'accepted') return;
    window.gtag('event', name, Object.assign({site_environment: environment}, params || {}));
  }
  function start() {
    if (active) return;
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
    var style = document.createElement('style');
    style.textContent = '.analytics-consent{position:fixed;bottom:3.7rem;left:1rem;right:1rem;max-width:36rem;padding:1.25rem;background:#fff;color:#283442;border:1px solid #b6c8cf;border-radius:12px;box-shadow:0 4px 24px #0002;z-index:10001}.analytics-consent[hidden]{display:none}.analytics-consent p{margin:0 0 1rem}.analytics-consent .analytics-actions{display:flex;flex-wrap:wrap;gap:.6rem}.analytics-consent button{height:auto;white-space:normal;line-height:1.5;padding:.6rem 1rem}.analytics-settings{position:fixed;bottom:.75rem;left:1rem;z-index:10000;background:#fff;color:#283442;font-size:.7rem;height:auto;line-height:1.5;padding:.5rem .75rem}';
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
    document.body.appendChild(panel); document.body.appendChild(settings);
    panel.hidden = readConsent() !== null;
    if (readConsent() === 'accepted') start();
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
    if (e.key === key) { if (readConsent() === 'accepted') start(); else stop(); }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
