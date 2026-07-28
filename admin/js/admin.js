// Triangle Properties Pvt. Ltd. - Modular Admin Control Panel Engine
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// 1. CONFIGURATIONS
const firebaseConfig = {
  apiKey: "AIzaSyAKVhfxCv8mVmjDnzA2Cu-SeskSIM1mpC8",
  authDomain: "triangle-properties.firebaseapp.com",
  databaseURL: "https://triangle-properties-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "triangle-properties",
  storageBucket: "triangle-properties.firebasestorage.app",
  messagingSenderId: "743369492490",
  appId: "1:743369492490:web:830a7fd8c7a97b02a377f3",
  measurementId: "G-1W56Z1ESM8"
};

const CLOUD_NAME = "triangle-properties";
const UPLOAD_PRESET = "ltriw2oi";

// 2. STATE STORAGE
let app, auth, db;
let state = {
  properties: [],
  categories: [],
  enquiries: [],
  gallery: [],
  services: [],
  user: null
};

// Helper: Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-950 border-emerald-500/50 text-emerald-200' :
                  type === 'error' ? 'bg-rose-950 border-rose-500/50 text-rose-200' :
                  'bg-slate-900 border-amber-500/50 text-amber-200';

  toast.className = `glass-panel px-4 py-3 rounded-xl border text-xs font-button shadow-2xl flex items-center gap-2 ${bgClass}`;
  toast.innerHTML = `<span class="material-symbols-outlined text-base">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Helper: HTML Escaping
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// 3. DIAGNOSTIC SELF-CHECK ON PAGE LOAD
function runDiagnosticCheck() {
  const banner = document.getElementById('diagnostic-banner');
  const text = document.getElementById('diagnostic-text');
  if (!banner || !text) return;
  
  const errors = [];
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('[YOUR')) {
    errors.push("Firebase API Key is missing or unconfigured.");
  }
  if (!firebaseConfig.projectId || firebaseConfig.projectId.includes('[YOUR')) {
    errors.push("Firebase Project ID is missing.");
  }

  if (errors.length > 0) {
    text.textContent = `Diagnostic Notice: ${errors.join(" | ")}`;
    banner.classList.remove('hidden');
  }
}

// 4. INITIALIZE FIREBASE V11
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("🔥 Admin Firebase v11 Modular SDK initialized successfully!");
} catch (e) {
  console.error("Firebase init error:", e);
  const text = document.getElementById('diagnostic-text');
  const banner = document.getElementById('diagnostic-banner');
  if (text && banner) {
    text.textContent = `Firebase Error: ${e.message}`;
    banner.classList.remove('hidden');
  }
}

// 5. MANUAL & CLOUD IMAGE UPLOAD ENGINE
async function uploadToCloudinary(file) {
  if (!file) return null;
  showToast("Processing selected image...", "info");

  if (CLOUD_NAME && UPLOAD_PRESET && !UPLOAD_PRESET.includes('[YOUR')) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        showToast("Uploaded to Cloudinary CDN!", "success");
        return data.secure_url;
      }
    } catch (err) {
      console.warn("Cloudinary upload notice (switching to Base64 fallback):", err);
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      showToast("Local image processed & attached!", "success");
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

// 6. AUTHENTICATION FLOW
runDiagnosticCheck();

if (auth) {
  onAuthStateChanged(auth, async (user) => {
    const authScreen = document.getElementById('auth-screen');
    const dashScreen = document.getElementById('dashboard-screen');
    const emailDisplay = document.getElementById('user-email-display');

    if (user) {
      state.user = user;
      if (emailDisplay) emailDisplay.textContent = user.email || 'admin@triangleproperties.in';
      authScreen?.classList.add('hidden');
      dashScreen?.classList.remove('hidden');
      await loadDashboardData();
    } else {
      state.user = null;
      dashScreen?.classList.add('hidden');
      authScreen?.classList.remove('hidden');
    }
  });
}

// Login Form Submit
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  const submitBtn = document.getElementById('login-submit-btn');

  if (submitBtn) submitBtn.textContent = "Authenticating...";

  try {
    if (auth) {
      await signInWithEmailAndPassword(auth, email, pass);
      showToast("Welcome back Admin!", "success");
    } else {
      document.getElementById('auth-screen')?.classList.add('hidden');
      document.getElementById('dashboard-screen')?.classList.remove('hidden');
      await loadDashboardData();
    }
  } catch (err) {
    showToast(`Sign in error: ${err.message}`, "error");
  } finally {
    if (submitBtn) submitBtn.textContent = "Sign In";
  }
});

// Logout Button
document.getElementById('logout-btn')?.addEventListener('click', async () => {
  try {
    if (auth) await signOut(auth);
    document.getElementById('dashboard-screen')?.classList.add('hidden');
    document.getElementById('auth-screen')?.classList.remove('hidden');
    showToast("Signed out safely.", "info");
  } catch (err) {
    showToast(`Logout error: ${err.message}`, "error");
  }
});

// 7. TAB NAVIGATION
const tabBtns = document.querySelectorAll('.nav-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const pageTitle = document.getElementById('page-title');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    tabBtns.forEach(b => {
      b.classList.remove('text-primary', 'bg-primary/10', 'border', 'border-primary/20');
      b.classList.add('text-on-surface-variant');
    });
    btn.classList.remove('text-on-surface-variant');
    btn.classList.add('text-primary', 'bg-primary/10', 'border', 'border-primary/20');

    tabContents.forEach(c => c.classList.add('hidden'));
    document.getElementById(`tab-${tab}`)?.classList.remove('hidden');

    if (pageTitle) {
      pageTitle.textContent = tab === 'properties' ? 'Signature Properties' :
                              tab === 'categories' ? 'Real Estate Categories' :
                              tab === 'gallery' ? 'Architectural Photo Gallery' : 'Customer Enquiries & Leads';
    }
  });
});

// 8. DATA LOAD & FIRESTORE CRUD WITH FRONTEND DUMMY SEED SYNC
async function loadDashboardData() {
  await Promise.all([fetchProperties(), fetchCategories(), fetchEnquiries()]);
  fetchGallery();
  renderStats();
}

// A. PROPERTIES CRUD
async function fetchProperties() {
  try {
    if (db) {
      const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      if (snap.docs.length > 0) {
        state.properties = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (e) {
    console.warn("Firestore fetch properties notice:", e);
  }

  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  if (!state.properties || state.properties.length === 0) {
    state.properties = (liveData.properties && liveData.properties.length > 0) ? liveData.properties : (window.BASE_TRIANGLE_DATA ? window.BASE_TRIANGLE_DATA.properties : []);
  }
  renderProperties();
}

function renderProperties() {
  const container = document.getElementById('properties-list');
  if (!container) return;

  container.innerHTML = state.properties.map(p => `
    <tr class="border-b border-slate-800 hover:bg-surface-container-high/50 transition-colors">
      <td class="py-3 px-4">
        <img src="${escapeHtml(p.image)}" class="w-14 h-10 object-cover rounded-lg border border-slate-700">
      </td>
      <td class="py-3 px-4">
        <span class="font-display font-bold text-white text-base block">${escapeHtml(p.title)}</span>
        <span class="font-body text-xs text-on-surface-variant block">${escapeHtml(p.location)}</span>
      </td>
      <td class="py-3 px-4 font-button text-xs text-on-surface-variant">${escapeHtml(p.category)}</td>
      <td class="py-3 px-4 font-display font-bold text-primary">${escapeHtml(p.price)}</td>
      <td class="py-3 px-4">
        <span class="font-button text-[10px] uppercase px-2.5 py-1 rounded-full ${p.status === 'For Sale' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}">
          ${escapeHtml(p.status)}
        </span>
      </td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <button onclick="window.deletePropertyItem('${p.id}')" title="Delete Property" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// B. CATEGORIES CRUD
