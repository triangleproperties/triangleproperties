// Triangle Properties - Property Search, Filter, & Detail Modal Handler (Luxury UI Pass)

document.addEventListener('DOMContentLoaded', () => {
  initPropertyGrid();
  initPropertySearch();
  initFirestorePropertiesRealtimeSync();

  window.addEventListener('firebase-ready', () => {
    initFirestorePropertiesRealtimeSync();
    initPropertyGrid();
  });

  // Listen for Cloud Firestore real-time updates across devices & browser storage
  window.addEventListener('triangle_data_updated', () => {
    initPropertyGrid();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'triangle_custom_data' || e.key === 'triangle_properties') {
      initPropertyGrid();
    }
  });
});

let cachedPropertiesList = [];
let firestoreUnsub = null;

async function initFirestorePropertiesRealtimeSync() {
  if (window.db && !firestoreUnsub) {
    try {
      const { collection, onSnapshot } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
      firestoreUnsub = onSnapshot(collection(window.db, "properties"), (snap) => {
        if (snap.docs.length > 0) {
          const liveProps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          cachedPropertiesList = liveProps;

          try {
            const customData = JSON.parse(localStorage.getItem('triangle_custom_data') || '{}');
            customData.properties = liveProps;
            const newStr = JSON.stringify(customData);
            const curStr = localStorage.getItem('triangle_custom_data');
            if (newStr !== curStr) {
              localStorage.setItem('triangle_custom_data', newStr);
              localStorage.setItem('triangle_properties', JSON.stringify(liveProps));
            }
          } catch(e) {}

          const gridContainer = document.getElementById('properties-grid');
          if (gridContainer) {
            renderProperties(liveProps, gridContainer);
          }
        }
      });
    } catch (e) {
      console.warn("Realtime properties subscription notice:", e);
    }
  }
}

async function fetchLiveProperties() {
  if (window.db) {
    try {
      const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
      const snap = await getDocs(collection(window.db, "properties"));
      if (snap.docs.length > 0) {
        cachedPropertiesList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return cachedPropertiesList;
      }
    } catch (e) {
      console.warn("Firestore public properties read notice:", e);
    }
  }

  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : window.TRIANGLE_DATA;
  cachedPropertiesList = liveData?.properties || [];
  return cachedPropertiesList;
}

function getLiveProperties() {
  return cachedPropertiesList.length > 0 ? cachedPropertiesList : ((window.loadLiveTriangleData ? window.loadLiveTriangleData() : window.TRIANGLE_DATA)?.properties || []);
}

/* -------------------------------------------------------------
 * 1. Render Property Grid Cards
 * ------------------------------------------------------------- */
async function initPropertyGrid() {
  const gridContainer = document.getElementById('properties-grid');
  if (!gridContainer) return;

  const props = await fetchLiveProperties();
  renderProperties(props, gridContainer);
}

