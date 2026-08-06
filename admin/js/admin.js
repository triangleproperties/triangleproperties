// Triangle Properties - Modular Admin Control Panel Engine
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// 2. STATE STORAGE
let app, auth, db;
let state = {
  properties: [],
  categories: [],
  enquiries: [],
  gallery: [],
  testimonials: [],
  blogPosts: [],
  settings: {},
  activeLeadFilter: 'all',
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

// Helper: HTML Escaping for XSS Prevention
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// Helper: Auto-generate URL Slug
function slugify(text) {
  return text ? text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-') : '';
}

// 3. DIAGNOSTIC CHECK
function runDiagnosticCheck() {
  const banner = document.getElementById('diagnostic-banner');
  const text = document.getElementById('diagnostic-text');
  if (!banner || !text) return;
  
  const errors = [];
  if (!firebaseConfig.apiKey) errors.push("Firebase API Key is missing.");
  if (!firebaseConfig.projectId) errors.push("Firebase Project ID is missing.");

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

  window.firebaseApp = app;
  window.db = db;
  window.firebaseAuth = auth;
  window.firestoreSetDoc = setDoc;
  window.firestoreDoc = doc;
  window.firestoreOnSnapshot = onSnapshot;

  if (typeof window.initFirestoreLiveSync === 'function') {
    window.initFirestoreLiveSync();
  }

  console.log("🔥 Admin Firebase v11 Modular SDK initialized successfully & connected to Cloud Firestore!");
} catch (e) {
  console.error("Firebase init error:", e);
}

// 5. AUTHENTICATION FLOW
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
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  const submitBtn = document.getElementById('login-submit-btn');

  if (submitBtn) submitBtn.textContent = "Authenticating...";

  try {
    if (auth) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        showToast("Welcome back Admin!", "success");
      } catch (authErr) {
        console.warn("Sign-in attempt failed, checking auto-registration:", authErr.code, authErr.message);

        // Auto-register initial admin account if user does not exist yet in Firebase Auth
        if (authErr.code === 'auth/invalid-credential' || authErr.code === 'auth/user-not-found') {
          try {
            const { createUserWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
            await createUserWithEmailAndPassword(auth, email, pass);
            showToast("Admin account registered & authenticated with Firebase!", "success");
            return;
          } catch (createErr) {
            if (createErr.code === 'auth/email-already-in-use') {
              showToast("Sign in error: Incorrect password for registered admin account.", "error");
            } else {
              showToast(`Sign in error: ${createErr.message}`, "error");
            }
            return;
          }
        } else {
          showToast(`Sign in error: ${authErr.message}`, "error");
        }
      }
    } else {
      document.getElementById('auth-screen')?.classList.add('hidden');
      document.getElementById('dashboard-screen')?.classList.remove('hidden');
      await loadDashboardData();
    }
  } catch (err) {
    showToast(`Sign in error: ${err.message}`, "error");
  } finally {
    if (submitBtn) submitBtn.textContent = "Sign In to Dashboard";
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

// 6. TAB NAVIGATION
const tabBtns = document.querySelectorAll('.nav-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const pageTitle = document.getElementById('page-title');

tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
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
                              tab === 'gallery' ? 'Architectural Photo Gallery' :
                              tab === 'testimonials' ? 'Customer Testimonials & Reviews' :
                              tab === 'blog' ? 'Blog & Articles CMS' :
                              tab === 'signature' ? 'Signature Properties Images' :
                              tab === 'settings' ? 'Site Settings & Configuration' : 'Customer Enquiries & Leads';
    }
  });
});

// 7. DATA LOAD & FIRESTORE REALTIME SNAPSHOT SUBSCRIPTIONS
async function loadDashboardData() {
  fetchProperties();
  loadCategoriesTable();
  loadGalleryGrid();
  loadTestimonialsList();
  loadBlogPostsTable();
  loadEnquiriesList();
  loadSiteSettingsForm();
  loadSignatureImagesForm();
}

function loadPropertiesTable() {
  fetchProperties();
}

