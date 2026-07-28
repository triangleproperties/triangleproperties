// Triangle Properties Pvt. Ltd. - Dynamic Navbar Component Loader
(function() {
  async function loadComponentNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    try {
      const response = await fetch('components/navbar.html');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      container.innerHTML = html;

      // Re-initialize theme toggle and mobile navigation handlers
      if (typeof window.initThemeToggle === 'function') window.initThemeToggle();
      if (typeof window.initNavigation === 'function') window.initNavigation();

      // Highlight active link matching current page
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = container.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
          link.classList.add('text-amber-500', 'border-b', 'border-amber-500', 'pb-1');
          link.classList.remove('text-slate-700', 'dark:text-slate-200');
        }
      });
    } catch (err) {
      console.warn('Navbar component load notice:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponentNavbar);
  } else {
    loadComponentNavbar();
  }
})();
