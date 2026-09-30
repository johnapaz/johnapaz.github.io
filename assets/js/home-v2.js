// Native details work without JavaScript; enhancements keep menus predictable.
(() => {
  const menus = [...document.querySelectorAll('.v2-download-menu')];
  menus.forEach(menu => {
    menu.addEventListener('toggle', () => {
      if (menu.open) menus.forEach(other => { if (other !== menu) other.open = false; });
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a[download]')) menu.open = false;
    });
  });
  document.addEventListener('click', event => {
    menus.forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = menus.find(menu => menu.open);
    if (active) { active.open = false; active.querySelector('summary').focus(); }
  });
})();