async function fetchCategories() {
  try {
    if (db) {
      const snap = await getDocs(collection(db, "categories"));
      if (snap.docs.length > 0) {
        state.categories = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (e) {
    console.warn("Firestore fetch categories notice:", e);
  }

  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  if (!state.categories || state.categories.length === 0) {
    state.categories = (liveData.categories && liveData.categories.length > 0) ? liveData.categories : [
      { id: "c1", name: "Luxury Apartments", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
      { id: "c2", name: "Oceanfront Villas", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
      { id: "c3", name: "Gated Villa Plots", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
      { id: "c4", name: "Commercial Spaces", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" }
    ];
  }
  renderCategories();
}

function renderCategories() {
  const container = document.getElementById('categories-list');
  if (!container) return;

  container.innerHTML = state.categories.map(c => `
    <div class="glass-card rounded-xl overflow-hidden group">
      <div class="aspect-video overflow-hidden">
        <img src="${escapeHtml(c.image)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      </div>
      <div class="p-4 flex items-center justify-between">
        <h3 class="font-display font-bold text-white text-base">${escapeHtml(c.name)}</h3>
        <button onclick="window.deleteCategoryItem('${c.id}')" title="Delete" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    </div>
  `).join('');
}

// GALLERY CRUD
function fetchGallery() {
  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  state.gallery = (liveData.gallery && liveData.gallery.length > 0) ? liveData.gallery : (window.BASE_TRIANGLE_DATA ? window.BASE_TRIANGLE_DATA.gallery : []);
  renderGallery();
}

function renderGallery() {
  const container = document.getElementById('gallery-list');
  if (!container) return;

  container.innerHTML = (state.gallery || []).map(g => `
    <div class="glass-card rounded-xl overflow-hidden group">
      <div class="aspect-video overflow-hidden">
        <img src="${escapeHtml(g.image)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      </div>
      <div class="p-4 flex items-center justify-between">
        <div>
          <h3 class="font-display font-bold text-white text-sm line-clamp-1">${escapeHtml(g.title)}</h3>
          <span class="font-button text-[10px] text-amber-400 uppercase">${escapeHtml(g.category)}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="window.editGalleryItem('${g.id}')" title="Edit Photo" class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
            <span class="material-symbols-outlined text-base">edit</span>
          </button>
          <button onclick="window.deleteGalleryItem('${g.id}')" title="Delete Photo" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.editGalleryItem = function(id) {
  const item = (state.gallery || []).find(g => g.id === id);
  if (!item) return;
  document.getElementById('gal-doc-id').value = item.id;
  document.getElementById('gal-title').value = item.title || '';
  document.getElementById('gal-category').value = item.category || 'Completed';
  document.getElementById('gal-image-url').value = item.image || '';

  const titleEl = document.getElementById('gal-modal-title');
  if (titleEl) titleEl.textContent = 'Edit Gallery Photo';
  document.getElementById('gallery-modal')?.classList.remove('hidden');
};

window.deleteGalleryItem = async function(id) {
  if (!confirm("Delete photo from gallery?")) return;
  state.gallery = state.gallery.filter(g => g.id !== id);
  try {
    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.gallery = state.gallery;
    try { localStorage.setItem('triangle_custom_data', JSON.stringify(liveData)); } catch(le) {}
    window.dispatchEvent(new CustomEvent('triangle_data_updated', { detail: liveData }));
    if (db) {
      await deleteDoc(doc(db, 'gallery', id));
      await setDoc(doc(db, 'app_data', 'triangle_custom_data'), liveData, { merge: true });
    }
    showToast("Gallery photo deleted. Live site updated.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
  renderGallery();
};


// ENQUIRIES CRUD
async function fetchEnquiries() {
  try {
    if (db) {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      if (snap.docs.length > 0) {
        state.enquiries = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    }
  } catch (e) {
    console.warn("Firestore fetch enquiries notice:", e);
  }

  const liveLeadsStr = localStorage.getItem('triangle_crm_leads');
  const localLeads = liveLeadsStr ? JSON.parse(liveLeadsStr) : [];

  if (state.enquiries.length === 0) {
    state.enquiries = localLeads.length > 0 ? localLeads : [
      { id: "e1", name: "Suryamech", phone: "9840123456", email: "surya@example.com", propertyType: "Apartment Purchase", status: "Pending", message: "Looking for 3 BHK near Vadapalani Metro" },
      { id: "e2", name: "Dillibabu Ramu", phone: "9444156789", email: "dilli@example.com", propertyType: "Villa Purchase", status: "Contacted", message: "Interested in ECR villa site visit" }
    ];
  }
  renderEnquiries();
}

function renderEnquiries() {
  const container = document.getElementById('enquiries-list');
  if (!container) return;

  container.innerHTML = state.enquiries.map(e => `
    <tr class="border-b border-slate-800 hover:bg-surface-container-high/50 transition-colors">
      <td class="py-3 px-4 font-display font-bold text-white text-base">${escapeHtml(e.name)}</td>
      <td class="py-3 px-4">
        <a href="tel:${escapeHtml(e.phone)}" class="font-body text-xs font-bold text-primary block">${escapeHtml(e.phone)}</a>
        <span class="font-body text-[11px] text-on-surface-variant block">${escapeHtml(e.email)}</span>
      </td>
      <td class="py-3 px-4">
        <span class="font-button text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container border border-slate-700 text-on-surface-variant block w-fit mb-1">${escapeHtml(e.propertyType)}</span>
        <span class="font-body text-xs text-on-surface-variant block truncate max-w-xs">${escapeHtml(e.message)}</span>
      </td>
      <td class="py-3 px-4">
        <select onchange="window.updateEnquiryBadge('${e.id}', this.value)" class="px-3 py-1 rounded-lg bg-surface-container border border-slate-700 text-xs font-button font-bold text-white focus:outline-none focus:border-primary">
          <option value="Pending" ${e.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Contacted" ${e.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Completed" ${e.status === 'Completed' ? 'selected' : ''}>Completed</option>
          <option value="Cancelled" ${e.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <a href="https://wa.me/91${escapeHtml(e.phone.replace(/[^0-9]/g, ''))}" target="_blank" class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">chat</span>
          </a>
          <button onclick="window.deleteEnquiryItem('${e.id}')" title="Delete" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderStats() {
  const kProp = document.getElementById('kpi-properties');
  const kCat = document.getElementById('kpi-categories');
  const kEnq = document.getElementById('kpi-enquiries');
  const kPen = document.getElementById('kpi-pending');

  if (kProp) kProp.textContent = state.properties.length;
  if (kCat) kCat.textContent = state.categories.length;
  if (kEnq) kEnq.textContent = state.enquiries.length;
  if (kPen) kPen.textContent = state.enquiries.filter(e => e.status === 'Pending').length;
}

// 9. MODAL HANDLERS & UPLOADS
document.getElementById('add-property-btn')?.addEventListener('click', () => {
  document.getElementById('property-form')?.reset();
  const docId = document.getElementById('prop-doc-id');
  if (docId) docId.value = '';
  document.getElementById('prop-img-preview-box')?.classList.add('hidden');
  document.getElementById('property-modal')?.classList.remove('hidden');
});

document.getElementById('add-category-btn')?.addEventListener('click', () => {
  document.getElementById('category-form')?.reset();
  const docId = document.getElementById('cat-doc-id');
  if (docId) docId.value = '';
  document.getElementById('category-modal')?.classList.remove('hidden');
});

document.getElementById('add-gallery-btn')?.addEventListener('click', () => {
  document.getElementById('gallery-form')?.reset();
  const docId = document.getElementById('gal-doc-id');
  if (docId) docId.value = '';
  const titleEl = document.getElementById('gal-modal-title');
  if (titleEl) titleEl.textContent = 'Add Gallery Photo';
  document.getElementById('gallery-modal')?.classList.remove('hidden');
});


document.getElementById('prop-cloudinary-file')?.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = await uploadToCloudinary(file);
  if (url) {
    document.getElementById('prop-image-url').value = url;
    const prev = document.getElementById('prop-img-preview');
    if (prev) prev.src = url;
    document.getElementById('prop-img-preview-box')?.classList.remove('hidden');
  }
});

document.getElementById('cat-cloudinary-file')?.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = await uploadToCloudinary(file);
  if (url) {
    document.getElementById('cat-image-url').value = url;
  }
});

document.getElementById('gal-cloudinary-file')?.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = await uploadToCloudinary(file);
  if (url) {
    document.getElementById('gal-image-url').value = url;
    showToast("Photo uploaded successfully!", "success");
  }
});

// SUBMIT HANDLERS
document.getElementById('property-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const propData = {
    title: document.getElementById('prop-title').value,
    category: document.getElementById('prop-category').value,
    price: document.getElementById('prop-price').value,
    emiOption: document.getElementById('prop-emi')?.value || "EMI Options Available",
    status: "For Sale",
    location: document.getElementById('prop-location').value,
    areaSqft: parseInt(document.getElementById('prop-sqft')?.value || 1200),
    plotDimensions: document.getElementById('prop-dimensions')?.value || "30ft × 40ft",
    image: document.getElementById('prop-image-url').value,
    description: document.getElementById('prop-desc').value,
    createdAt: new Date().toISOString()
  };

  try {
    if (db) {
      const docRef = await addDoc(collection(db, "properties"), { ...propData, createdAt: serverTimestamp() });
      propData.id = docRef.id;
    } else {
      propData.id = "p-" + Date.now();
    }
    state.properties.unshift(propData);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.properties = state.properties;
    
    if (window.saveLiveTriangleData) {
      const saveResult = await window.saveLiveTriangleData(liveData);
      if (saveResult && saveResult.success) {
        showToast("Property saved successfully! Live site updated.", "success");
      } else {
        showToast(`Save Error: ${saveResult?.error || 'Failed to persist property'}`, "error");
      }
    }

    renderProperties();
    renderStats();
    document.getElementById('property-modal')?.classList.add('hidden');
  } catch (err) {
    showToast(`Save error: ${err.message}`, "error");
  }
});

document.getElementById('category-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const catData = {
    name: document.getElementById('cat-name').value,
    image: document.getElementById('cat-image-url').value
  };

  try {
    if (db) {
      const docRef = await addDoc(collection(db, "categories"), catData);
      catData.id = docRef.id;
    } else {
      catData.id = "c-" + Date.now();
    }
    state.categories.unshift(catData);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.categories = state.categories;
    
    if (window.saveLiveTriangleData) {
      const saveResult = await window.saveLiveTriangleData(liveData);
      if (saveResult && saveResult.success) {
        showToast("Category saved! Live site updated.", "success");
      } else {
        showToast(`Save Error: ${saveResult?.error || 'Failed to persist category'}`, "error");
      }
    }

    renderCategories();
    renderStats();
    document.getElementById('category-modal')?.classList.add('hidden');
  } catch (err) {
    showToast(`Save error: ${err.message}`, "error");
  }
});

document.getElementById('gallery-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const docId = document.getElementById('gal-doc-id')?.value;
  const photoData = {
    id: docId || ("gal-" + Date.now()),
    title: document.getElementById('gal-title').value,
    category: document.getElementById('gal-category').value,
    image: document.getElementById('gal-image-url').value
  };

  state.gallery = state.gallery || [];
  if (docId) {
    const idx = state.gallery.findIndex(g => g.id === docId);
    if (idx !== -1) {
      state.gallery[idx] = photoData;
    } else {
      state.gallery.unshift(photoData);
    }
  } else {
    state.gallery.unshift(photoData);
  }

  try {
    // 1. Write to LocalStorage (offline cache)
    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.gallery = state.gallery;
    try { localStorage.setItem('triangle_custom_data', JSON.stringify(liveData)); } catch(le) {}
    window.dispatchEvent(new CustomEvent('triangle_data_updated', { detail: liveData }));

    // 2. Write to Firestore using admin's LOCAL db
    if (db) {
      await setDoc(doc(db, 'gallery', photoData.id), { title: photoData.title, category: photoData.category, image: photoData.image }, { merge: true });
      await setDoc(doc(db, 'app_data', 'triangle_custom_data'), liveData, { merge: true });
    }
    showToast("Gallery photo saved! Live site updated.", "success");
  } catch (err) {
    showToast(`Save Error: ${err.message}`, "error");
  }

  renderGallery();
  document.getElementById('gallery-modal')?.classList.add('hidden');
});


