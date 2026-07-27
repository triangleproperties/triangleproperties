// Triangle Properties Pvt. Ltd. - Full-Stack Professional Admin Management Dashboard JS

const DEFAULT_ADMIN_PASS = "triangle2026";

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initAdminTabs();
  initPropertiesManager();
  initGalleryManager();
  initTestimonialsManager();
  initCompanySettingsManager();
  initCrmDashboard();
});

/* -------------------------------------------------------------
 * 1. Admin Authentication Handler
 * ------------------------------------------------------------- */
function initAdminAuth() {
  const loginModal = document.getElementById('admin-login-modal');
  const loginForm = document.getElementById('admin-login-form');
  const logoutBtn = document.getElementById('admin-logout-btn');
  const authStatus = localStorage.getItem('triangle_admin_authed');

  if (authStatus === 'true') {
    loginModal?.classList.add('hidden');
    renderAllAdminSections();
  } else {
    loginModal?.classList.remove('hidden');
  }

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const passInput = document.getElementById('admin-pass-input');
    const errorMsg = document.getElementById('admin-auth-error');

    if (passInput?.value === DEFAULT_ADMIN_PASS) {
      localStorage.setItem('triangle_admin_authed', 'true');
      loginModal?.classList.add('hidden');
      errorMsg?.classList.add('hidden');
      renderAllAdminSections();
      if (window.showToast) window.showToast('Welcome to Triangle Properties Admin Portal!', 'success');
    } else {
      errorMsg?.classList.remove('hidden');
    }
  });

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('triangle_admin_authed');
    loginModal?.classList.remove('hidden');
    if (window.showToast) window.showToast('Logged out of Admin Portal.', 'info');
  });
}

function renderAllAdminSections() {
  renderOverviewStats();
  renderPropertiesTable();
  renderGalleryGrid();
  renderTestimonialsList();
  renderCompanySettingsForm();
  renderCrmTable();
}

/* -------------------------------------------------------------
 * 2. Tab Navigation System
 * ------------------------------------------------------------- */