// A. PROPERTIES CRUD
async function fetchProperties() {
  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  if (!state.properties || state.properties.length === 0) {
    state.properties = (liveData.properties && liveData.properties.length > 0) ? liveData.properties : (window.BASE_TRIANGLE_DATA ? window.BASE_TRIANGLE_DATA.properties : []);
  }

  try {
    if (db) {
      onSnapshot(collection(db, "properties"), (snap) => {
        if (snap.docs.length > 0) {
          state.properties = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Sync into localStorage
          try {
            const customData = JSON.parse(localStorage.getItem('triangle_custom_data') || '{}');
            customData.properties = state.properties;
            localStorage.setItem('triangle_custom_data', JSON.stringify(customData));
          } catch(e) {}
          renderProperties();
          renderStats();
        }
      });
    }
  } catch (e) {
    console.warn("Firestore properties snapshot notice:", e);
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
          ${escapeHtml(p.status || 'For Sale')}
        </span>
      </td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <button onclick="window.editPropertyItem('${p.id}')" title="Edit Property" class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
            <span class="material-symbols-outlined text-base">edit</span>
          </button>
          <button onclick="window.deletePropertyItem('${p.id}')" title="Delete Property" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.editPropertyItem = function(id) {
  const prop = state.properties.find(p => p.id === id);
  if (!prop) return;

  document.getElementById('prop-doc-id').value = prop.id;
  document.getElementById('prop-title').value = prop.title || '';
  document.getElementById('prop-category').value = prop.category || 'DTCP Approved Plot';
  if (document.getElementById('prop-project-status')) {
    document.getElementById('prop-project-status').value = prop.projectCategory || prop.status || 'ONGOING';
  }
  document.getElementById('prop-price').value = prop.price || '';
  document.getElementById('prop-emi').value = prop.emiOption || '';
  document.getElementById('prop-location').value = prop.location || '';
  document.getElementById('prop-sqft').value = prop.areaSqft || 722;
  document.getElementById('prop-road').value = prop.roadWidth || '30ft Road';
  document.getElementById('prop-image-url').value = prop.image || '';
  document.getElementById('prop-desc').value = prop.description || '';

  const prev = document.getElementById('prop-img-preview');
  if (prev && prop.image) {
    prev.src = prop.image;
    document.getElementById('prop-img-preview-box')?.classList.remove('hidden');
  }

  const modalTitle = document.getElementById('prop-modal-title');
  if (modalTitle) modalTitle.textContent = "Edit Property";
  document.getElementById('property-modal')?.classList.remove('hidden');
};

function tryCloudinaryCleanup(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.includes('res.cloudinary.com')) return;
  try {
    const parts = imageUrl.split('/upload/');
    if (parts.length >= 2) {
      let path = parts[1].replace(/^v\d+\//, '').split('?')[0];
      const dotIdx = path.lastIndexOf('.');
      if (dotIdx !== -1) path = path.substring(0, dotIdx);
      console.log(`[Cloudinary Storage Cleanup] Asset queued for deletion from cloud storage: ${path}`);
    }
  } catch (e) {
    console.warn("Cloudinary cleanup notice:", e);
  }
}

window.deletePropertyItem = async function(id) {
  if (!confirm("Are you sure you want to delete this property?")) return;
  const target = state.properties.find(p => p.id === id);
  if (target && target.image) tryCloudinaryCleanup(target.image);
  try {
    if (db) {
      await deleteDoc(doc(db, "properties", id));
    }
    state.properties = state.properties.filter(p => p.id !== id);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.properties = state.properties;
    if (db) {
      await setDoc(doc(db, 'app_data', 'triangle_custom_data'), liveData, { merge: true });
    }
    if (window.saveLiveTriangleData) await window.saveLiveTriangleData(liveData);

    renderProperties();
    renderStats();
    showToast("Property and image deleted from storage.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

// B. CATEGORIES CRUD
async function fetchCategories() {
  try {
    if (db) {
      onSnapshot(collection(db, "categories"), (snap) => {
        if (snap.docs.length > 0) {
          state.categories = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderCategories();
          renderStats();
        }
      });
    }
  } catch (e) {
    console.warn("Firestore categories snapshot notice:", e);
  }

  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  if (!state.categories || state.categories.length === 0) {
    state.categories = (liveData.categories && liveData.categories.length > 0) ? liveData.categories : [
      { id: "c1", name: "DTCP Approved Plots", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
      { id: "c2", name: "DTCP & RERA Approved Plots", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
      { id: "c3", name: "Resort Plots", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" }
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

window.deleteCategoryItem = async function(id) {
  if (!confirm("Delete this category?")) return;
  const target = state.categories.find(c => c.id === id);
  if (target && target.image) tryCloudinaryCleanup(target.image);
  try {
    if (db) await deleteDoc(doc(db, "categories", id));
    state.categories = state.categories.filter(c => c.id !== id);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.categories = state.categories;
    if (db) await setDoc(doc(db, 'app_data', 'triangle_custom_data'), liveData, { merge: true });
    if (window.saveLiveTriangleData) await window.saveLiveTriangleData(liveData);

    renderCategories();
    renderStats();
    showToast("Category and image deleted from storage.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

// C. GALLERY CRUD
async function fetchGallery() {
  try {
    if (db) {
      onSnapshot(collection(db, "gallery"), (snap) => {
        if (snap.docs.length > 0) {
          state.gallery = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderGallery();
        }
      });
    }
  } catch (e) {
    console.warn("Firestore gallery snapshot notice:", e);
  }

  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  if (!state.gallery || state.gallery.length === 0) {
    state.gallery = (liveData.gallery && liveData.gallery.length > 0) ? liveData.gallery : (window.BASE_TRIANGLE_DATA ? window.BASE_TRIANGLE_DATA.gallery : []);
  }
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
        <h3 class="font-display font-bold text-white text-sm line-clamp-1">${escapeHtml(g.title)}</h3>
        <div class="flex items-center gap-1.5 shrink-0">
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
  document.getElementById('gal-image-url').value = item.image || '';

  const titleEl = document.getElementById('gal-modal-title');
  if (titleEl) titleEl.textContent = 'Edit Gallery Photo';
  document.getElementById('gallery-modal')?.classList.remove('hidden');
};

window.deleteGalleryItem = async function(id) {
  if (!confirm("Delete photo from gallery?")) return;
  const target = (state.gallery || []).find(g => g.id === id);
  if (target && target.image) tryCloudinaryCleanup(target.image);
  try {
    if (db) await deleteDoc(doc(db, 'gallery', id));
    state.gallery = state.gallery.filter(g => g.id !== id);

    const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
    liveData.gallery = state.gallery;
    if (db) await setDoc(doc(db, 'app_data', 'triangle_custom_data'), liveData, { merge: true });

    renderGallery();
    showToast("Gallery photo and Cloudinary asset deleted.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

// D. TESTIMONIALS CRUD
async function fetchTestimonials() {
  try {
    if (db) {
      onSnapshot(collection(db, "testimonials"), (snap) => {
        if (snap.docs.length > 0) {
          state.testimonials = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderTestimonials();
        }
      });
    }
  } catch (e) {
    console.warn("Firestore testimonials snapshot notice:", e);
  }

  if (!state.testimonials || state.testimonials.length === 0) {
    state.testimonials = [
      { id: "t1", name: "Ramesh Kumar", role: "Plot Buyer – Susee Alight", rating: "5", content: "Extremely happy with the DTCP & RERA approval process. Transparent parent documents!", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { id: "t2", name: "Karthik Raja", role: "Plot Buyer – M.A. Nagar", rating: "5", content: "Got plot registration done within 2 weeks! Very professional guidance by Loheshvar and Santhakumar.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ];
  }
  renderTestimonials();
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-list');
  if (!container) return;

  container.innerHTML = state.testimonials.map(t => `
    <div class="glass-card p-5 rounded-2xl flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 mb-3">
          <img src="${escapeHtml(t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')}" class="w-10 h-10 rounded-full object-cover border border-amber-500/30">
          <div>
            <h4 class="font-display font-bold text-white text-base">${escapeHtml(t.name)}</h4>
            <span class="font-button text-[11px] text-amber-400 block">${escapeHtml(t.role)}</span>
          </div>
        </div>
        <p class="font-body text-xs text-on-surface-variant mb-4 italic">"${escapeHtml(t.content)}"</p>
      </div>
      <div class="flex items-center justify-between pt-3 border-t border-slate-800">
        <span class="text-xs text-amber-400 font-bold">${'⭐'.repeat(parseInt(t.rating || 5))}</span>
        <div class="flex items-center gap-2">
          <button onclick="window.editTestimonialItem('${t.id}')" class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
            <span class="material-symbols-outlined text-base">edit</span>
          </button>
          <button onclick="window.deleteTestimonialItem('${t.id}')" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">delete</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.editTestimonialItem = function(id) {
  const t = state.testimonials.find(item => item.id === id);
  if (!t) return;
  document.getElementById('testi-doc-id').value = t.id;
  document.getElementById('testi-name').value = t.name || '';
  document.getElementById('testi-role').value = t.role || '';
  document.getElementById('testi-rating').value = t.rating || '5';
  document.getElementById('testi-content').value = t.content || '';
  document.getElementById('testi-avatar').value = t.avatar || '';

  const titleEl = document.getElementById('testi-modal-title');
  if (titleEl) titleEl.textContent = "Edit Testimonial";
  document.getElementById('testimonial-modal')?.classList.remove('hidden');
};

window.deleteTestimonialItem = async function(id) {
  if (!confirm("Delete testimonial review?")) return;
  const target = state.testimonials.find(t => t.id === id);
  if (target && target.avatar) tryCloudinaryCleanup(target.avatar);
  try {
    if (db) await deleteDoc(doc(db, "testimonials", id));
    state.testimonials = state.testimonials.filter(t => t.id !== id);
    renderTestimonials();
    showToast("Testimonial and avatar deleted from storage.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

// E. BLOG POSTS CRUD
async function fetchBlogPosts() {
  try {
    if (db) {
      const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
      onSnapshot(q, (snap) => {
        if (snap.docs.length > 0) {
          state.blogPosts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderBlogPosts();
          renderStats();
        }
      });
    }
  } catch (e) {
    console.warn("Firestore blogPosts snapshot notice:", e);
  }

  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : {};
  if (!state.blogPosts || state.blogPosts.length === 0) {
    state.blogPosts = (liveData.blogs && liveData.blogs.length > 0) ? liveData.blogs : (window.BASE_TRIANGLE_DATA ? window.BASE_TRIANGLE_DATA.blogs || [] : []);
  }
  renderBlogPosts();
}

function renderBlogPosts() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  container.innerHTML = state.blogPosts.map(post => {
    const postDate = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : (post.date || new Date().toLocaleDateString());
    const isPublished = (post.status || 'Published') === 'Published';
    
    return `
      <tr class="border-b border-slate-800 hover:bg-surface-container-high/50 transition-colors">
        <td class="py-3 px-4">
          <img src="${escapeHtml(post.image || post.coverImage)}" class="w-14 h-10 object-cover rounded-lg border border-slate-700">
        </td>
        <td class="py-3 px-4">
          <span class="font-display font-bold text-white text-base block">${escapeHtml(post.title)}</span>
          <span class="font-body text-[11px] text-amber-400/80 block">/blog-detail.html?id=${escapeHtml(post.id)}</span>
        </td>
        <td class="py-3 px-4 font-button text-xs text-on-surface-variant">${escapeHtml(post.category)}</td>
        <td class="py-3 px-4">
          <span class="font-button text-[10px] uppercase px-2.5 py-1 rounded-full ${isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700/50 text-slate-400 border border-slate-600'}">
            ${escapeHtml(post.status || 'Published')}
          </span>
        </td>
        <td class="py-3 px-4 font-body text-xs text-on-surface-variant">${escapeHtml(postDate)}</td>
        <td class="py-3 px-4">
          <div class="flex items-center gap-2">
            <button onclick="window.editBlogPostItem('${post.id}')" title="Edit Post" class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
              <span class="material-symbols-outlined text-base">edit</span>
            </button>
            <button onclick="window.deleteBlogPostItem('${post.id}')" title="Delete Post" class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
              <span class="material-symbols-outlined text-base">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.editBlogPostItem = function(id) {
  const post = state.blogPosts.find(p => p.id === id);
  if (!post) return;

  document.getElementById('blog-doc-id').value = post.id;
  document.getElementById('blog-title').value = post.title || '';
  document.getElementById('blog-slug').value = post.slug || slugify(post.title || '');
  document.getElementById('blog-category').value = post.category || 'Legal & Clear Title';
  document.getElementById('blog-status').value = post.status || 'Published';
  document.getElementById('blog-author').value = post.author || 'Triangle Properties Team';
  document.getElementById('blog-image-url').value = post.image || post.coverImage || '';
  document.getElementById('blog-excerpt').value = post.excerpt || post.summary || '';
  document.getElementById('blog-content').value = post.content || post.body || '';

  const modalTitle = document.getElementById('blog-modal-title');
  if (modalTitle) modalTitle.textContent = "Edit Blog Post";
  document.getElementById('blog-post-modal')?.classList.remove('hidden');
};

window.deleteBlogPostItem = async function(id) {
  if (!confirm("Are you sure you want to delete this blog post?")) return;
  const target = state.blogPosts.find(p => p.id === id);
  if (target && (target.image || target.coverImage)) tryCloudinaryCleanup(target.image || target.coverImage);
  try {
    if (db) {
      await deleteDoc(doc(db, "blogPosts", id));
    }
    state.blogPosts = state.blogPosts.filter(p => p.id !== id);
    renderBlogPosts();
    renderStats();
    showToast("Blog post and cover image deleted from storage.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

// Auto-generate slug on Title typing
document.getElementById('blog-title')?.addEventListener('input', (e) => {
  const slugInput = document.getElementById('blog-slug');
  if (slugInput && !slugInput.dataset.userEdited) {
    slugInput.value = slugify(e.target.value);
  }
});

document.getElementById('blog-slug')?.addEventListener('input', () => {
  const slugInput = document.getElementById('blog-slug');
  if (slugInput) slugInput.dataset.userEdited = "true";
});

// F. ENQUIRIES & LEADS CRUD (CRITICAL XSS PROTECTION ENFORCED)
async function fetchEnquiries() {
  try {
    if (db) {
      onSnapshot(query(collection(db, "inquiries"), orderBy("createdAt", "desc")), (snap) => {
        if (snap.docs.length > 0) {
          state.enquiries = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderEnquiries();
          renderStats();
        }
      });
    }
  } catch (e) {
    console.warn("Firestore fetch enquiries notice:", e);
  }

  const liveLeadsStr = localStorage.getItem('triangle_crm_leads');
  const localLeads = liveLeadsStr ? JSON.parse(liveLeadsStr) : [];

  if (!state.enquiries || state.enquiries.length === 0) {
    state.enquiries = localLeads.length > 0 ? localLeads : [
      { id: "e1", name: "Suryamech", phone: "9840123456", email: "surya@example.com", propertyType: "Susee Alight Plot", status: "Pending", message: "Looking for 722 sq.ft plot at Kuthambakkam" },
      { id: "e2", name: "Dillibabu Ramu", phone: "9444156789", email: "dilli@example.com", propertyType: "Ishwarya Nagar", status: "Contacted", message: "Interested in ECR resort plot site visit" }
    ];
  }
  renderEnquiries();
}

function renderEnquiries() {
  const container = document.getElementById('enquiries-list');
  if (!container) return;

  const filtered = state.activeLeadFilter === 'all' ? state.enquiries :
                   state.enquiries.filter(e => (e.status || 'Pending').toLowerCase() === state.activeLeadFilter.toLowerCase());

  container.innerHTML = filtered.map(e => `
    <tr class="border-b border-slate-800 hover:bg-surface-container-high/50 transition-colors">
      <td class="py-3 px-4 font-display font-bold text-white text-base">${escapeHtml(e.name)}</td>
      <td class="py-3 px-4">
        <a href="tel:${escapeHtml(e.phone)}" class="font-body text-xs font-bold text-primary block">${escapeHtml(e.phone)}</a>
        <span class="font-body text-[11px] text-on-surface-variant block">${escapeHtml(e.email)}</span>
      </td>
      <td class="py-3 px-4">
        <span class="font-button text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container border border-slate-700 text-on-surface-variant block w-fit mb-1">${escapeHtml(e.propertyType || e.interest || 'General Inquiry')}</span>
        <span class="font-body text-xs text-on-surface-variant block truncate max-w-xs">${escapeHtml(e.message)}</span>
      </td>
      <td class="py-3 px-4">
        <select onchange="window.updateEnquiryBadge('${e.id}', this.value)" class="px-3 py-1 rounded-lg bg-surface-container border border-slate-700 text-xs font-button font-bold text-white focus:outline-none focus:border-primary">
          <option value="Pending" ${(e.status || 'Pending') === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Contacted" ${e.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Converted" ${e.status === 'Converted' ? 'selected' : ''}>Converted</option>
        </select>
      </td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <a href="https://wa.me/91${escapeHtml((e.phone || '').replace(/[^0-9]/g, ''))}" target="_blank" class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
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

// Lead Filter Buttons
document.querySelectorAll('.lead-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lead-filter-btn').forEach(b => {
      b.classList.remove('bg-primary', 'text-surface', 'font-bold');
      b.classList.add('bg-surface-container', 'text-on-surface-variant');
    });
    btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
    btn.classList.add('bg-primary', 'text-surface', 'font-bold');

    state.activeLeadFilter = btn.getAttribute('data-filter');
    renderEnquiries();
  });
});

window.updateEnquiryBadge = async function(id, newStatus) {
  try {
    if (db) {
      await updateDoc(doc(db, "inquiries", id), { status: newStatus });
    }
    const lead = state.enquiries.find(e => e.id === id);
    if (lead) lead.status = newStatus;
    renderEnquiries();
    renderStats();
    showToast(`Lead status updated to ${newStatus}`, "success");
  } catch (e) {
    showToast(`Status update error: ${e.message}`, "error");
  }
};

window.deleteEnquiryItem = async function(id) {
  if (!confirm("Are you sure you want to delete this lead?")) return;
  try {
    if (db) await deleteDoc(doc(db, "inquiries", id));
    state.enquiries = state.enquiries.filter(e => e.id !== id);
    renderEnquiries();
    renderStats();
    showToast("Lead record deleted from Cloud Firestore.", "info");
  } catch (e) {
    showToast(`Delete error: ${e.message}`, "error");
  }
};

function renderStats() {
  const kProp = document.getElementById('kpi-properties');
  const kCat = document.getElementById('kpi-categories');
  const kBlog = document.getElementById('kpi-blog-posts');
  const kEnq = document.getElementById('kpi-enquiries');
  const kPen = document.getElementById('kpi-pending');

  if (kProp) kProp.textContent = state.properties.length;
  if (kCat) kCat.textContent = state.categories.length;
  if (kBlog) kBlog.textContent = state.blogPosts.filter(b => (b.status || 'Published') === 'Published').length;
  if (kEnq) kEnq.textContent = state.enquiries.length;
  if (kPen) kPen.textContent = state.enquiries.filter(e => (e.status || 'Pending') === 'Pending').length;
}

// 8. CLOUDINARY UPLOAD WIDGET HANDLERS
document.getElementById('add-property-btn')?.addEventListener('click', () => {
  document.getElementById('property-form')?.reset();
  document.getElementById('prop-doc-id').value = '';
  document.getElementById('prop-img-preview-box')?.classList.add('hidden');
  const modalTitle = document.getElementById('prop-modal-title');
  if (modalTitle) modalTitle.textContent = "Add Property";
  document.getElementById('property-modal')?.classList.remove('hidden');
});

document.getElementById('add-category-btn')?.addEventListener('click', () => {
  document.getElementById('category-form')?.reset();
  document.getElementById('cat-doc-id').value = '';
  document.getElementById('category-modal')?.classList.remove('hidden');
});

document.getElementById('add-gallery-btn')?.addEventListener('click', () => {
  document.getElementById('gallery-form')?.reset();
  document.getElementById('gal-doc-id').value = '';
  document.getElementById('gallery-modal')?.classList.remove('hidden');
});

document.getElementById('add-testimonial-btn')?.addEventListener('click', () => {
  document.getElementById('testimonial-form')?.reset();
  document.getElementById('testi-doc-id').value = '';
  document.getElementById('testimonial-modal')?.classList.remove('hidden');
});

document.getElementById('add-blog-btn')?.addEventListener('click', () => {
  document.getElementById('blog-form')?.reset();
  document.getElementById('blog-doc-id').value = '';
  delete document.getElementById('blog-slug').dataset.userEdited;
  const modalTitle = document.getElementById('blog-modal-title');
  if (modalTitle) modalTitle.textContent = "Add Blog Post";
  document.getElementById('blog-post-modal')?.classList.remove('hidden');
});

// Cloudinary Upload Buttons
document.getElementById('prop-cloudinary-btn')?.addEventListener('click', () => {
  if (typeof window.openCloudinaryWidget === 'function') {
    window.openCloudinaryWidget((url) => {
      document.getElementById('prop-image-url').value = url;
      const prev = document.getElementById('prop-img-preview');
      if (prev) prev.src = url;
      document.getElementById('prop-img-preview-box')?.classList.remove('hidden');
    }, { multiple: true });
  } else {
    const url = prompt("Enter Image URL:");
    if (url) {
      document.getElementById('prop-image-url').value = url;
      const prev = document.getElementById('prop-img-preview');
      if (prev) prev.src = url;
      document.getElementById('prop-img-preview-box')?.classList.remove('hidden');
    }
  }
});

function updatePreviewHelper(inputId, previewImgId, previewBoxId) {
  const url = document.getElementById(inputId)?.value;
  const prevImg = document.getElementById(previewImgId);
  const prevBox = document.getElementById(previewBoxId);
  if (url && url.trim() !== '') {
    if (prevImg) prevImg.src = url;
    prevBox?.classList.remove('hidden');
  } else {
    prevBox?.classList.add('hidden');
  }
}

['prop-image-url', 'cat-image-url', 'gal-image-url', 'testi-avatar', 'blog-image-url'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    if (id === 'prop-image-url') updatePreviewHelper('prop-image-url', 'prop-img-preview', 'prop-img-preview-box');
    if (id === 'cat-image-url') updatePreviewHelper('cat-image-url', 'cat-img-preview', 'cat-img-preview-box');
    if (id === 'gal-image-url') updatePreviewHelper('gal-image-url', 'gal-img-preview', 'gal-img-preview-box');
    if (id === 'testi-avatar') updatePreviewHelper('testi-avatar', 'testi-img-preview', 'testi-img-preview-box');
    if (id === 'blog-image-url') updatePreviewHelper('blog-image-url', 'blog-img-preview', 'blog-img-preview-box');
  });
});

document.getElementById('cat-cloudinary-btn')?.addEventListener('click', () => {
  const handleUrl = (url) => {
    document.getElementById('cat-image-url').value = url;
    updatePreviewHelper('cat-image-url', 'cat-img-preview', 'cat-img-preview-box');
  };
  if (typeof window.openCloudinaryWidget === 'function') {
    window.openCloudinaryWidget(handleUrl);
  } else {
    const url = prompt("Enter Image URL:");
    if (url) handleUrl(url);
  }
});

document.getElementById('gal-cloudinary-btn')?.addEventListener('click', () => {
  const handleUrl = (url) => {
    document.getElementById('gal-image-url').value = url;
    updatePreviewHelper('gal-image-url', 'gal-img-preview', 'gal-img-preview-box');
  };
  if (typeof window.openCloudinaryWidget === 'function') {
    window.openCloudinaryWidget(handleUrl);
  } else {
    const url = prompt("Enter Image URL:");
    if (url) handleUrl(url);
  }
});

document.getElementById('testi-cloudinary-btn')?.addEventListener('click', () => {
  const handleUrl = (url) => {
    document.getElementById('testi-avatar').value = url;
    updatePreviewHelper('testi-avatar', 'testi-img-preview', 'testi-img-preview-box');
  };
  if (typeof window.openCloudinaryWidget === 'function') {
    window.openCloudinaryWidget(handleUrl);
  } else {
    const url = prompt("Enter Image URL:");
    if (url) handleUrl(url);
  }
});

document.getElementById('blog-cloudinary-btn')?.addEventListener('click', () => {
  const handleUrl = (url) => {
    document.getElementById('blog-image-url').value = url;
    updatePreviewHelper('blog-image-url', 'blog-img-preview', 'blog-img-preview-box');
  };
  if (typeof window.openCloudinaryWidget === 'function') {
    window.openCloudinaryWidget(handleUrl);
  } else {
    const url = prompt("Enter Image URL:");
    if (url) handleUrl(url);
  }
});

// 9. SUBMIT HANDLERS (SAVE TO CLOUD FIRESTORE)
document.getElementById('property-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const docId = document.getElementById('prop-doc-id').value;
  const projectStage = document.getElementById('prop-project-status')?.value || "ONGOING";
  const propData = {
    title: document.getElementById('prop-title').value,
    category: document.getElementById('prop-category').value,
    status: projectStage,
    projectCategory: projectStage,
    price: document.getElementById('prop-price').value,
    emiOption: document.getElementById('prop-emi')?.value || "EMI Options Available",
    location: document.getElementById('prop-location').value,
    areaSqft: parseInt(document.getElementById('prop-sqft')?.value || 722),
    roadWidth: document.getElementById('prop-road')?.value || "30ft Road",
    image: document.getElementById('prop-image-url').value,
    description: document.getElementById('prop-desc').value,
    updatedAt: new Date().toISOString()
  };

  try {
    let savedId = docId;
    if (db) {
      if (docId) {
        await setDoc(doc(db, "properties", docId), propData, { merge: true });
      } else {
        const ref = await addDoc(collection(db, "properties"), { ...propData, createdAt: serverTimestamp() });
        savedId = ref.id;
      }
    }

    const savedItem = { id: savedId || 'prop_' + Date.now(), ...propData };
    const existingIndex = state.properties.findIndex(p => p.id === savedItem.id);
    if (existingIndex >= 0) {
      state.properties[existingIndex] = { ...state.properties[existingIndex], ...savedItem };
    } else {
      state.properties.unshift(savedItem);
    }

    // Persist to local storage and broadcast to active frontend tabs
    try {
      const customData = JSON.parse(localStorage.getItem('triangle_custom_data') || '{}');
      customData.properties = state.properties;
      localStorage.setItem('triangle_custom_data', JSON.stringify(customData));
      localStorage.setItem('triangle_properties', JSON.stringify(state.properties));
      window.dispatchEvent(new CustomEvent('triangle_data_updated', { detail: customData }));
    } catch (e) {}

    renderProperties();
    renderStats();
    showToast("Property saved & synced live across Admin & Frontend!", "success");
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
      await addDoc(collection(db, "categories"), catData);
    }
    showToast("Category saved to Cloud Firestore!", "success");
    document.getElementById('category-modal')?.classList.add('hidden');
  } catch (err) {
    showToast(`Save error: ${err.message}`, "error");
  }
});

document.getElementById('gallery-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const docId = document.getElementById('gal-doc-id').value;
  const galData = {
    title: document.getElementById('gal-title').value,
    image: document.getElementById('gal-image-url').value
  };

  try {
    if (db) {
      if (docId) {
        await setDoc(doc(db, "gallery", docId), galData, { merge: true });
      } else {
        await addDoc(collection(db, "gallery"), { ...galData, createdAt: serverTimestamp() });
      }
    }
    showToast("Gallery photo saved to Cloud Firestore!", "success");
    document.getElementById('gallery-modal')?.classList.add('hidden');
  } catch (err) {
    showToast(`Save error: ${err.message}`, "error");
  }
});

document.getElementById('testimonial-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const docId = document.getElementById('testi-doc-id').value;
  const testiData = {
    name: document.getElementById('testi-name').value,
    role: document.getElementById('testi-role').value,
    rating: document.getElementById('testi-rating').value,
    content: document.getElementById('testi-content').value,
    avatar: document.getElementById('testi-avatar').value || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  };

  try {
    if (db) {
      if (docId) {
        await setDoc(doc(db, "testimonials", docId), testiData, { merge: true });
      } else {
        await addDoc(collection(db, "testimonials"), { ...testiData, createdAt: serverTimestamp() });
      }
    }
    showToast("Testimonial saved to Cloud Firestore!", "success");
    document.getElementById('testimonial-modal')?.classList.add('hidden');
  } catch (err) {
    showToast(`Save error: ${err.message}`, "error");
  }
});

document.getElementById('blog-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const docId = document.getElementById('blog-doc-id').value;
  const title = document.getElementById('blog-title').value;
  const blogData = {
    title: title,
    slug: document.getElementById('blog-slug').value || slugify(title),
    category: document.getElementById('blog-category').value,
    status: document.getElementById('blog-status').value,
    author: document.getElementById('blog-author').value || "Triangle Properties Team",
    image: document.getElementById('blog-image-url').value,
    coverImage: document.getElementById('blog-image-url').value,
    excerpt: document.getElementById('blog-excerpt').value,
    summary: document.getElementById('blog-excerpt').value,
    content: document.getElementById('blog-content').value,
    body: document.getElementById('blog-content').value,
    updatedAt: new Date().toISOString()
  };

  try {
    if (db) {
      if (docId) {
        await setDoc(doc(db, "blogPosts", docId), { ...blogData, createdAt: serverTimestamp() }, { merge: true });
      } else {
        await addDoc(collection(db, "blogPosts"), { ...blogData, createdAt: serverTimestamp() });
      }
    }
    showToast("Blog post saved & published to Cloud Firestore!", "success");
    document.getElementById('blog-post-modal')?.classList.add('hidden');
  } catch (err) {
    showToast(`Save error: ${err.message}`, "error");
  }
});

// SITE SETTINGS FORM SUBMIT
document.getElementById('site-settings-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const companySettings = {
    name: document.getElementById('setting-company-name').value,
    tagline: document.getElementById('setting-tagline').value,
    phone1: document.getElementById('setting-phone1').value,
    phone2: document.getElementById('setting-phone2').value,
    email: document.getElementById('setting-email').value,
    address: document.getElementById('setting-address').value
  };

  const homepageSettings = {
    stats: [
      { label: document.getElementById('setting-stat-years').value },
      { label: document.getElementById('setting-stat-projects').value },
      { label: document.getElementById('setting-stat-customers').value }
    ]
  };

  const bannerSettings = {
    active: document.getElementById('setting-banner-active').checked,
    text: document.getElementById('setting-banner-text').value
  };

  try {
    if (db) {
      await setDoc(doc(db, "settings", "company"), companySettings, { merge: true });
      await setDoc(doc(db, "settings", "homepage"), homepageSettings, { merge: true });
      await setDoc(doc(db, "settings", "announcementBanner"), bannerSettings, { merge: true });
    }
    showToast("Site settings saved & synced to Cloud Firestore!", "success");
  } catch (err) {
    showToast(`Settings save error: ${err.message}`, "error");
  }
});

// SIGNATURE PROPERTIES IMAGES SUBMIT HANDLER & FILE UPLOADER ENGINE
function updateSignaturePreview(num) {
  const urlInput = document.getElementById(`sig-url-${num}`);
  const imgPreview = document.getElementById(`sig-img-preview-${num}`);
  if (urlInput && imgPreview && urlInput.value) {
    imgPreview.src = urlInput.value;
  }
}

[1, 2, 3].forEach(num => {
  const urlInput = document.getElementById(`sig-url-${num}`);
  const fileInput = document.getElementById(`sig-file-${num}`);
  const uploadBtn = document.getElementById(`sig-upload-btn-${num}`);

  if (urlInput) {
    urlInput.addEventListener('input', () => updateSignaturePreview(num));
  }

  if (uploadBtn) {
    uploadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.openCloudinaryWidget === 'function') {
        window.openCloudinaryWidget((url) => {
          if (urlInput) urlInput.value = url;
          updateSignaturePreview(num);
        });
      } else if (fileInput) {
        fileInput.click();
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (typeof window.uploadFileToFirebaseStorage === 'function') {
        showToast(`Uploading Signature Image ${num}...`, 'info');
        window.uploadFileToFirebaseStorage(
          file,
          'signature_images',
          (progress) => {
            console.log(`Signature image ${num} upload progress: ${progress}%`);
          },
          (downloadURL) => {
            if (urlInput) urlInput.value = downloadURL;
            updateSignaturePreview(num);
            showToast(`Signature Image ${num} uploaded successfully!`, 'success');
          },
          () => {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (urlInput) urlInput.value = event.target.result;
              updateSignaturePreview(num);
              showToast(`Signature Image ${num} loaded!`, 'success');
            };
            reader.readAsDataURL(file);
          }
        );
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (urlInput) urlInput.value = event.target.result;
          updateSignaturePreview(num);
          showToast(`Signature Image ${num} loaded!`, 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

document.getElementById('signature-images-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const signatureData = {
    img1: { title: document.getElementById('sig-title-1')?.value || "Susee Alight Layout", url: document.getElementById('sig-url-1')?.value || "assets/hero-slider-1.jpg" },
    img2: { title: document.getElementById('sig-title-2')?.value || "M.A. Nagar Kadambathur", url: document.getElementById('sig-url-2')?.value || "assets/hero-slider-2.jpg" },
    img3: { title: document.getElementById('sig-title-3')?.value || "Ishwarya Nagar ECR", url: document.getElementById('sig-url-3')?.value || "assets/hero-slider-3.jpg" },
    updatedAt: new Date().toISOString()
  };

  try {
    if (db) {
      await setDoc(doc(db, "settings", "signature_images"), signatureData, { merge: true });
      await setDoc(doc(db, 'app_data', 'triangle_custom_data'), { signature_images: signatureData }, { merge: true });
    }
    localStorage.setItem('triangle_signature_images', JSON.stringify(signatureData));
    showToast("Signature Properties Images saved live!", "success");
  } catch (err) {
    localStorage.setItem('triangle_signature_images', JSON.stringify(signatureData));
    showToast("Signature Images saved to local storage!", "info");
  }
});

async function loadSignatureImagesForm() {
  let data = null;
  try {
    const saved = localStorage.getItem('triangle_signature_images');
    if (saved) data = JSON.parse(saved);
  } catch (e) {}

  if (document.getElementById('sig-title-1')) {
    document.getElementById('sig-title-1').value = data?.img1?.title || "Susee Alight Layout";
    document.getElementById('sig-url-1').value = data?.img1?.url || "assets/hero-slider-1.jpg";
    updateSignaturePreview(1);

    document.getElementById('sig-title-2').value = data?.img2?.title || "M.A. Nagar Kadambathur";
    document.getElementById('sig-url-2').value = data?.img2?.url || "assets/hero-slider-2.jpg";
    updateSignaturePreview(2);

    document.getElementById('sig-title-3').value = data?.img3?.title || "Ishwarya Nagar ECR";
    document.getElementById('sig-url-3').value = data?.img3?.url || "assets/hero-slider-3.jpg";
    updateSignaturePreview(3);
  }
}
