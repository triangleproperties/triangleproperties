// Triangle Properties Pvt. Ltd. - Admin CRM & Lead Management System

const DEFAULT_ADMIN_PASS = "triangle2026";

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
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
    renderCrmTable();
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
      renderCrmTable();
      if (window.showToast) window.showToast('Welcome to Triangle Properties Admin CRM!', 'success');
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

/* -------------------------------------------------------------
 * 2. Lead Management & Local Storage Queue
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

/* -------------------------------------------------------------
 * 3. CRM Table Rendering & Event Listeners
 * ------------------------------------------------------------- */
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

  // Update KPI counters
  updateKpiCounters(leads);

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-slate-500 font-body text-sm">
          No customer inquiries match your filter criteria.
        </td>
      </tr>
    `;
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
        <span class="font-button text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 block w-fit mb-1">
          ${lead.propertyType}
        </span>
        <span class="font-body text-[11px] text-slate-400 block truncate max-w-xs" title="${lead.message}">${lead.message || 'No additional notes'}</span>
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
          <a href="tel:${lead.phone}" title="Call Lead" 
             class="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <span class="material-symbols-outlined text-base">call</span>
          </a>
          <button onclick="deleteLead('${lead.id}')" title="Delete Record" 
                  class="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
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

/* -------------------------------------------------------------
 * 4. CSV Export Generator
 * ------------------------------------------------------------- */
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