function initAdminTabs() {
  const tabs = document.querySelectorAll('.admin-tab-btn');
  const sections = document.querySelectorAll('.admin-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => {
        t.classList.remove('border-amber-500', 'text-amber-500', 'bg-amber-500/10');
        t.classList.add('text-slate-400', 'hover:text-slate-200');
      });

      tab.classList.remove('text-slate-400', 'hover:text-slate-200');
      tab.classList.add('border-amber-500', 'text-amber-500', 'bg-amber-500/10');

      sections.forEach(s => {
        if (s.id === `section-${targetId}`) {
          s.classList.remove('hidden');
        } else {
          s.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 3. Overview Statistics
 * ------------------------------------------------------------- */
function renderOverviewStats() {
  const liveData = window.loadLiveTriangleData();
  const leads = getStoredLeads();

  const propCount = document.getElementById('ov-prop-count');
  const galCount = document.getElementById('ov-gal-count');
  const testCount = document.getElementById('ov-test-count');
  const leadCount = document.getElementById('ov-lead-count');

  if (propCount) propCount.textContent = liveData.properties.length;
  if (galCount) galCount.textContent = liveData.gallery.length;
  if (testCount) testCount.textContent = liveData.testimonials.length;
  if (leadCount) leadCount.textContent = leads.length;
}

/* -------------------------------------------------------------
 * 4. Property Management (Full CRUD)
 * ------------------------------------------------------------- */
function initPropertiesManager() {
  const addPropBtn = document.getElementById('add-prop-btn');
  const propModal = document.getElementById('prop-modal');
  const propForm = document.getElementById('prop-modal-form');
  const cancelBtn = document.getElementById('prop-modal-cancel');
  const uploadImgBtn = document.getElementById('prop-upload-img-btn');

  addPropBtn?.addEventListener('click', () => {
    propForm.reset();
    document.getElementById('prop-id-input').value = '';
    document.getElementById('prop-modal-title').textContent = 'Add New Signature Property';
    propModal?.classList.remove('hidden');
  });

  cancelBtn?.addEventListener('click', () => {
    propModal?.classList.add('hidden');
  });

  uploadImgBtn?.addEventListener('click', () => {
    if (window.openCloudinaryWidget) {
      window.openCloudinaryWidget((url) => {
        document.getElementById('prop-image-input').value = url;
        if (window.showToast) window.showToast('Uploaded Image URL attached to property.', 'success');
      });
    }
  });

  propForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const liveData = window.loadLiveTriangleData();
    const propId = document.getElementById('prop-id-input').value;

    const propData = {
      id: propId || "prop-" + Date.now(),
      title: document.getElementById('prop-title-input').value,
      category: document.getElementById('prop-category-input').value,
      status: document.getElementById('prop-status-input').value,
      price: document.getElementById('prop-price-input').value,
      location: document.getElementById('prop-location-input').value,
      address: document.getElementById('prop-address-input').value,
      bedrooms: parseInt(document.getElementById('prop-bedrooms-input').value || '0', 10),
      bathrooms: parseInt(document.getElementById('prop-bathrooms-input').value || '0', 10),
      areaSqft: parseInt(document.getElementById('prop-sqft-input').value || '0', 10),
      image: document.getElementById('prop-image-input').value || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      description: document.getElementById('prop-desc-input').value,
      featured: document.getElementById('prop-featured-input').checked
    };

    if (propId) {
      // Edit existing
      const index = liveData.properties.findIndex(p => p.id === propId);
      if (index !== -1) liveData.properties[index] = { ...liveData.properties[index], ...propData };
    } else {
      // Add new
      liveData.properties.unshift(propData);
    }

    window.saveLiveTriangleData(liveData);
    propModal?.classList.add('hidden');
    renderPropertiesTable();
    renderOverviewStats();
    if (window.showToast) window.showToast(`Property '${propData.title}' saved successfully!`, 'success');
  });
}

function renderPropertiesTable() {
  const tableBody = document.getElementById('properties-table-body');
  if (!tableBody) return;

  const liveData = window.loadLiveTriangleData();
  const properties = liveData.properties || [];

  if (properties.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="py-12 text-center text-slate-500 font-body text-sm">No properties available. Click 'Add New Property' above.</td></tr>`;
    return;
  }

  tableBody.innerHTML = properties.map(prop => `
    <tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
      <td class="py-4 px-4">
        <img src="${prop.image}" alt="${prop.title}" class="w-16 h-12 object-cover rounded-lg border border-slate-700">
      </td>
      <td class="py-4 px-4">
        <span class="font-display font-bold text-base block text-slate-900 dark:text-white">${prop.title}</span>
        <span class="font-body text-xs text-slate-400 block">${prop.location}</span>
      </td>
      <td class="py-4 px-4 font-button text-xs">${prop.category}</td>
      <td class="py-4 px-4 font-display font-bold text-amber-500">${prop.price}</td>
      <td class="py-4 px-4">
        <span class="font-button text-[10px] uppercase px-2.5 py-1 rounded-full ${prop.status === 'For Sale' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'}">
          ${prop.status}
        </span>
      </td>
      <td class="py-4 px-4">
        <div class="flex items-center gap-2">
          <button onclick="editProperty('${prop.id}')" title="Edit Property" class="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">edit</span>
          </button>
          <button onclick="deleteProperty('${prop.id}')" title="Delete Property" class="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.editProperty = function(id) {
  const liveData = window.loadLiveTriangleData();
  const prop = liveData.properties.find(p => p.id === id);
  if (!prop) return;

  document.getElementById('prop-id-input').value = prop.id;
  document.getElementById('prop-title-input').value = prop.title || '';
  document.getElementById('prop-category-input').value = prop.category || 'Apartment';
  document.getElementById('prop-status-input').value = prop.status || 'For Sale';
  document.getElementById('prop-price-input').value = prop.price || '';
  document.getElementById('prop-location-input').value = prop.location || '';
  document.getElementById('prop-address-input').value = prop.address || '';
  document.getElementById('prop-bedrooms-input').value = prop.bedrooms || 0;
  document.getElementById('prop-bathrooms-input').value = prop.bathrooms || 0;
  document.getElementById('prop-sqft-input').value = prop.areaSqft || 0;
  document.getElementById('prop-image-input').value = prop.image || '';
  document.getElementById('prop-desc-input').value = prop.description || '';
  document.getElementById('prop-featured-input').checked = !!prop.featured;

  document.getElementById('prop-modal-title').textContent = 'Edit Signature Property';
  document.getElementById('prop-modal').classList.remove('hidden');
};

window.deleteProperty = function(id) {
  if (!confirm(`Are you sure you want to delete property ${id}?`)) return;
  const liveData = window.loadLiveTriangleData();
  liveData.properties = liveData.properties.filter(p => p.id !== id);
  window.saveLiveTriangleData(liveData);
  renderPropertiesTable();
  renderOverviewStats();
  if (window.showToast) window.showToast(`Property deleted.`, 'info');
};

/* -------------------------------------------------------------
 * 5. Gallery Management (Full CRUD)
 * ------------------------------------------------------------- */
function initGalleryManager() {
  const addGalBtn = document.getElementById('add-gal-btn');
  const galModal = document.getElementById('gal-modal');
  const galForm = document.getElementById('gal-modal-form');
  const cancelBtn = document.getElementById('gal-modal-cancel');
  const uploadBtn = document.getElementById('gal-upload-img-btn');

  addGalBtn?.addEventListener('click', () => {
    galForm.reset();
    galModal?.classList.remove('hidden');
  });

  cancelBtn?.addEventListener('click', () => {
    galModal?.classList.add('hidden');
  });

  uploadBtn?.addEventListener('click', () => {
    if (window.openCloudinaryWidget) {
      window.openCloudinaryWidget((url) => {
        document.getElementById('gal-image-input').value = url;
        if (window.showToast) window.showToast('Photo uploaded to Cloudinary!', 'success');
      });
    }
  });

  galForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const liveData = window.loadLiveTriangleData();

    const newItem = {
      id: "gal-" + Date.now(),
      title: document.getElementById('gal-title-input').value,
      category: document.getElementById('gal-category-input').value,
      image: document.getElementById('gal-image-input').value
    };

    liveData.gallery.unshift(newItem);
    window.saveLiveTriangleData(liveData);
    galModal?.classList.add('hidden');
    renderGalleryGrid();
    renderOverviewStats();
    if (window.showToast) window.showToast('Gallery photo added!', 'success');
  });
}

