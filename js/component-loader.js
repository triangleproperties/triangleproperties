// Triangle Properties Pvt. Ltd. - Dynamic Component Loader & Universal Dual Theme Engine

// Global Unified Theme State Functions
function getSavedTheme() {
  return localStorage.getItem('triangle_theme') || localStorage.getItem('theme') || 'light';
}

function applyTriangleTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  localStorage.setItem('triangle_theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  
  // Sun icon is displayed in Dark mode (click to switch to Light)
  document.querySelectorAll('.icon-sun').forEach(el => {
    if (isDark) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Moon icon is displayed in Light mode (click to switch to Dark)
  document.querySelectorAll('.icon-moon').forEach(el => {
    if (isDark) {
      el.classList.add('hidden');
    } else {
      el.classList.remove('hidden');
    }
  });
}

// 1. Immediate Theme Initialization (Guarantees zero theme flash on navigation)
(function initTheme() {
  applyTriangleTheme(getSavedTheme());
})();

window.applyTriangleTheme = applyTriangleTheme;
window.updateThemeIcons = updateThemeIcons;

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('navbar-container', 'components/navbar.html', initNavbarScript),
    loadComponent('footer-container', 'components/footer.html'),
    loadComponent('floating-contact-container', 'components/floating-contact.html')
  ]);
  // Re-sync theme state & icons after async components finish mounting
  updateThemeIcons();
  updateFooterCompanyInfo();

  window.addEventListener('triangle_data_updated', updateFooterCompanyInfo);
  window.addEventListener('storage', (e) => {
    if (e.key === 'triangle_custom_data') updateFooterCompanyInfo();
  });
});

function updateFooterCompanyInfo() {
  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  const company = liveData.company || (window.BASE_TRIANGLE_DATA ? window.BASE_TRIANGLE_DATA.company : {});
  if (!company) return;

  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  const addressP = footerContainer.querySelector('footer div:nth-child(4) p');
  if (addressP && company.address) {
    addressP.textContent = company.address;
  }

  const phoneLinks = footerContainer.querySelectorAll('a[href^="tel:"]');
  if (phoneLinks.length > 0 && company.phone1) {
    phoneLinks[0].textContent = company.phone1Display || `+91 ${company.phone1.slice(0,5)} ${company.phone1.slice(5)}`;
    phoneLinks[0].href = `tel:${company.phone1}`;
  }
  if (phoneLinks.length > 1 && company.phone2) {
    phoneLinks[1].textContent = company.phone2Display || `+91 ${company.phone2.slice(0,5)} ${company.phone2.slice(5)}`;
    phoneLinks[1].href = `tel:${company.phone2}`;
  }

  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  if (company.whatsapp) {
    let cleanWa = company.whatsapp.replace(/\D/g, '');
    if (!cleanWa.startsWith('91') || cleanWa.length < 12) {
      cleanWa = '91' + cleanWa;
    }
    waLinks.forEach(link => {
      let search = '';
      try {
        const u = new URL(link.href, window.location.origin);
        search = u.search;
      } catch (e) {}
      link.href = `https://wa.me/${cleanWa}${search}`;
    });
  }
}

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
  // Highlight active link based on current page
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
    menuBtn.onclick = () => {
      mobileMenu.classList.toggle('hidden');
    };
  }

  // Theme toggle engine (Sun/Moon Dual Theme Switcher)
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTriangleTheme(newTheme);
    };
  });

  updateThemeIcons();
}