function renderProperties(propertiesList, container) {
  if (!container) return;

  if (propertiesList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-20 px-6 glass-card rounded-3xl">
        <div class="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-8a2 2 0 012-2h2a2 2 0 012 2v8" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">No Matching Properties Found</h3>
        <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 text-sm">
          We couldn't find properties matching your exact filter criteria. Try adjusting location or price range.
        </p>
        <button onclick="resetPropertyFilters()" class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = propertiesList.map(prop => createPropertyCardHTML(prop)).join('');
}

function createPropertyCardHTML(prop) {
  const badgeClass = prop.status === 'For Sale' ? 'badge-for-sale' : 
                     prop.status === 'Under Construction' ? 'badge-under-construction' : 'badge-for-rent';

  return `
    <div class="glass-card card-hover-lift rounded-3xl overflow-hidden group flex flex-col h-full border border-slate-200 dark:border-slate-800 shadow-md">
      <!-- Thumbnail & Badges -->
      <div class="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img src="${prop.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}" 
             alt="${prop.title}" 
             loading="lazy"
             onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
        
        <div class="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          <span class="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass} shadow-lg backdrop-blur-md">
            ${prop.status}
          </span>
          ${prop.projectCategory ? `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-md">${prop.projectCategory}</span>` : ''}
        </div>

        <div class="absolute top-4 right-4 z-10">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
            ${prop.category}
          </span>
        </div>

        <div class="absolute bottom-4 left-4 z-10">
          <p class="text-2xl font-black text-white drop-shadow-lg font-heading">
            ${prop.price}
          </p>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="p-6 flex flex-col flex-grow">
        <!-- Location -->
        <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
          <svg class="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="truncate font-semibold">${prop.location}</span>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors mb-3 line-clamp-1 font-heading">
          ${prop.title}
        </h3>

        <!-- Specs Grid Bar -->
        <div class="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 mb-4 text-center">
          <div>
            <span class="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Plot Size</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${prop.areaSqft} sq.ft</span>
          </div>
          <div>
            <span class="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Dimensions</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${prop.plotDimensions || prop.specs?.dimensions || 'Standard'}</span>
          </div>
          <div>
            <span class="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">Road Access</span>
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200">${prop.roadWidth || prop.specs?.roadWidth || '30ft Tar'}</span>
          </div>
        </div>

        <div class="mb-4 mt-auto">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 block text-center">
            💳 ${prop.emiOption || 'Easy Monthly EMI Options Available'}
          </span>
        </div>

        <!-- Actions -->
        <div class="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button onclick="openBrochureModal('${prop.id}')" 
                  class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all text-center shadow-md flex items-center justify-center gap-2 border border-emerald-500/40">
            <span class="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>Download Brochure</span>
          </button>
          <div class="flex items-center gap-2">
            <button onclick="openPropertyModal('${prop.id}')" 
                    class="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all text-center shadow-md flex items-center justify-center gap-1.5"
                    title="Read More & View Complete Details">
              <span>View Details</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <a href="https://wa.me/918838957874?text=${encodeURIComponent('Hello Triangle Properties, I want details regarding: ' + prop.title + ' (' + prop.id + ')')}" 
               target="_blank"
               rel="noopener noreferrer"
               title="Inquire on WhatsApp"
               class="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-xl text-xs font-semibold transition-all border border-emerald-500/30 flex items-center justify-center">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.201-1.101z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* -------------------------------------------------------------
 * 2. Search & Filter Logic
 * ------------------------------------------------------------- */
function updateBannerHeading(statusValue) {
  const headingEl = document.getElementById('project-banner-heading');
  const subHeadingEl = document.getElementById('project-banner-subheading');
  const normalized = (statusValue || 'ALL').toUpperCase();

  if (normalized === 'COMPLETED') {
    if (headingEl) headingEl.textContent = "COMPLETED PROJECTS";
    if (subHeadingEl) subHeadingEl.textContent = "Explore our successfully delivered and handed-over DTCP & RERA approved completed projects.";
    document.title = "Completed Projects & Handed Over Layouts | Triangle Properties";
  } else if (normalized === 'ONGOING') {
    if (headingEl) headingEl.textContent = "ONGOING PROJECTS";
    if (subHeadingEl) subHeadingEl.textContent = "From affordable residential plots to premium gated communities, our ongoing projects are designed to deliver exceptional value and long-term appreciation.";
    document.title = "Ongoing Projects & Plot Layout Listings | Triangle Properties";
  } else {
    if (headingEl) headingEl.textContent = "ALL PROJECTS & PLOT LAYOUTS";
    if (subHeadingEl) subHeadingEl.textContent = "Explore our full portfolio of ongoing and completed plotted developments across Chennai, Poonamallee, Tiruvallur, and ECR.";
    document.title = "All Projects & Plot Layouts | Triangle Properties";
  }
}

function initPropertySearch() {
  const searchInput = document.getElementById('search-keyword');
  const typeFilter = document.getElementById('filter-type');
  const statusFilter = document.getElementById('filter-status');
  const maxPriceFilter = document.getElementById('filter-price');
  const gridContainer = document.getElementById('properties-grid');

  if (!gridContainer) return;

  function applyFilters() {
    const keyword = searchInput?.value.toLowerCase().trim() || '';
    const selectedType = typeFilter?.value || 'ALL';
    const selectedStatus = statusFilter?.value || 'ALL';
    const maxPrice = parseFloat(maxPriceFilter?.value || '9999999999');

    updateBannerHeading(selectedStatus);

    const filtered = getLiveProperties().filter(prop => {
      const matchKeyword = !keyword || 
        prop.title.toLowerCase().includes(keyword) || 
        prop.location.toLowerCase().includes(keyword) ||
        prop.description.toLowerCase().includes(keyword);
      
      const matchType = selectedType === 'ALL' || prop.category === selectedType;
      
      const pStatus = (prop.status || '').toUpperCase();
      const pCategory = (prop.projectCategory || '').toUpperCase();
      
      let matchStatus = selectedStatus === 'ALL';
      if (!matchStatus) {
        if (selectedStatus === 'ONGOING') {
          matchStatus = pStatus === 'FOR SALE' || pStatus === 'ONGOING' || pCategory.includes('ONGOING');
        } else if (selectedStatus === 'COMPLETED') {
          matchStatus = pStatus === 'COMPLETED' || pStatus === 'SOLD OUT' || pCategory.includes('COMPLETED');
        } else {
          matchStatus = pStatus === selectedStatus || pCategory.includes(selectedStatus);
        }
      }

      const matchPrice = (prop.priceRaw || 0) <= maxPrice;

      return matchKeyword && matchType && matchStatus && matchPrice;
    });

    renderProperties(filtered, gridContainer);
  }

  searchInput?.addEventListener('input', applyFilters);
  typeFilter?.addEventListener('change', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  maxPriceFilter?.addEventListener('change', applyFilters);

  // Check URL query parameters for pre-selected status (e.g. ?status=COMPLETED)
  const urlParams = new URLSearchParams(window.location.search);
  const statusParam = urlParams.get('status');
  if (statusParam) {
    const uppercaseStatus = statusParam.toUpperCase();
    if (statusFilter) {
      const hasOption = Array.from(statusFilter.options).some(opt => opt.value === uppercaseStatus);
      if (hasOption) {
        statusFilter.value = uppercaseStatus;
      }
    }
    updateBannerHeading(uppercaseStatus);
  }
  
  applyFilters();
}

function resetPropertyFilters() {
  const searchInput = document.getElementById('search-keyword');
  const typeFilter = document.getElementById('filter-type');
  const statusFilter = document.getElementById('filter-status');
  const maxPriceFilter = document.getElementById('filter-price');
  const gridContainer = document.getElementById('properties-grid');

  if (searchInput) searchInput.value = '';
  if (typeFilter) typeFilter.value = 'ALL';
  if (statusFilter) statusFilter.value = 'ALL';
  if (maxPriceFilter) maxPriceFilter.value = '9999999999';

  renderProperties(getLiveProperties(), gridContainer);
}

/* -------------------------------------------------------------
 * 3. Property Detail Modal Popup
 * ------------------------------------------------------------- */
function openPropertyModal(propertyId) {
  const liveProps = getLiveProperties();
  const prop = liveProps.find(p => p.id === propertyId);
  if (!prop) return;

  let modal = document.getElementById('property-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'property-detail-modal';
    document.body.appendChild(modal);
  }

  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto';
  
  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
      <button onclick="closePropertyModal()" 
              class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="relative h-80 bg-slate-900 rounded-t-3xl overflow-hidden">
        <img id="modal-main-img" src="${prop.image}" alt="${prop.title}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
        <div class="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span class="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 mb-2 inline-block">
              ${prop.status} • ${prop.category}
            </span>
            <h2 class="text-2xl md:text-3xl font-black text-white font-heading">${prop.title}</h2>
            <p class="text-amber-400 text-sm font-medium flex items-center gap-1 mt-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              ${prop.address}
            </p>
          </div>
          <p class="text-3xl font-black text-white font-heading bg-blue-600/80 px-5 py-2 rounded-2xl backdrop-blur-md border border-blue-400/30">
            ${prop.price}
          </p>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-8">
        ${prop.gallery && prop.gallery.length > 1 ? `
          <div>
            <h4 class="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Photo Gallery</h4>
            <div class="flex gap-3 overflow-x-auto pb-2">
              ${prop.gallery.map(img => `
                <img src="${img}" onclick="document.getElementById('modal-main-img').src='${img}'" 
                     class="w-24 h-16 object-cover rounded-xl cursor-pointer hover:opacity-80 border-2 border-transparent hover:border-amber-500 transition-all flex-shrink-0" />
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div>
            <span class="text-xs text-slate-400 block font-medium uppercase tracking-wider">Plot Size</span>
            <span class="text-lg font-bold text-slate-900 dark:text-white">${prop.areaSqft} sq.ft</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 block font-medium uppercase tracking-wider">Dimensions</span>
            <span class="text-lg font-bold text-slate-900 dark:text-white">${prop.plotDimensions || prop.specs?.dimensions || '30ft × 40ft'}</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 block font-medium uppercase tracking-wider">EMI Option</span>
            <span class="text-lg font-bold text-amber-400">${prop.emiOption || prop.specs?.emi || 'Easy EMI'}</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 block font-medium uppercase tracking-wider">Approval Authority</span>
            <span class="text-lg font-bold text-emerald-400">${prop.specs?.approval || prop.category || 'CMDA Approved'}</span>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 font-heading flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-500">info</span>
            Property Overview & Complete Details
          </h3>
          <p class="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">${prop.description}</p>
        </div>

        ${prop.amenities && prop.amenities.length > 0 ? `
          <div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4 font-heading">Key Amenities</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              ${prop.amenities.map(item => `
                <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <svg class="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl">
          <h3 class="text-lg font-bold text-white mb-2 font-heading">Book Instant Guided Site Visit</h3>
          <p class="text-xs text-slate-400 mb-4">Inquire about ${prop.title}. Our representative will contact you immediately.</p>
          
          <form class="triangle-inquiry-form grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="hidden" name="propertyType" value="Property Inquiry: ${prop.title} (${prop.id})">
            <div>
              <input type="text" name="name" required placeholder="Your Full Name *" 
                     class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:outline-none focus:border-amber-500">
            </div>
            <div>
              <input type="tel" name="phone" required placeholder="Mobile Number *" 
                     class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:outline-none focus:border-amber-500">
            </div>
            <div class="md:col-span-2">
              <textarea name="message" rows="2" placeholder="Preferred Visit Date / Questions..." 
                        class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:outline-none focus:border-amber-500"></textarea>
            </div>
            <div class="md:col-span-2">
              <button type="submit" class="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg">
                Submit Inquiry & Get Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.classList.add('overflow-hidden');
  if (typeof window.initInquiryForms === 'function') {
    window.initInquiryForms();
  }
}

function closePropertyModal() {
  const modal = document.getElementById('property-detail-modal');
  if (modal) modal.remove();
  document.body.classList.remove('overflow-hidden');
}

window.openPropertyModal = openPropertyModal;
window.closePropertyModal = closePropertyModal;
window.resetPropertyFilters = resetPropertyFilters;

/* -------------------------------------------------------------
 * 4. Download Brochure Lightbox Modal
 * ------------------------------------------------------------- */
function openBrochureModal(propertyId) {
  const allProps = window.getLiveProperties ? window.getLiveProperties() : (allProperties || []);
  const prop = allProps.find(p => p.id === propertyId);
  const title = prop ? prop.title : 'Project Brochure';

  let modal = document.getElementById('brochure-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'brochure-modal';
    document.body.appendChild(modal);
  }

  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto';
  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
      <button onclick="closeBrochureModal()" 
              class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all">
        <span class="material-symbols-outlined text-lg">close</span>
      </button>

      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
          <span class="material-symbols-outlined text-2xl">picture_as_pdf</span>
        </div>
        <span class="font-button text-[11px] uppercase tracking-widest text-amber-500 font-bold block mb-1">Project Brochure</span>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">${title}</h3>
        <p class="font-body text-xs text-slate-600 dark:text-slate-400">Enter your details below to instantly download the PDF brochure.</p>
      </div>

      <form onsubmit="handleBrochureSubmit(event, '${propertyId}', '${encodeURIComponent(title)}')" class="space-y-4">
        <div>
          <label class="block text-xs font-button uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Full Name *</label>
          <input type="text" id="brochure-name" required placeholder="Enter your full name" 
                 class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="block text-xs font-button uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Phone / Mobile Number *</label>
          <input type="tel" id="brochure-phone" required placeholder="Enter 10-digit mobile number" 
                 class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="block text-xs font-button uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Email Address *</label>
          <input type="email" id="brochure-email" required placeholder="name@example.com" 
                 class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-white" />
        </div>

        <button type="submit" id="brochure-submit-btn"
                class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all mt-2">
          <span class="material-symbols-outlined text-lg">download</span>
          <span>Submit & Download Brochure PDF</span>
        </button>
      </form>
      <div id="brochure-success-msg" class="hidden mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center">
        ✓ Thank you! Your brochure download has started.
      </div>
    </div>
  `;
}

function closeBrochureModal() {
  const modal = document.getElementById('brochure-modal');
  if (modal) modal.remove();
}

function handleBrochureSubmit(e, propertyId, encodedTitle) {
  e.preventDefault();
  const name = document.getElementById('brochure-name')?.value || 'Valued Customer';
  const phone = document.getElementById('brochure-phone')?.value || '';
  const email = document.getElementById('brochure-email')?.value || '';
  const title = decodeURIComponent(encodedTitle);

  // Save inquiry lead for Admin Control Panel CRM
  const leadData = {
    name: name,
    phone: phone,
    email: email,
    project: title,
    propertyId: propertyId,
    type: "Brochure Download",
    source: "Brochure Lightbox",
    createdAt: new Date().toISOString()
  };

  if (typeof window.submitInquiry === 'function') {
    window.submitInquiry(leadData);
  } else if (window.LocalInquiryStore && typeof window.LocalInquiryStore.saveInquiry === 'function') {
    window.LocalInquiryStore.saveInquiry(leadData);
  } else {
    const existing = JSON.parse(localStorage.getItem('triangle_inquiries') || '[]');
    existing.unshift({ id: 'inq_' + Date.now(), ...leadData });
    localStorage.setItem('triangle_inquiries', JSON.stringify(existing));
  }

  const successMsg = document.getElementById('brochure-success-msg');
  if (successMsg) successMsg.classList.remove('hidden');

  // Fetch live property details for the PDF
  const liveProps = typeof getLiveProperties === 'function' ? getLiveProperties() : [];
  const property = liveProps.find(p => p.id === propertyId) || {};
  const price = property.price || "Contact for Price";
  const emi = property.emiOption || "EMI Available";
  const location = property.location || "Chennai Growth Corridor";
  const category = property.category || "Approved Plot Layout";
  const areaSqft = property.areaSqft || 722;
  const roadWidth = property.roadWidth || "30ft Wide Roads";

  // Trigger PDF brochure generation & download
  setTimeout(() => {
    try {
      const { jsPDF } = window.jspdf || {};
      if (jsPDF) {
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });

        // Brand Header (Dark & Gold Accent)
        doc.setFillColor(30, 41, 59); // Slate 800
        doc.rect(0, 0, 595, 110, 'F');

        doc.setFillColor(217, 119, 6); // Amber 600 line
        doc.rect(0, 106, 595, 4, 'F');

        doc.setTextColor(245, 158, 11); // Gold Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("TRIANGLE PROPERTIES", 40, 45);

        doc.setTextColor(226, 232, 240); // Light Slate
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("TAP into Smart Investments | DTCP & RERA Approved Layouts", 40, 65);
        doc.text("Corporate Office: Vadapalani, Chennai | Helpline: +91 88389 57874", 40, 82);

        // Document Title Banner
        doc.setFillColor(248, 250, 252);
        doc.rect(40, 130, 515, 40, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.rect(40, 130, 515, 40, 'S');

        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(`OFFICIAL PROJECT BROCHURE: ${title.toUpperCase()}`, 55, 155);

        // Customer Details Box
        doc.setFillColor(254, 243, 199); // Amber 100
        doc.rect(40, 185, 515, 45, 'F');
        doc.setDrawColor(245, 158, 11);
        doc.rect(40, 185, 515, 45, 'S');

        doc.setTextColor(180, 83, 9);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("PREPARED EXCLUSIVELY FOR:", 55, 203);

        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "normal");
        doc.text(`${name}   |   Mobile: ${phone}   |   Email: ${email || 'N/A'}`, 55, 219);

        // Property Specifications Table
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Project Specifications & Details", 40, 260);

        doc.setLineWidth(1);
        doc.setDrawColor(217, 119, 6);
        doc.line(40, 266, 555, 266);

        const specs = [
          ["Project Title", title],
          ["Project Code", propertyId.toUpperCase()],
          ["Approval Status", "CMDA & DTCP Approved Layout"],
          ["Category", category],
          ["Location Corridor", location],
          ["Plot Area", `${areaSqft} sq.ft onwards`],
          ["Road Infrastructure", roadWidth],
          ["Launch Price", price],
          ["EMI Options", emi]
        ];

        let startY = 280;
        specs.forEach(([label, value], idx) => {
          doc.setFillColor(idx % 2 === 0 ? 248 : 255, idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 252 : 255);
          doc.rect(40, startY, 515, 22, 'F');

          doc.setTextColor(71, 85, 105);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9.5);
          doc.text(label, 50, startY + 15);

          doc.setTextColor(15, 23, 42);
          doc.setFont("helvetica", "normal");
          doc.text(String(value), 200, startY + 15);

          startY += 22;
        });

        // Project Overview & Custom Description
        startY += 20;
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("Project Overview & Description", 40, startY);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(51, 65, 85);

        const rawDesc = property.description || "Premium plotted development by Triangle Properties situated in Chennai's fast-growing investment corridor with 100% clear title, DTCP/CMDA approvals, and immediate plot registration.";
        const splitDesc = doc.splitTextToSize(rawDesc, 515);

        let descY = startY + 18;
        splitDesc.forEach((line) => {
          if (descY < 730) {
            doc.text(line, 45, descY);
            descY += 15;
          }
        });

        // Corporate Footer Banner
        doc.setFillColor(30, 41, 59);
        doc.rect(40, 750, 515, 50, 'F');

        doc.setTextColor(245, 158, 11);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("Triangle Properties Pvt Ltd — Direct Sales Desk", 55, 768);

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("Phone: +91 88389 57874 / +91 72002 12759 | Website: https://triangleproperties.in", 55, 785);

        // Download PDF
        doc.save(`${propertyId}-Brochure-TriangleProperties.pdf`);
      } else {
        throw new Error("jsPDF library not available");
      }
    } catch (err) {
      console.warn("jsPDF fallback:", err);
      const fallbackText = `TRIANGLE PROPERTIES - PROJECT BROCHURE\n=========================================\nProject: ${title}\nLocation: ${location}\nPrice: ${price}\nEMI: ${emi}\n=========================================\nContact: +91 88389 57874\nWebsite: https://triangleproperties.in`;
      const blob = new Blob([fallbackText], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${propertyId}-Brochure-TriangleProperties.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setTimeout(closeBrochureModal, 2000);
  }, 400);
}

window.openBrochureModal = openBrochureModal;
window.closeBrochureModal = closeBrochureModal;
window.handleBrochureSubmit = handleBrochureSubmit;