function renderGalleryGrid() {
  const grid = document.getElementById('gallery-manager-grid');
  if (!grid) return;

  const liveData = window.loadLiveTriangleData();
  const items = liveData.gallery || [];

  if (items.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-slate-500 font-body text-sm">No gallery photos. Click 'Upload Gallery Photo' above.</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="glass-card rounded-xl overflow-hidden group relative">
      <div class="aspect-[4/3] overflow-hidden">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      </div>
      <div class="p-4 flex items-center justify-between">
        <div>
          <span class="font-button text-[10px] uppercase text-amber-500 block">${item.category}</span>
          <h3 class="font-display font-bold text-sm text-slate-900 dark:text-white truncate max-w-[180px]">${item.title}</h3>
        </div>
        <button onclick="deleteGalleryItem('${item.id}')" title="Delete Photo" class="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    </div>
  `).join('');
}

window.deleteGalleryItem = function(id) {
  if (!confirm('Are you sure you want to delete this gallery photo?')) return;
  const liveData = window.loadLiveTriangleData();
  liveData.gallery = liveData.gallery.filter(g => g.id !== id);
  window.saveLiveTriangleData(liveData);
  renderGalleryGrid();
  renderOverviewStats();
  if (window.showToast) window.showToast('Gallery photo removed.', 'info');
};

/* -------------------------------------------------------------
 * 6. Testimonials & Reviews Management (Full CRUD)
 * ------------------------------------------------------------- */
function initTestimonialsManager() {
  const addBtn = document.getElementById('add-test-btn');
  const modal = document.getElementById('test-modal');
  const form = document.getElementById('test-modal-form');
  const cancelBtn = document.getElementById('test-modal-cancel');

  addBtn?.addEventListener('click', () => {
    form.reset();
    document.getElementById('test-id-input').value = '';
    modal?.classList.remove('hidden');
  });

  cancelBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const liveData = window.loadLiveTriangleData();
    const testId = document.getElementById('test-id-input').value;

    const itemData = {
      id: testId || "test-" + Date.now(),
      name: document.getElementById('test-name-input').value,
      role: document.getElementById('test-role-input').value || "Verified Google Reviewer",
      rating: parseInt(document.getElementById('test-rating-input').value || '5', 10),
      time: document.getElementById('test-time-input').value || "Recent",
      avatar: document.getElementById('test-avatar-input').value || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: document.getElementById('test-content-input').value
    };

    if (testId) {
      const idx = liveData.testimonials.findIndex(t => t.id === testId);
      if (idx !== -1) liveData.testimonials[idx] = itemData;
    } else {
      liveData.testimonials.unshift(itemData);
    }

    window.saveLiveTriangleData(liveData);
    modal?.classList.add('hidden');
    renderTestimonialsList();
    renderOverviewStats();
    if (window.showToast) window.showToast('Review saved successfully!', 'success');
  });
}

function renderTestimonialsList() {
  const container = document.getElementById('testimonials-manager-list');
  if (!container) return;

  const liveData = window.loadLiveTriangleData();
  const items = liveData.testimonials || [];

  if (items.length === 0) {
    container.innerHTML = `<div class="py-12 text-center text-slate-500 font-body text-sm">No reviews found. Click 'Add New Review' above.</div>`;
    return;
  }

  container.innerHTML = items.map(t => `
    <div class="glass-card p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-amber-400 text-xs tracking-widest">${'★'.repeat(t.rating || 5)}</span>
          <span class="font-button text-[10px] text-slate-400 uppercase">${t.time}</span>
        </div>
        <p class="font-body text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">"${t.content}"</p>
      </div>
      <div class="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <img src="${t.avatar}" alt="${t.name}" class="w-8 h-8 rounded-full object-cover">
          <div>
            <h4 class="font-display font-bold text-sm text-slate-900 dark:text-white">${t.name}</h4>
            <span class="font-button text-[10px] text-slate-500 block">${t.role}</span>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="editTestimonial('${t.id}')" title="Edit" class="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-sm">edit</span>
          </button>
          <button onclick="deleteTestimonial('${t.id}')" title="Delete" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.editTestimonial = function(id) {
  const liveData = window.loadLiveTriangleData();
  const item = liveData.testimonials.find(t => t.id === id);
  if (!item) return;

  document.getElementById('test-id-input').value = item.id;
  document.getElementById('test-name-input').value = item.name || '';
  document.getElementById('test-role-input').value = item.role || '';
  document.getElementById('test-rating-input').value = item.rating || 5;
  document.getElementById('test-time-input').value = item.time || '';
  document.getElementById('test-avatar-input').value = item.avatar || '';
  document.getElementById('test-content-input').value = item.content || '';

  document.getElementById('test-modal').classList.remove('hidden');
};

window.deleteTestimonial = function(id) {
  if (!confirm('Delete this testimonial?')) return;
  const liveData = window.loadLiveTriangleData();
  liveData.testimonials = liveData.testimonials.filter(t => t.id !== id);
  window.saveLiveTriangleData(liveData);
  renderTestimonialsList();
  renderOverviewStats();
  if (window.showToast) window.showToast('Testimonial deleted.', 'info');
};

/* -------------------------------------------------------------
 * 7. Company Settings Management
 * ------------------------------------------------------------- */
function initCompanySettingsManager() {
  const form = document.getElementById('company-settings-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const liveData = window.loadLiveTriangleData();

    liveData.company = {
      ...liveData.company,
      name: document.getElementById('set-company-name').value,
      tagline: document.getElementById('set-tagline').value,
      phone1: document.getElementById('set-phone1').value,
      phone2: document.getElementById('set-phone2').value,
      whatsapp: document.getElementById('set-whatsapp').value,
      email: document.getElementById('set-email').value,
      address: document.getElementById('set-address').value,
      socialLinks: {
        instagram: document.getElementById('set-instagram').value,
        facebook: document.getElementById('set-facebook').value,
        googleReviews: document.getElementById('set-google').value
      }
    };

    window.saveLiveTriangleData(liveData);
    if (window.showToast) window.showToast('Company Settings updated successfully!', 'success');
  });
}

function renderCompanySettingsForm() {
  const liveData = window.loadLiveTriangleData();
  const c = liveData.company;
  if (!c) return;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

  setVal('set-company-name', c.name);
  setVal('set-tagline', c.tagline);
  setVal('set-phone1', c.phone1);
  setVal('set-phone2', c.phone2);
  setVal('set-whatsapp', c.whatsapp);
  setVal('set-email', c.email);
  setVal('set-address', c.address);
  setVal('set-instagram', c.socialLinks?.instagram);
  setVal('set-facebook', c.socialLinks?.facebook);
  setVal('set-google', c.socialLinks?.googleReviews);
}

/* -------------------------------------------------------------
 * 8. Lead Management & Local Storage Queue (CRM)
 * ------------------------------------------------------------- */
function getStoredLeads() {
  const defaultLeads = [
    {
      id: "LEAD-1001",
      name: "Suryamech",
      phone: "9840123456",
      email: "surya@example.com",
      propertyType: "Apartment Purchase",
      budget: "₹ 85 Lakhs",
      message: "Looking for a 3 BHK near Vadapalani Metro station.",
      status: "New",
      sourcePage: "/index.html",
      timestamp: "2026-07-27 10:15 AM"
    },
    {
      id: "LEAD-1002",
      name: "Dillibabu Ramu",
      phone: "9444156789",
      email: "dillibabu@example.com",
      propertyType: "Villa Purchase",
      budget: "₹ 3.0 Cr",
      message: "Interested in ECR oceanfront villa site visit.",
      status: "Site Visit Scheduled",
      sourcePage: "/properties.html",
      timestamp: "2026-07-26 04:30 PM"
    },
    {
      id: "LEAD-1003",
      name: "Sandhiya Jagadeesan",
      phone: "9790112233",
      email: "sandhiya@example.com",
      propertyType: "Joint Venture Proposal",
      budget: "2 Grounds in Anna Nagar",
      message: "Plot available for JV development on 40ft road.",
      status: "Contacted",
      sourcePage: "/joint-venture.html",
      timestamp: "2026-07-25 11:20 AM"
    }
  ];

  const stored = localStorage.getItem('triangle_crm_leads');
  if (!stored) {
    localStorage.setItem('triangle_crm_leads', JSON.stringify(defaultLeads));
    return defaultLeads;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultLeads;
  }
}

function saveLeads(leads) {
  localStorage.setItem('triangle_crm_leads', JSON.stringify(leads));
  renderCrmTable();
}

window.addCrmLead = function(leadData) {
  const leads = getStoredLeads();
  const newLead = {
    id: "LEAD-" + Math.floor(1000 + Math.random() * 9000),
    name: leadData.name || "Anonymous Lead",
    phone: leadData.phone || "N/A",
    email: leadData.email || "N/A",
    propertyType: leadData.propertyType || "General Inquiry",
    budget: leadData.budget || "N/A",
    message: leadData.message || "",
    status: "New",
    sourcePage: leadData.sourcePage || window.location.pathname,
    timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
  };
  leads.unshift(newLead);
  saveLeads(leads);
};

function initCrmDashboard() {
  const searchInput = document.getElementById('crm-search-input');
  const statusFilter = document.getElementById('crm-status-filter');
  const categoryFilter = document.getElementById('crm-category-filter');
  const exportBtn = document.getElementById('crm-export-btn');

  searchInput?.addEventListener('input', renderCrmTable);
  statusFilter?.addEventListener('change', renderCrmTable);
  categoryFilter?.addEventListener('change', renderCrmTable);
  exportBtn?.addEventListener('click', exportLeadsToCsv);
}

function renderCrmTable() {
  const tableBody = document.getElementById('crm-table-body');
  if (!tableBody) return;

  const leads = getStoredLeads();
  const searchVal = (document.getElementById('crm-search-input')?.value || '').toLowerCase();
  const statusVal = document.getElementById('crm-status-filter')?.value || 'ALL';
  const categoryVal = document.getElementById('crm-category-filter')?.value || 'ALL';

  const filtered = leads.filter(lead => {
    const matchSearch = lead.name.toLowerCase().includes(searchVal) || 
                        lead.phone.includes(searchVal) || 
                        lead.propertyType.toLowerCase().includes(searchVal) ||
                        lead.id.toLowerCase().includes(searchVal);
    const matchStatus = statusVal === 'ALL' || lead.status === statusVal;
    const matchCategory = categoryVal === 'ALL' || lead.propertyType.toLowerCase().includes(categoryVal.toLowerCase());
    return matchSearch && matchStatus && matchCategory;
  });

  updateKpiCounters(leads);

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="py-12 text-center text-slate-500 font-body text-sm">No inquiries match filter criteria.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtered.map(lead => `
    <tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
      <td class="py-4 px-4 font-button text-xs text-amber-500 font-bold">${lead.id}</td>
      <td class="py-4 px-4">
        <span class="font-display font-bold text-base block text-slate-900 dark:text-white">${lead.name}</span>
        <span class="font-body text-[11px] text-slate-400 block">${lead.timestamp}</span>
      </td>
      <td class="py-4 px-4">
        <a href="tel:${lead.phone}" class="font-body text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-500 block mb-0.5">${lead.phone}</a>
        <span class="font-body text-[11px] text-slate-400 block">${lead.email}</span>
      </td>
      <td class="py-4 px-4">
        <span class="font-button text-[10px] uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 block w-fit mb-1">
          ${lead.propertyType}
        </span>
        <span class="font-body text-[11px] text-slate-400 block truncate max-w-xs" title="${lead.message}">${lead.message || 'No details'}</span>
      </td>
      <td class="py-4 px-4">
        <select onchange="updateLeadStatus('${lead.id}', this.value)" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-button font-semibold focus:outline-none focus:border-amber-500">
          <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
          <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Site Visit Scheduled" ${lead.status === 'Site Visit Scheduled' ? 'selected' : ''}>Site Visit Scheduled</option>
          <option value="Negotiation" ${lead.status === 'Negotiation' ? 'selected' : ''}>Negotiation</option>
          <option value="Closed" ${lead.status === 'Closed' ? 'selected' : ''}>Closed / Won</option>
        </select>
      </td>
      <td class="py-4 px-4">
        <div class="flex items-center gap-2">
          <a href="https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, regarding your inquiry for ${lead.propertyType} with Triangle Properties Pvt. Ltd.`)}" 
             target="_blank" rel="noopener noreferrer" title="WhatsApp Lead" 
             class="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.201-1.101z"/></svg>
          </a>
          <a href="tel:${lead.phone}" title="Call Lead" class="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">call</span>
          </a>
          <button onclick="deleteLead('${lead.id}')" title="Delete Record" class="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function updateKpiCounters(leads) {
  const totalEl = document.getElementById('kpi-total-leads');
  const newEl = document.getElementById('kpi-new-leads');
  const siteVisitsEl = document.getElementById('kpi-site-visits');
  const closedEl = document.getElementById('kpi-closed-leads');

  if (totalEl) totalEl.textContent = leads.length;
  if (newEl) newEl.textContent = leads.filter(l => l.status === 'New').length;
  if (siteVisitsEl) siteVisitsEl.textContent = leads.filter(l => l.status === 'Site Visit Scheduled').length;
  if (closedEl) closedEl.textContent = leads.filter(l => l.status === 'Closed').length;
}

window.updateLeadStatus = function(id, newStatus) {
  const leads = getStoredLeads();
  const target = leads.find(l => l.id === id);
  if (target) {
    target.status = newStatus;
    saveLeads(leads);
    if (window.showToast) window.showToast(`Updated ${id} status to ${newStatus}`, 'success');
  }
};

window.deleteLead = function(id) {
  if (!confirm(`Are you sure you want to delete lead ${id}?`)) return;
  let leads = getStoredLeads();
  leads = leads.filter(l => l.id !== id);
  saveLeads(leads);
  if (window.showToast) window.showToast(`Lead ${id} removed.`, 'info');
};

function exportLeadsToCsv() {
  const leads = getStoredLeads();
  if (leads.length === 0) {
    alert("No lead data to export.");
    return;
  }

  const headers = ["Lead ID", "Name", "Phone", "Email", "Inquiry Type", "Budget / Details", "Message", "Status", "Source Page", "Timestamp"];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.email}"`,
    `"${l.propertyType}"`,
    `"${(l.budget || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.sourcePage}"`,
    `"${l.timestamp}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Triangle_Properties_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
