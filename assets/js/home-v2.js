// Button-group dropdowns; ARIA state and hidden panels stay in sync.
(() => {
  const menus = [...document.querySelectorAll('.v2-download-menu')];
  const setOpen = (menu, open) => {
    menu.querySelector('button').setAttribute('aria-expanded', String(open));
    const panel = menu.querySelector('ul');
    panel.hidden = !open;
    panel.classList.toggle('show', open);
  };
  const isOpen = menu => menu.querySelector('button').getAttribute('aria-expanded') === 'true';
  menus.forEach(menu => {
    const toggle = menu.querySelector('button');
    const links = () => [...menu.querySelectorAll('a[download]')];
    toggle.addEventListener('click', () => {
      const open = !isOpen(menu);
      menus.forEach(other => setOpen(other, other === menu && open));
    });
    toggle.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      event.preventDefault();
      menus.forEach(other => setOpen(other, other === menu));
      const options = links();
      (event.key === 'ArrowDown' ? options[0] : options[options.length - 1])?.focus();
    });
    menu.addEventListener('keydown', event => {
      if (!event.target.closest('a[download]') || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      event.preventDefault();
      const options = links(), index = options.indexOf(document.activeElement);
      options[(index + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length]?.focus();
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a[download]')) setOpen(menu, false);
    });
  });
  document.addEventListener('click', event => {
    menus.forEach(menu => { if (!menu.contains(event.target)) setOpen(menu, false); });
  });
  document.addEventListener('focusin', event => {
    menus.forEach(menu => { if (!menu.contains(event.target)) setOpen(menu, false); });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = menus.find(isOpen);
    if (active) { setOpen(active, false); active.querySelector('button').focus(); }
  });
})();
