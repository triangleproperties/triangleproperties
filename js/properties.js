// Triangle Properties Pvt. Ltd. - Property Search, Filter, & Detail Modal Handler (Luxury UI Pass)

document.addEventListener('DOMContentLoaded', () => {
  initPropertyGrid();
  initPropertySearch();

  // Listen for Cloud Firestore real-time updates across devices & browser storage
  window.addEventListener('triangle_data_updated', () => {
    initPropertyGrid();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'triangle_custom_data') {
      initPropertyGrid();
    }
  });
});

function getLiveProperties() {
  const liveData = window.loadLiveTriangleData ? window.loadLiveTriangleData() : window.TRIANGLE_DATA;
  return liveData?.properties || [];
}

/* -------------------------------------------------------------
 * 1. Render Property Grid Cards
 * ------------------------------------------------------------- */
function initPropertyGrid() {
  const gridContainer = document.getElementById('properties-grid');
  if (!gridContainer) return;

  renderProperties(getLiveProperties(), gridContainer);
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
        
        <div class="absolute top-4 left-4 z-10">
          <span class="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass} shadow-lg backdrop-blur-md">
            ${prop.status}
          </span>
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

        <div class="mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 block text-center">
            💳 ${prop.emiOption || 'Easy Monthly EMI Options Available'}
          </span>
        </div>

        <p class="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 mb-6 flex-grow leading-relaxed">
          ${prop.description}
        </p>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
          <button onclick="openPropertyModal('${prop.id}')" 
                  class="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all text-center shadow-md">
            View Details
          </button>
          <a href="https://wa.me/918838957874?text=${encodeURIComponent('Hello Triangle Properties, I want details regarding: ' + prop.title + ' (' + prop.id + ')')}" 
             target="_blank"
             rel="noopener noreferrer"
             title="Inquire on WhatsApp"
             class="py-3 px-3.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-xl text-xs font-semibold transition-all border border-emerald-500/30 flex items-center justify-center">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.201-1.101z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

/* -------------------------------------------------------------
 * 2. Search & Filter Logic
 * ------------------------------------------------------------- */
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

    const filtered = getLiveProperties().filter(prop => {
      const matchKeyword = !keyword || 
        prop.title.toLowerCase().includes(keyword) || 
        prop.location.toLowerCase().includes(keyword) ||
        prop.description.toLowerCase().includes(keyword);
      
      const matchType = selectedType === 'ALL' || prop.category === selectedType;
      const matchStatus = selectedStatus === 'ALL' || prop.status === selectedStatus;
      const matchPrice = prop.priceRaw <= maxPrice;

      return matchKeyword && matchType && matchStatus && matchPrice;
    });

    renderProperties(filtered, gridContainer);
  }

  searchInput?.addEventListener('input', applyFilters);
  typeFilter?.addEventListener('change', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  maxPriceFilter?.addEventListener('change', applyFilters);
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

  renderProperties(allProperties, gridContainer);
}

/* -------------------------------------------------------------
 * 3. Property Detail Modal Popup
 * ------------------------------------------------------------- */
function openPropertyModal(propertyId) {
  const prop = allProperties.find(p => p.id === propertyId);
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

        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 font-heading">Property Description</h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${prop.description}</p>
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
