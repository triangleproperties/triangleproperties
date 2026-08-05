// Triangle Properties Pvt. Ltd. - Main Application Logic (Mobile, Hero Carousel & Lead Persistence)

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initThemeToggle();
  initNavigation();
  initHeroCarousel();
  initFloatingButtons();
  initStatsCounters();
  initFaqAccordions();
  initInquiryForms();
  initTestimonialsSlider();
});

/* -------------------------------------------------------------
 * 1. Scroll Progress Bar
 * ------------------------------------------------------------- */
function initScrollProgressBar() {
  if (document.getElementById('scroll-progress-bar')) return;

  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

/* -------------------------------------------------------------
 * 2. Dark / Light Theme Toggle System
 * ------------------------------------------------------------- */
function initThemeToggle() {
  const savedTheme = localStorage.getItem('triangle_theme') || localStorage.getItem('theme') || 'light';
  if (typeof window.applyTriangleTheme === 'function') {
    window.applyTriangleTheme(savedTheme);
  }

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      btn.classList.add('theme-icon-animate');
      setTimeout(() => btn.classList.remove('theme-icon-animate'), 400);

      if (typeof window.applyTriangleTheme === 'function') {
        window.applyTriangleTheme(newTheme);
      }
    };
  });
}
window.initThemeToggle = initThemeToggle;

/* -------------------------------------------------------------
 * 3. Sticky Navbar & Mobile Menu Drawer
 * ------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('shadow-xl');
    } else {
      navbar?.classList.remove('shadow-xl');
    }
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-500', 'font-bold');
    }
  });
}
window.initNavigation = initNavigation;

/* -------------------------------------------------------------
 * 4. Hero Section Background Carousel
 * ------------------------------------------------------------- */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');

  const heroBadge = document.getElementById('hero-slide-badge');
  const heroHeading = document.getElementById('hero-slide-heading');
  const heroText = document.getElementById('hero-slide-text');

  if (slides.length === 0) return;

  const slideData = [
    {
      badge: "TAP into Smart Investments",
      heading: "Premium Plots in Kuthambakkam <br/><span class=\"gold-gradient-text italic font-serif\">Susee Alight – ₹1,899/sq.ft</span>",
      text: "Triangle Properties delivers DTCP & RERA approved gated community plots in Kuthambakkam, Poonamallee with 33ft blacktop roads and 100% legal title clearance."
    },
    {
      badge: "On-Road Resort Plots on ECR",
      heading: "Ishwarya Nagar – ECR <br/><span class=\"gold-gradient-text italic font-serif\">Affordable Luxury at ₹777/sq.ft</span>",
      text: "DTCP approved prime resort plots in Koovathur, ECR with avenue trees, entrance arch, street lights, and high appreciation potential."
    },
    {
      badge: "Kadambathur, Tiruvallur",
      heading: "M.A. Nagar Tiruvallur <br/><span class=\"gold-gradient-text italic font-serif\">Exclusive Price ₹899/sq.ft</span>",
      text: "DTCP approved 4.7-acre gated layout with 30ft roads, 24x7 security, EB facility, and ready for immediate registration."
    }
  ];

  let currentSlide = 0;
  let carouselTimer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0');
        slide.classList.add('opacity-100');
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
      }
    });

    indicators.forEach((ind, i) => {
      if (i === index) {
        ind.classList.remove('w-2.5', 'bg-slate-600');
        ind.classList.add('w-8', 'bg-amber-500');
      } else {
        ind.classList.remove('w-8', 'bg-amber-500');
        ind.classList.add('w-2.5', 'bg-slate-600');
      }
    });

    if (heroBadge && slideData[index]) heroBadge.innerHTML = slideData[index].badge;
    if (heroHeading && slideData[index]) heroHeading.innerHTML = slideData[index].heading;
    if (heroText && slideData[index]) heroText.innerHTML = slideData[index].text;

    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoCycle() {
    stopAutoCycle();
    carouselTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoCycle() {
    if (carouselTimer) clearInterval(carouselTimer);
  }

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoCycle();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoCycle();
  });

  indicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const idx = parseInt(ind.getAttribute('data-slide') || '0', 10);
      showSlide(idx);
      startAutoCycle();
    });
  });

  startAutoCycle();
}

/* -------------------------------------------------------------
 * 5. Floating Action Buttons (WhatsApp & Call)
 * ------------------------------------------------------------- */
