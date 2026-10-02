/* Progressive enhancement: the résumé remains readable without JavaScript. */
(() => {
  'use strict';
  const dataElement = document.getElementById('career-data');
  if (!dataElement) return;
  const jobs = JSON.parse(dataElement.textContent);
  const results = document.getElementById('career-results');
  const rows = new Map(Array.from(results.querySelectorAll('[data-career-id]'), row => [row.dataset.careerId, row]));
  const explorer = document.querySelector('.career-explorer');
  const filterPanel = document.getElementById('career-filters');
  const toggle = document.getElementById('career-filter-toggle');
  const count = document.getElementById('career-count');
  const reset = document.getElementById('career-reset');
  const filterCount = document.getElementById('career-filter-count');
  const shareStatus = document.getElementById('career-share-status');
  const fallback = document.querySelector('.career-share-fallback');
  const earlier = document.getElementById('career-earlier');
  const views = ['chronology', 'type', 'industry'];
  const facets = {
    type: job => job.work_types,
    industry: job => [job.industry],
    department: job => [job.department],
    technology: job => job.technologies
  };
  const keys = { type: 'work', industry: 'industry', department: 'team', technology: 'tech' };
  const choices = {};
  const selects = {};
  Object.keys(facets).forEach(facet => {
    choices[facet] = [...new Set(jobs.flatMap(facets[facet]))].sort((a, b) => a.localeCompare(b));
    const select = explorer.querySelector(`[data-career-select="${facet}"]`);
    choices[facet].forEach(value => select.add(new Option(value, value)));
    selects[facet] = select;
  });
  let state;
  const readState = () => {
    const params = new URL(window.location.href).searchParams;
    const next = { view: views.includes(params.get('view')) ? params.get('view') : 'chronology', earlier: params.get('earlier') === '1' };
    Object.keys(facets).forEach(facet => {
      const value = params.get(keys[facet]);
      next[facet] = choices[facet].includes(value) ? value : '';
    });
    return next;
  };
  const updateURL = (replace = false) => {
    const url = new URL(window.location.href);
    ['view', 'earlier', ...Object.values(keys)].forEach(key => url.searchParams.delete(key));
    if (state.view !== 'chronology') url.searchParams.set('view', state.view);
    Object.keys(facets).forEach(facet => { if (state[facet]) url.searchParams.set(keys[facet], state[facet]); });
    if (state.earlier) url.searchParams.set('earlier', '1');
    if (url.href !== window.location.href) window.history[replace ? 'replaceState' : 'pushState'](null, '', url);
  };
  const group = (heading, matching) => {
    const section = document.createElement('div');
    section.className = 'career-group';
    if (heading) {
      const title = document.createElement('h3');
      title.className = 'career-group-title';
      title.textContent = heading;
      section.append(title);
    }
    const list = document.createElement('div');
    list.className = 'work-experience';
    matching.forEach(job => list.append(rows.get(job.id)));
    section.append(list);
    return section;
  };
  const render = () => {
    const active = Object.keys(facets).filter(facet => state[facet]);
    const matching = jobs.filter(job => active.every(facet => facets[facet](job).includes(state[facet])));
    const fragment = document.createDocumentFragment();
    if (state.view === 'chronology') {
      if (active.length) fragment.append(group('', matching));
      else {
        fragment.append(group('', matching.filter(job => !job.earlier)));
        const list = earlier.querySelector('.work-experience');
        list.replaceChildren(...matching.filter(job => job.earlier).map(job => rows.get(job.id)));
        earlier.open = state.earlier;
        fragment.append(earlier);
      }
    } else {
      const key = state.view === 'type' ? 'primary_type' : 'industry';
      const groups = [...new Set(matching.map(job => job[key]))].sort((a, b) => a.localeCompare(b));
      groups.forEach(heading => fragment.append(group(heading, matching.filter(job => job[key] === heading))));
    }
    results.replaceChildren(fragment);
    Object.keys(facets).forEach(facet => { selects[facet].value = state[facet]; });
    explorer.querySelectorAll('[data-career-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerView === state.view)));
    rows.forEach(row => row.querySelectorAll('[data-career-facet]').forEach(button => {
      button.disabled = false;
      const selected = state[button.dataset.careerFacet] === button.dataset.careerValue;
      button.setAttribute('aria-pressed', String(selected));
    }));
    filterCount.hidden = !active.length;
    filterCount.textContent = String(active.length);
    reset.hidden = !active.length;
    count.textContent = active.length ? `${matching.length} of ${jobs.length} selected roles · ${active.map(facet => state[facet]).join(' · ')}` : state.view === 'chronology' ? '6 recent roles · 3 earlier roles' : `${matching.length} selected roles · grouped by ${state.view === 'type' ? 'primary work type' : 'industry'}`;
    document.getElementById('career-empty').hidden = matching.length > 0;
    shareStatus.textContent = '';
    fallback.hidden = true;
  };
  const change = patch => {
    state = { ...state, ...patch };
    updateURL();
    render();
  };
  explorer.querySelectorAll('[data-career-view]').forEach(button => button.addEventListener('click', () => change({ view: button.dataset.careerView })));
  Object.keys(facets).forEach(facet => selects[facet].addEventListener('change', () => change({ [facet]: selects[facet].value })));
  rows.forEach(row => row.querySelectorAll('[data-career-facet]').forEach(button => button.addEventListener('click', () => {
    const facet = button.dataset.careerFacet;
    const value = button.dataset.careerValue;
    // Rendering may move/remove the originating row. Keep focus on a stable control.
    selects[facet].focus();
    change({ [facet]: state[facet] === value ? '' : value });
    filterPanel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    selects[facet].focus({ preventScroll: true });
  })));
  toggle.addEventListener('click', () => {
    filterPanel.hidden = !filterPanel.hidden;
    toggle.setAttribute('aria-expanded', String(!filterPanel.hidden));
  });
  reset.addEventListener('click', () => {
    change(Object.fromEntries(Object.keys(facets).map(facet => [facet, ''])));
    toggle.focus({ preventScroll: true });
  });
  earlier.addEventListener('toggle', () => {
    // Ignore programmatic changes and detached earlier sections in grouped views.
    if (!earlier.isConnected || earlier.open === state.earlier) return;
    state.earlier = earlier.open;
    updateURL();
  });
  document.getElementById('career-share').addEventListener('click', async () => {
    const url = new URL(window.location.href);
    url.hash = 'experience';
    try {
      await navigator.clipboard.writeText(url.href);
      shareStatus.textContent = 'View link copied';
    } catch {
      fallback.hidden = false;
      fallback.querySelector('input').value = url.href;
      fallback.querySelector('input').focus();
      fallback.querySelector('input').select();
      shareStatus.textContent = 'Select and copy the URL below';
    }
  });
  window.addEventListener('popstate', () => { state = readState(); render(); });
  state = readState();
  explorer.hidden = false;
  render();
})();
