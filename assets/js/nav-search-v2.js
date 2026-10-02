(() => {
  const root = document.querySelector('.v2-nav-search');
  if (!root) return;
  const toggle = root.querySelector('.v2-search-toggle');
  const form = root.querySelector('form');
  const input = form.querySelector('input');
  const panel = form.querySelector('.v2-search-suggestions');
  const status = form.querySelector('.v2-search-status');
  const list = form.querySelector('ul');
  const normalize = text => String(text || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let indexPromise, timer, request = 0;
  const position = () => {
    const anchor = toggle.getBoundingClientRect();
    const gutter = 12, preferred = 280;
    const compact = matchMedia("(max-width: 780px)").matches;
    const row = root.closest(".v2-nav-pages").getBoundingClientRect();
    const left = compact ? Math.max(gutter, row.left) : Math.max(gutter, anchor.left - preferred - 6);
    const available = Math.max(0, anchor.left - left - 6);
    const width = compact ? Math.min(row.right, window.innerWidth - gutter) - left : Math.min(window.innerWidth - left - gutter, input.value.trim() ? preferred : Math.max(100, available));
    form.style.left = `${left}px`;
    form.style.top = `${anchor.top + (anchor.height - (matchMedia('(pointer: coarse)').matches ? 44 : 36)) / 2}px`;
    form.style.width = `${width}px`;
    form.style.setProperty('--search-results-width', `${window.innerWidth - left - gutter}px`);
    // On narrow screens the field passes underneath the search icon.
    input.style.paddingLeft = anchor.left < left + width && anchor.right > left ? `${anchor.right - left + 6}px` : '';
  };
  window.addEventListener('resize', () => { if (!form.hidden) position(); });
  window.addEventListener('scroll', () => { if (!form.hidden) position(); }, { passive: true });
  const close = (focus = false) => {
    ++request; clearTimeout(timer); form.hidden = true; panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (focus) toggle.focus();
  };
  toggle.addEventListener('click', event => {
    event.preventDefault();
    if (!form.hidden) { close(true); return; }
    position(); form.hidden = false; toggle.setAttribute('aria-expanded', 'true'); input.focus();
    if (input.value.trim()) search();
  });
  async function search() {
    const run = ++request;
    const query = normalize(input.value.trim());
    list.replaceChildren();
    panel.hidden = !query;
    if (!query) return;
    status.textContent = 'Searching…';
    try {
      if (!indexPromise) indexPromise = fetch('/search.json').then(response => {
        if (!response.ok) throw new Error('Index unavailable');
        return response.json();
      }).catch(error => { indexPromise = null; throw error; });
      const data = await indexPromise;
      if (run !== request || form.hidden) return;
      const words = query.split(/\s+/);
      const entries = Array.from(new Map(data.filter(item => item.title && (item.url.startsWith('/') || /^https:\/\//.test(item.url))).map(item => [item.url, item])).values());
      const matches = entries.filter(item => words.every(word => normalize(`${item.title} ${item.category} ${item.text}`).includes(word)))
        .sort((a,b) => Number(normalize(b.title).includes(query)) - Number(normalize(a.title).includes(query)) || a.title.localeCompare(b.title));
      status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'}${matches.length > 5 ? ' · Showing the first 5' : ''}` : 'No results. Try another phrase.';
      matches.slice(0,5).forEach(item => {
        const li = document.createElement('li'), link = document.createElement('a'), category = document.createElement('small');
        link.href = item.url; link.append(document.createTextNode(item.title)); category.textContent = item.category || 'Page'; link.append(category); li.append(link); list.append(li);
      });
    } catch (error) { if (run === request) status.textContent = 'Suggestions unavailable. Press Enter to open search.'; }
  }
  input.addEventListener('input', () => { position(); ++request; clearTimeout(timer); timer = setTimeout(search, 180); });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (event.key === 'ArrowDown' && event.target === input) { event.preventDefault(); list.querySelector('a')?.focus(); }
  });
  document.addEventListener('click', event => { if (!root.contains(event.target)) close(); });
  document.addEventListener('focusin', event => { if (!root.contains(event.target)) close(); });
})();
