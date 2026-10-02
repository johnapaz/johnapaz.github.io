(() => {
  'use strict';
  const catalog = document.querySelector('[data-article-catalog]');
  if (!catalog) return;
  const discovery = catalog.querySelector('.writing-discovery');
  const filterState = catalog.querySelector('.writing-filter-state');
  const form = catalog.querySelector('form');
  const grid = catalog.querySelector('.writing-grid');
  const cards = Array.from(grid.querySelectorAll('.writing-tile'));
  const search = form.elements.search;
  const topic = form.elements.topic;
  const sort = form.elements.sort;
  const status = catalog.querySelector('.writing-results');
  const empty = catalog.querySelector('.writing-empty');
  const pagination = catalog.querySelector('.writing-pagination');
  const previous = pagination.querySelector('[data-previous]');
  const next = pagination.querySelector('[data-next]');
  const pageLabel = pagination.querySelector('[data-page-label]');
  const pageSize = Math.max(1, Number(catalog.dataset.pageSize) || 6);
  const itemLabel = catalog.dataset.itemLabel || 'articles';
  let page = 1;
  Array.from(new Set(cards.map(card => card.dataset.topic)))
    .sort((a, b) => a.localeCompare(b))
    .forEach(value => topic.add(new Option(value, value)));
  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = cards.filter(card => (!topic.value || card.dataset.topic === topic.value) &&
      `${card.dataset.title} ${card.dataset.topic} ${card.dataset.description}`.toLocaleLowerCase().includes(query));
    matches.sort((a, b) => {
      const titleOrder = a.dataset.title.localeCompare(b.dataset.title);
      if (sort.value === 'title') return titleOrder;
      if (sort.value === 'title-desc') return -titleOrder;
      // Undated archive items stay after dated entries for either date order.
      if (!a.dataset.date || !b.dataset.date) {
        return Number(!a.dataset.date) - Number(!b.dataset.date) || titleOrder;
      }
      const dateOrder = a.dataset.date.localeCompare(b.dataset.date);
      return (sort.value === 'oldest' ? dateOrder : -dateOrder) || titleOrder;
    });
    const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    page = Math.min(page, totalPages);
    const start = (page - 1) * pageSize;
    cards.forEach(card => { card.hidden = true; });
    matches.forEach((card, index) => {
      grid.append(card);
      card.hidden = index < start || index >= start + pageSize;
    });
    empty.hidden = matches.length !== 0;
    filterState.textContent = query || topic.value || sort.value !== 'newest' ? '· Active' : ''; 
    status.textContent = matches.length ? `Showing ${start + 1}–${Math.min(start + pageSize, matches.length)} of ${matches.length} ${itemLabel}` : `0 ${itemLabel}`;
    pageLabel.textContent = `Page ${page} of ${totalPages}`;
    previous.disabled = page === 1;
    next.disabled = page === totalPages || matches.length === 0;
  }
  function restart() { page = 1; render(); }
  form.addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', restart);
  topic.addEventListener('change', restart);
  sort.addEventListener('change', restart);
  form.addEventListener('reset', () => {
    search.value = ''; topic.value = ''; sort.value = 'newest'; restart();
  });
  previous.addEventListener('click', () => { if (page > 1) { page--; render(); } });
  next.addEventListener('click', () => { if (!next.disabled) { page++; render(); } });
  const toggle = catalog.querySelector('.writing-filter-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => { form.hidden = !form.hidden; toggle.setAttribute('aria-expanded', String(!form.hidden)); });
    form.addEventListener('keydown', event => { if (event.key === 'Escape') { form.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } });
  }
  discovery.hidden = false;
  pagination.hidden = false;
  render();
})();