// GLOBAL ACTIONS
window.deletePropertyItem = async function(id) {
  if (!confirm("Delete this property?")) return;
  try {
    if (db && !id.startsWith('p')) await deleteDoc(doc(db, "properties", id));
    state.properties = state.properties.filter(p => p.id !== id);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.properties = state.properties;
    if (window.saveLiveTriangleData) window.saveLiveTriangleData(liveData);

    renderProperties();
    renderStats();
    showToast("Property deleted. Live site updated.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

window.deleteCategoryItem = async function(id) {
  if (!confirm("Delete this category?")) return;
  try {
    if (db && !id.startsWith('c')) await deleteDoc(doc(db, "categories", id));
    state.categories = state.categories.filter(c => c.id !== id);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.categories = state.categories;
    if (window.saveLiveTriangleData) window.saveLiveTriangleData(liveData);

    renderCategories();
    renderStats();
    showToast("Category deleted. Live site updated.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

window.deleteEnquiryItem = async function(id) {
  if (!confirm("Delete this lead?")) return;
  try {
    if (db && !id.startsWith('e')) await deleteDoc(doc(db, "inquiries", id));
    state.enquiries = state.enquiries.filter(e => e.id !== id);
    localStorage.setItem('triangle_crm_leads', JSON.stringify(state.enquiries));
    renderEnquiries();
    renderStats();
    showToast("Lead record deleted.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

window.updateEnquiryBadge = async function(id, newStatus) {
  try {
    if (db && !id.startsWith('e')) {
      await updateDoc(doc(db, "inquiries", id), { status: newStatus });
    }
    const lead = state.enquiries.find(e => e.id === id);
    if (lead) lead.status = newStatus;
    localStorage.setItem('triangle_crm_leads', JSON.stringify(state.enquiries));
    renderEnquiries();
    renderStats();
    showToast(`Lead status updated to ${newStatus}`, "success");
  } catch (e) {
    showToast(`Status update error: ${e.message}`, "error");
  }
};
