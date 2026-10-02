(() => {
  'use strict';
  const form = document.querySelector('.site-search');
  if (!form) return;
  const input = form.querySelector('input');
  const status = document.getElementById('search-status');
  const results = document.getElementById('search-results');
  const normalize = text => String(text || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let index;
  let request = 0;
  async function search(event) {
    if (event) event.preventDefault();
    const run = ++request;
    const query = normalize(input.value.trim());
    results.replaceChildren();
    if (!query) { status.textContent = 'Enter a phrase to search.'; return; }
    status.textContent = 'Searching…';
    try {
      if (!index) {
        const response = await fetch('/search.json');
        if (!response.ok) throw new Error('Index unavailable');
        const data = await response.json();
        index = Array.from(new Map(data.filter(item => item.title && (item.url.startsWith('/') || /^https:\/\//.test(item.url))).map(item => [item.url, item])).values());
      }
      if (run !== request) return;
      const words = query.split(/\s+/);
      const matches = index.filter(item => words.every(word => normalize(`${item.title} ${item.category} ${item.text}`).includes(word)))
        .sort((a, b) => Number(normalize(b.title).includes(query)) - Number(normalize(a.title).includes(query)) || a.title.localeCompare(b.title));
      status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'}` : 'No results. Try another phrase.';
      matches.forEach(item => {
        const li = document.createElement('li');
        const link = document.createElement('a'); link.href = item.url; link.textContent = item.title;
        const detail = document.createElement('p'); detail.textContent = `${item.category} · ${String(item.text || '').replace(/\{[\s\S]*?\}/g, '').slice(0, 180)}`;
        li.append(link, detail); results.append(li);
      });
    } catch (error) { if (run === request) status.textContent = 'Search is unavailable. Please use the page links above.'; }
  }
  form.addEventListener('submit', search);
  input.addEventListener('input', search);
})();