function initFloatingButtons() {
  if (document.getElementById('floating-cta') || document.getElementById('floating-contact-bar') || document.getElementById('floating-contact-container')) return;

  const whatsappNum = "918838957874";
  const phoneNum = "+918838957874";

  const container = document.createElement('div');
  container.id = 'floating-cta';
  container.className = 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3 items-end';

  container.innerHTML = `
    <!-- Direct Call Button -->
    <a href="tel:${phoneNum}" 
       title="Call Triangle Properties"
       class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-3.5 rounded-full shadow-2xl transition-all hover:scale-110 group focus:outline-none">
      <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1 hidden sm:inline">
        Call 8838957874
      </span>
    </a>

    <!-- WhatsApp Button -->
    <a href="https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Triangle Properties! I am interested in exploring property options in Chennai.')}" 
       target="_blank" 
       rel="noopener noreferrer"
       title="Chat on WhatsApp"
       class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3 sm:p-3.5 rounded-full shadow-2xl transition-all hover:scale-110 group focus:outline-none animate-pulse-glow">
      <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.477 1.33 4.987l-1.412 5.157 5.281-1.385c1.455.793 3.09 1.213 4.788 1.215h.004c5.505 0 9.988-4.478 9.99-9.985 0-2.667-1.037-5.176-2.923-7.062a9.924 9.924 0 0 0-7.068-2.931z"/>
      </svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1 hidden sm:inline">
        WhatsApp Us
      </span>
    </a>
  `;

  document.body.appendChild(container);
}

/* -------------------------------------------------------------
 * 6. Animated Stats Counters
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
  }, { threshold: 0.2 });

  statElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix, suffix) {
  let startTimestamp = null;
  const isFloat = end % 1 !== 0;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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
 * 7. FAQ Accordions
 * ------------------------------------------------------------- */
function initFaqAccordions() {
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');
      
      const isOpen = !content.classList.contains('hidden');
      
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
 * 8. Inquiry Form Submission & Local CRM Lead Capture
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

      // Anti-Spam Honeypot Verification
      const honeypotVal = form.querySelector('[name="website_url_hp"]')?.value;
      if (honeypotVal) {
        console.warn("Spam bot submission blocked via honeypot field.");
        showToast('Inquiry received successfully!', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        return;
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

      // Store in Admin CRM database
      if (window.addCrmLead) {
        window.addCrmLead(formData);
      }

      try {
        if (window.submitInquiry) await window.submitInquiry(formData);
        showToast('Thank you! Your inquiry has been logged in Triangle Properties CRM. Our advisor will connect with you shortly.', 'success');
        form.reset();
      } catch (err) {
        console.error('Submission error:', err);
        showToast('Inquiry logged in CRM! Our sales team will connect with you soon.', 'info');
        form.reset();
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
 * 9. Toast Notification Helper
 * ------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const existing = document.getElementById('triangle-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'triangle-toast';
  
  const bgClass = type === 'success' ? 'bg-emerald-600 text-white' : 
                  type === 'error' ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white';

  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 ${bgClass}`;
  
  toast.innerHTML = `
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="text-xs sm:text-sm font-medium">${message}</span>
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

/* -------------------------------------------------------------
 * 10. Testimonials Left/Right Slider
 * ------------------------------------------------------------- */
function initTestimonialsSlider() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  let currentIndex = 0;
  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : { testimonials: [] };
  const items = liveData.testimonials || [];

  if (items.length === 0) return;

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderClientAvatarHTML(t) {
    const name = t.name || 'Client';
    const avatarUrl = t.avatar || '';
    
    if (avatarUrl && !avatarUrl.includes('images.unsplash.com')) {
      return `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(name)}" class="w-10 h-10 rounded-full object-cover border border-amber-500/30 flex-shrink-0">`;
    }
    
    const initial = escapeHtml(name.charAt(0).toUpperCase() || 'C');
    const colorClasses = [
      'bg-blue-600 text-white',
      'bg-emerald-600 text-white',
      'bg-rose-600 text-white',
      'bg-amber-600 text-white',
      'bg-purple-600 text-white',
      'bg-teal-600 text-white'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const colorClass = colorClasses[Math.abs(hash) % colorClasses.length];

    return `
      <div class="w-10 h-10 rounded-full ${colorClass} font-bold font-button flex items-center justify-center text-sm shadow-md border border-amber-500/20 flex-shrink-0">
        ${initial}
      </div>
    `;
  }

  function renderSlide() {
    const visibleCount = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const sliced = [];
    for (let i = 0; i < visibleCount; i++) {
      sliced.push(items[(currentIndex + i) % items.length]);
    }

    container.innerHTML = sliced.map(t => `
      <div class="glass-card p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-amber-400 text-sm tracking-widest">${'★'.repeat(t.rating || 5)}</span>
            <span class="text-xs text-slate-400 font-button">Google Review</span>
          </div>
          <p class="font-body text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
            "${escapeHtml(t.content)}"
          </p>
        </div>
        <div class="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          ${renderClientAvatarHTML(t)}
          <div>
            <h3 class="font-display text-base font-bold text-slate-900 dark:text-white">${escapeHtml(t.name)}</h3>
            <p class="font-button text-[10px] uppercase text-slate-500">${escapeHtml(t.role)} • ${escapeHtml(t.time || 'Verified')}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  const prevBtn = document.getElementById('testimonial-prev-btn');
  const nextBtn = document.getElementById('testimonial-next-btn');

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderSlide();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    renderSlide();
  });

  renderSlide();
  window.addEventListener('resize', renderSlide);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    renderSlide();
  }, 6000);
}

window.showToast = showToast;
