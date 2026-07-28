// Triangle Properties Pvt. Ltd. - Dynamic Component Loader & Theme Engine

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('navbar-container', 'components/navbar.html', initNavbarScript),
    loadComponent('footer-container', 'components/footer.html'),
    loadComponent('floating-contact-container', 'components/floating-contact.html')
  ]);
});

async function loadComponent(containerId, componentUrl, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(componentUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    container.innerHTML = html;
    if (callback) callback();
  } catch (error) {
    console.error(`Error loading component ${componentUrl}:`, error);
  }
}

function initNavbarScript() {
  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-500', 'font-bold');
      link.classList.remove('text-slate-700', 'dark:text-slate-200');
    }
  });

  // Mobile menu drawer toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Theme toggle engine
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons();
    });
  });

  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.icon-sun').forEach(el => el.classList.toggle('hidden', !isDark));
  document.querySelectorAll('.icon-moon').forEach(el => el.classList.toggle('hidden', isDark));
}

// Global Theme Initialization
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  document.documentElement.classList.add('dark');
}
