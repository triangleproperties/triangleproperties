// Triangle Properties - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initFloatingButtons();
  initStatsCounters();
  initFaqAccordions();
  initInquiryForms();
});

/* -------------------------------------------------------------
 * 1. Dark / Light Theme Toggle System
 * ------------------------------------------------------------- */
function initThemeToggle() {
  const savedTheme = localStorage.getItem('triangle_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
  applyTheme(savedTheme);

  // Attach event listeners to all theme toggle buttons (desktop & mobile)
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('triangle_theme', theme);
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    const sunIcon = btn.querySelector('.icon-sun');
    const moonIcon = btn.querySelector('.icon-moon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
  });
}

/* -------------------------------------------------------------
 * 2. Sticky Navbar & Mobile Menu Drawer
 * ------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('shadow-lg');
    } else {
      navbar?.classList.remove('shadow-lg');
    }
  });

  // Mobile drawer toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Active page highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-500', 'font-semibold');
    }
  });
}

/* -------------------------------------------------------------
 * 3. Floating Action Buttons (WhatsApp & Call)
 * ------------------------------------------------------------- */
function initFloatingButtons() {
  if (document.getElementById('floating-cta')) return; // Avoid duplicate

  const company = window.TRIANGLE_DATA?.company || {
    phone: "+91 98765 43210",
    whatsapp: "+919876543210"
  };

  const container = document.createElement('div');
  container.id = 'floating-cta';
  container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end';

  container.innerHTML = `
    <!-- Direct Call Button -->
    <a href="tel:${company.whatsapp}" 
       title="Call Us Now"
       class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-xl transition-all hover:scale-110 group focus:outline-none">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium pr-1">
        Call Sales
      </span>
    </a>

    <!-- WhatsApp Button -->
    <a href="https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello Triangle Properties! I am interested in exploring property options.')}" 
       target="_blank" 
       rel="noopener noreferrer"
       title="Chat on WhatsApp"
       class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl transition-all hover:scale-110 group focus:outline-none animate-pulse-glow">
      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.201-1.101z"/>
      </svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium pr-1">
        WhatsApp Chat
      </span>
    </a>
  `;

  document.body.appendChild(container);
}

/* -------------------------------------------------------------
 * 4. Animated Stats Counters
 * ------------------------------------------------------------- */
function initStatsCounters() {
  const statElements = document.querySelectorAll('.stat-counter');
  if (statElements.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, targetValue, 2000, prefix, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix, suffix) {
  let startTimestamp = null;
  const isFloat = end % 1 !== 0;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (end - start) * easedProgress;

    obj.textContent = prefix + (isFloat ? currentValue.toFixed(1) : Math.floor(currentValue)) + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* -------------------------------------------------------------
 * 5. FAQ Accordions
 * ------------------------------------------------------------- */
function initFaqAccordions() {
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');
      
      const isOpen = !content.classList.contains('hidden');
      
      // Close all others
      document.querySelectorAll('.faq-accordion-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.accordion-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        icon?.classList.add('rotate-180');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. Inquiry Form Submission Handler
 * ------------------------------------------------------------- */
function initInquiryForms() {
  const forms = document.querySelectorAll('.triangle-inquiry-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin h-5 w-5 text-white inline-block mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Submitting...
        `;
      }

      const formData = {
        name: form.querySelector('[name="name"]')?.value || '',
        phone: form.querySelector('[name="phone"]')?.value || '',
        email: form.querySelector('[name="email"]')?.value || '',
        propertyType: form.querySelector('[name="propertyType"]')?.value || 'General Inquiry',
        budget: form.querySelector('[name="budget"]')?.value || '',
        message: form.querySelector('[name="message"]')?.value || '',
        sourcePage: window.location.pathname
      };

      try {
        const result = await window.submitInquiry(formData);
        showToast('Thank you! Your inquiry has been submitted successfully. Our team will call you shortly.', 'success');
        form.reset();
      } catch (err) {
        console.error('Submission error:', err);
        showToast('Inquiry saved! Our sales executive will connect with you soon.', 'info');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * 7. Toast Notification Helper
 * ------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const existing = document.getElementById('triangle-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'triangle-toast';
  
  const bgClass = type === 'success' ? 'bg-emerald-600 text-white' : 
                  type === 'error' ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white';

  toast.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 ${bgClass}`;
  
  toast.innerHTML = `
    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="text-sm font-medium">${message}</span>
    <button onclick="this.parentElement.remove()" class="ml-auto opacity-70 hover:opacity-100">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global export
window.showToast = showToast;
