// Triangle Properties Pvt. Ltd. - Dynamic Data & Live Content Sync Module

const BASE_TRIANGLE_DATA = {
  company: {
    name: "Triangle Properties",
    shortName: "Triangle Properties",
    tagline: "TAP into Smart Investments",
    altTagline: "TAP into Smart Investments",
    logoPath: "assets/logo.png",
    phone1: "8838957874",
    phone2: "7200212759",
    phone1Display: "+91 88389 57874",
    phone2Display: "+91 72002 12759",
    phoneDisplay: "+91 88389 57874 / +91 72002 12759",
    phoneRaw: "+918838957874",
    whatsapp: "918838957874",
    email: "info@triangleproperties.in",
    address: "No.23, Pillaiyar Kovil Street, Vadapalani, Chennai, Tamil Nadu - 600026, India",
    domains: ["triangleproperties.in", "triangleproperties.com"],
    socialLinks: {
      instagram: "https://www.instagram.com/trianglepropertiespvt/",
      facebook: "https://www.facebook.com/Triangleproperties/?ref=NONE_xav_ig_profile_page_web#",
      googleReviews: "https://www.google.com/search?q=triangleproperties+google+reviews"
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6872580436444!2d80.2089901!3d13.0506307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266c1f1f280a9%3A0x6b801a2f64d0d0f5!2sVadapalani%2C%20Chennai%2C%20Tamil%20Nadu%20600026!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    workingHours: "Mon - Sat: 9:00 AM - 7:30 PM | Sun: By Appointment"
  },
  
  stats: [
    { label: "YEARS EXPERIENCE", value: 5, prefix: "", suffix: "+" },
    { label: "PROJECTS HANDED OVER", value: 10, prefix: "", suffix: "+" },
    { label: "HAPPY CUSTOMERS", value: 1000, prefix: "", suffix: "+" }
  ],

  processSteps: [
    { step: "01", title: "Site Selection", desc: "Browse 100% legal-clear DTCP & RERA approved plots in Poonamallee, Tiruvallur & ECR." },
    { step: "02", title: "Guided Site Visit", desc: "Free site visit with our land advisors to inspect layout roads and plot dimensions." },
    { step: "03", title: "EMI & Loan Plan", desc: "Select flexible monthly EMI options starting from ₹6,000/mo or ₹10,000/mo with 0% hidden fee." },
    { step: "04", title: "Documentation", desc: "Title deed verification, parent document audit, and Encumbrance Certificate (EC) check." },
    { step: "05", title: "Registration", desc: "Sub-registrar office registration assistance and immediate physical plot handover." }
  ],

  properties: [
    {
      id: "prop-susee-alight",
      title: "Susee Alight – Kuthambakkam, Poonamallee",
      category: "DTCP & RERA Approved Plot",
      projectCategory: "Ongoing Projects",
      status: "For Sale",
      price: "₹ 1,899 / sq.ft",
      priceRaw: 1899,
      marketValue: "₹ 2,500 / sq.ft",
      emiOption: "Own at just ₹10,000/month",
      location: "Kuthambakkam, Poonamallee",
      address: "Near Bangalore Highway (NH48) & Kuthambakkam Bus Terminus, Poonamallee",
      areaSqft: 722,
      plotDimensions: "722 sq.ft onwards (6.7 Acres Total)",
      roadWidth: "33ft Wide Blacktop Road",
      totalPlots: 181,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Welcome to Susee Alight, an exclusive premium plotted development by Triangle Properties near Poonamallee. Spread across 6.7 acres with just 181 premium plots. Buy at 24% below market price (Launch: ₹1,899/sq.ft vs Market: ₹2,500/sq.ft).",
      amenities: ["DTCP & RERA Approved", "6.7 Acres Gated Community", "33ft Blacktop Roads", "24x7 CCTV Surveillance", "Uniformed Security", "Street Lighting"],
      specs: { facing: "North-East", dimensions: "722 sq.ft onwards", emi: "Own at just ₹10,000/month", approval: "DTCP & RERA Registered", roadWidth: "33ft Blacktop" }
    },
    {
      id: "prop-ma-nagar",
      title: "M.A. Nagar – Kadambathur, Tiruvallur",
      category: "DTCP Approved Plot",
      projectCategory: "Ongoing Projects",
      status: "For Sale",
      price: "₹ 899 / sq.ft",
      priceRaw: 899,
      marketValue: "₹ 1,300 / sq.ft",
      emiOption: "Own at just ₹6,000/month",
      location: "Kadambathur, Tiruvallur",
      address: "Near Tiruvallur Suburban Railway & Outer Ring Road, Tiruvallur",
      areaSqft: 600,
      plotDimensions: "600 sq.ft onwards (4.7 Acres Total)",
      roadWidth: "30ft Internal Road",
      totalPlots: 68,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Introducing M.A. Nagar, an affordable residential plotted development by Triangle Properties in Kadambathur, Tiruvallur. Spread across 4.7 acres with 68 plots. Buy at 31% below market value (Launch: ₹899/sq.ft vs Market: ₹1,300/sq.ft).",
      amenities: ["DTCP Approved", "4.7 Acres Layout", "30ft Roads", "24x7 CCTV", "Entrance Gate", "Avenue Plantation"],
      specs: { facing: "East", dimensions: "600 sq.ft onwards", emi: "Own at just ₹6,000/month", approval: "DTCP Approved", roadWidth: "30ft Internal Road" }
    },
    {
      id: "prop-ishwarya-nagar",
      title: "Ishwarya Nagar – Koovathur, ECR",
      category: "DTCP Approved Resort Plot",
      projectCategory: "Ongoing Projects",
      status: "For Sale",
      price: "₹ 777 / sq.ft",
      priceRaw: 777,
      marketValue: "₹ 1,300 / sq.ft",
      emiOption: "Own at just ₹8L Onwards",
      location: "Koovathur, ECR",
      address: "East Coast Road (ECR), Near Koovathur Coastal Corridor, Chennai",
      areaSqft: 1080,
      plotDimensions: "1080 sq.ft onwards (1.7 Acres Total)",
      roadWidth: "30ft Blacktop Road",
      totalPlots: 38,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Welcome to Ishwarya Nagar, exclusive DTCP approved resort plots by Triangle Properties on East Coast Road (ECR). 1.7 acres with 38 exclusive plots at over 40% below market value (Launch: ₹777/sq.ft vs Market: ₹1,300/sq.ft).",
      amenities: ["DTCP Approved", "Blacktop Internal Roads", "Street Lights", "Entrance Gate", "Avenue Plantation", "Coastal Living"],
      specs: { facing: "North-East", dimensions: "1080 sq.ft onwards", emi: "Own at just ₹8L Onwards", approval: "DTCP Approved", roadWidth: "30ft Blacktop" }
    },
    {
      id: "prop-sri-nagar-completed",
      title: "Sri Nagar Gated Layout – Poonamallee",
      category: "CMDA & RERA Approved Layout",
      projectCategory: "Completed Projects",
      status: "Completed",
      price: "100% Sold Out & Handed Over",
      priceRaw: 2200,
      marketValue: "₹ 3,200 / sq.ft",
      emiOption: "Handed Over & Registered",
      location: "Poonamallee, Chennai",
      address: "Near Poonamallee Bus Depot & Outer Ring Road Interchange, Chennai",
      areaSqft: 1200,
      plotDimensions: "1200 sq.ft to 2400 sq.ft (5.2 Acres)",
      roadWidth: "40ft & 30ft Blacktop Roads",
      totalPlots: 112,
      image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Sri Nagar Gated Layout is a flagship completed residential township by Triangle Properties in Poonamallee. Successfully delivered ahead of schedule with 100% occupancy, complete blacktop roads, street lighting, and gated entry.",
      amenities: ["CMDA & RERA Approved", "100% Delivered & Handed Over", "40ft Main Blacktop Road", "Children's Park", "24x7 Security Post", "Individual EB Lines"],
      specs: { facing: "East / North", dimensions: "1200 - 2400 sq.ft", emi: "Handed Over", approval: "CMDA & RERA Approved", roadWidth: "40ft Blacktop" }
    },
    {
      id: "prop-green-city-completed",
      title: "Green City Layout – Vadapalani",
      category: "CMDA Approved Residential Plot",
      projectCategory: "Completed Projects",
      status: "Completed",
      price: "100% Sold Out & Delivered",
      priceRaw: 3500,
      marketValue: "₹ 5,000 / sq.ft",
      emiOption: "Handed Over & Registered",
      location: "Vadapalani, Chennai",
      address: "Near Vadapalani Metro Station & Forum Vijaya Mall, Chennai",
      areaSqft: 1500,
      plotDimensions: "1500 sq.ft onwards (3.8 Acres)",
      roadWidth: "33ft Internal Tar Road",
      totalPlots: 45,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Green City Vadapalani is a landmark completed urban residential layout by Triangle Properties. Fully developed, registered, and handed over to happy homeowners with prime connectivity to Vadapalani Metro.",
      amenities: ["CMDA Approved", "Fully Handed Over", "Metro Proximity", "Underground Drainage", "Avenue Trees", "Compound Wall"],
      specs: { facing: "North", dimensions: "1500 sq.ft onwards", emi: "Handed Over", approval: "CMDA Registered", roadWidth: "33ft Tar Road" }
    }
  ],

  categories: [
    { id: "cat-1", name: "CMDA Approved Plots", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
    { id: "cat-2", name: "DTCP Approved Plots", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
    { id: "cat-3", name: "Gated Villa Plots", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80" },
    { id: "cat-4", name: "Commercial Land", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
    { id: "cat-5", name: "Farm & Agricultural Lands", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" }
  ],

  services: [
    {
      id: "serv-1",
      icon: "apartment",
      title: "Real Estate Sales & Advisory",
      shortDesc: "End-to-end assistance for residential apartments, independent houses, luxury villas, gated plots, and commercial spaces.",
      fullDesc: "We help home buyers find legal-clear, affordable properties in Chennai and guide property owners to get maximum market valuation with zero stress."
    },
    {
      id: "serv-2",
      icon: "foundation",
      title: "Residential & Commercial Construction",
      shortDesc: "Turnkey house construction, building planning, structural design, interior works, and renovation with transparent material pricing.",
      fullDesc: "From architectural drawings and soil testing to RCC framework and final keys, our civil engineering team delivers on time and within budget."
    },
    {
      id: "serv-3",
      icon: "handshake",
      title: "Joint Venture Land Development",
      shortDesc: "Partner with Triangle Properties Pvt. Ltd. to convert your land into high-value apartments with attractive revenue or area sharing.",
      fullDesc: "We partner with prime landowners in Vadapalani, Anna Nagar, ECR, and across Chennai to build modern residential complexes with zero land-owner capital required."
    },
    {
      id: "serv-4",
      icon: "policy",
      title: "Property Management & Legal Documentation",
      shortDesc: "Rental management, tenant vetting, property inspection, title deed clearance, encumbrance certificates, and registration support.",
      fullDesc: "Our legal advocates and property managers look after your investment portfolio, handle tenant contracts, and ensure 100% legal title safety."
    }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Suryamech",
      role: "Verified Google Reviewer (3 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "",
      content: "Excellent service from start to finish. The team was professional, transparent, and very supportive throughout the entire process. They helped us find the perfect property with clear guidance and quick responses."
    },
    {
      id: "test-2",
      name: "Dillibabu Ramu",
      role: "Google Reviewer (8 Reviews • 3 Photos)",
      rating: 5,
      time: "2 months ago",
      avatar: "",
      content: "Perfect location! Perfect choice! Perfect partner! Perfect price! Triangle Properties service is professional, organized, and customer-friendly."
    },
    {
      id: "test-3",
      name: "Sandhiya Jagadeesan",
      role: "Google Reviewer (4 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "",
      content: "Very happy with our land purchase experience. The team was very trustworthy and guided clearly according to our budget. Every step was transparent, and felt money was completely safe."
    },
    {
      id: "test-4",
      name: "Sathesh S",
      role: "Google Reviewer (2 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "",
      content: "It was easy to contact these people, and their rates are very competitive. I am planning to purchase one of these properties soon."
    },
    {
      id: "test-5",
      name: "Shankar M",
      role: "Google Reviewer (5 Reviews • 3 Photos)",
      rating: 5,
      time: "2 months ago",
      avatar: "",
      content: "Kutumbakam project land I am also purchasing. Good place, customer support is very friendly."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Vadapalani Luxury Crest Elevation",
      category: "Elevation",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-2",
      title: "Executive Living Room Interior",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-3",
      title: "Modular Teak & Quartz Kitchen",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-4",
      title: "Site Structural Supervision",
      category: "Construction",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-5",
      title: "Royal Emerald ECR Villa View",
      category: "Completed",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-6",
      title: "Master Suite Interior",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
    }
  ],

  construction: {
    basicRate: 2100,
    premiumRate: 2450,
    luxuryRate: 2950,
    note: "All construction rates include structural engineering drawings, CMDA/DTCP building plan sanction assistance, RCC frame structure (Fe550 TMT steel), UltraTech/Dalmia cement, premium vitrified tile flooring, teak wood main door, Kohler/Jaquar sanitary fittings, and 1-year structural warranty."
  },

  about: {
    years: "17+ Years",
    completed: "120+ Layout Projects",
    families: "650+ Happy Owners",
    vision: "To deliver transparent, CMDA & DTCP approved, architecturally superior residential plot layouts and turnkey civil developments across Chennai with uncompromised trust and legal title safety."
  },

  jointVenture: {
    sharingRatio: "50:50 / 60:40 Area Sharing",
    minLand: "2 Grounds (4,800 Sq.Ft) & Above",
    benefits: "Zero Landowner Capital Investment, 100% Legal Sanction Approval by Developer, Transparent Built-up Area Sharing, Bank Guarantee & Sub-Registrar Agreement Assurance."
  },

  blogs: [
    {
      id: "blog-1",
      title: "Comprehensive Guide to Buying CMDA & DTCP Approved Plots in Chennai (2026 Legal Checklist)",
      category: "Legal & Clear Title",
      author: "Triangle Editorial Team",
      date: "August 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Essential legal verification steps every homebuyer must follow before investing in residential plot layouts in Vadapalani, Tambaram, and ECR corridors.",
      content: `
        <p class="mb-4">Investing in land in Chennai is one of the safest financial decisions when backed by thorough legal verification. However, navigating approvals between CMDA (Chennai Metropolitan Development Authority) and DTCP (Directorate of Town and Country Planning) can often feel daunting for first-time buyers.</p>
        
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">1. Verifying Layout Sanction Numbers</h3>
        <p class="mb-4">Always demand the official Planning Permit (P.P.) number and layout approval letter from the developer. CMDA jurisdiction covers Chennai city limits and expanding suburbs within 1,189 sq.km, while DTCP governs non-metropolitan districts across Tamil Nadu.</p>

        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">2. Parent Document Verification (30-Year Traceability)</h3>
        <p class="mb-4">Ensure your legal advocate inspects title deeds spanning at least 30 to 40 uninterrupted years. Verify Patta/Chitta ownership, Encumbrance Certificate (EC) for zero active mortgages, and clearance of Nil encumbrances.</p>

        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">3. Road Gifting & OSR Compliance</h3>
        <p class="mb-4">A legally compliant layout must have layout inner roads gifted to local panchayats or municipalities via registered Gift Deeds. Triangle Properties guarantees 100% legal title clearance and transparent documentation for all plots.</p>
      `
    },
    {
      id: "blog-2",
      title: "Top Emerging Property Hotspots in Vadapalani & West Chennai for High Capital Growth",
      category: "Market Insights",
      author: "Land Advisory Bureau",
      date: "July 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Discover why Vadapalani and adjoining West Chennai corridors are experiencing rapid real estate appreciation due to Metro expansion and civic infrastructure upgrades.",
      content: `
        <p class="mb-4">West Chennai, anchored by Vadapalani and Poonamallee, has emerged as the premier real estate growth vector for residential plot investments. Connectivity upgrades via Metro Rail Corridor 4 have slashed commute times to central business hubs.</p>
        
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">Why Vadapalani Central Remains Gold</h3>
        <p class="mb-4">With proximity to Forum Vijaya Mall, major multi-specialty hospitals, and central bus terminals, land in Vadapalani enjoys continuous demand, high rental yields, and robust re-sale liquidity.</p>
      `
    },
    {
      id: "blog-3",
      title: "Turnkey House Construction vs Independent Contracting: Cost, Quality & Timeline Analysis",
      category: "Construction Guides",
      author: "Civil Engineering Department",
      date: "July 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Compare structural material standards, per square foot pricing models, and contract assurances when planning your dream villa build in Chennai.",
      content: `
        <p class="mb-4">Building your home requires balancing material quality, structural stability, and budget discipline. Turnkey civil execution by experienced residential developers eliminates cost overruns and material substitution risks.</p>
        
        <h3 class="text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">Key Benefits of Turnkey Execution</h3>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Single-point accountability for architectural design, soil testing, and construction.</li>
          <li>Fixed per-sq.ft rates with transparent specification schedules (Fe550 steel, UltraTech cement).</li>
          <li>Strict timeline guarantees backed by structural warranty certification.</li>
        </ul>
      `
    }
  ]
};

// Retrieve live merged data (Baseline + Dynamic Admin Overrides)
function loadLiveTriangleData() {
  const customDataStr = localStorage.getItem('triangle_custom_data');
  if (!customDataStr) {
    return BASE_TRIANGLE_DATA;
  }
  try {
    const custom = JSON.parse(customDataStr);
    return {
      ...BASE_TRIANGLE_DATA,
      company: { ...BASE_TRIANGLE_DATA.company, ...(custom.company || {}) },
      stats: custom.stats || BASE_TRIANGLE_DATA.stats,
      processSteps: custom.processSteps || BASE_TRIANGLE_DATA.processSteps,
      properties: (custom.properties && Array.isArray(custom.properties) && custom.properties.length > 0) ? custom.properties : BASE_TRIANGLE_DATA.properties,
      categories: (custom.categories && Array.isArray(custom.categories) && custom.categories.length > 0) ? custom.categories : (BASE_TRIANGLE_DATA.categories || []),
      services: (custom.services && Array.isArray(custom.services) && custom.services.length > 0) ? custom.services : BASE_TRIANGLE_DATA.services,
      testimonials: (custom.testimonials && Array.isArray(custom.testimonials) && custom.testimonials.length > 0) ? custom.testimonials : BASE_TRIANGLE_DATA.testimonials,
      gallery: (custom.gallery && Array.isArray(custom.gallery) && custom.gallery.length > 0) ? custom.gallery : BASE_TRIANGLE_DATA.gallery,
      blogs: (custom.blogs && Array.isArray(custom.blogs) && custom.blogs.length > 0) ? custom.blogs : BASE_TRIANGLE_DATA.blogs,
      construction: custom.construction || BASE_TRIANGLE_DATA.construction,
      about: custom.about || BASE_TRIANGLE_DATA.about,
      jointVenture: custom.jointVenture || BASE_TRIANGLE_DATA.jointVenture
    };
  } catch (e) {
    console.error("Error loading custom data overrides:", e);
    return BASE_TRIANGLE_DATA;
  }
}

async function saveLiveTriangleData(newData) {
  let localSaved = false;
  let firestoreSaved = false;
  let errorMsg = null;

  const existing = loadLiveTriangleData();
  const merged = {
    ...existing,
    ...newData,
    company: { ...existing.company, ...(newData.company || {}) },
    properties: newData.properties || existing.properties,
    categories: newData.categories || existing.categories,
    gallery: newData.gallery || existing.gallery,
    blogs: newData.blogs || existing.blogs,
    services: newData.services || existing.services,
    testimonials: newData.testimonials || existing.testimonials,
    construction: newData.construction || existing.construction,
    about: newData.about || existing.about,
    jointVenture: newData.jointVenture || existing.jointVenture
  };

  // 1. Write to LocalStorage (Offline Cache)
  try {
    localStorage.setItem('triangle_custom_data', JSON.stringify(merged));
    window.TRIANGLE_DATA = merged;
    localSaved = true;
  } catch (e) {
    console.error("LocalStorage quota/private browsing write error:", e);
    errorMsg = e.message || "Browser storage write restricted";
  }

  // Broadcast live event for active tabs
  window.dispatchEvent(new CustomEvent('triangle_data_updated', { detail: merged }));

  // 2. Write to Cloud Firestore Primary Storage
  if (window.db && window.firestoreSetDoc && window.firestoreDoc) {
    try {
      const legacyDocRef = window.firestoreDoc(window.db, 'app_data', 'triangle_custom_data');
      await window.firestoreSetDoc(legacyDocRef, merged, { merge: true });

      // Save to Decoupled Settings Documents
      if (newData.company) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'company'), newData.company, { merge: true });
      }
      if (newData.construction) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'construction'), newData.construction, { merge: true });
      }
      if (newData.about) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'about'), newData.about, { merge: true });
      }
      if (newData.jointVenture) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'jointVenture'), newData.jointVenture, { merge: true });
      }
      if (newData.testimonials) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'testimonials'), { items: newData.testimonials }, { merge: true });
      }
      if (newData.stats) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'stats'), { items: newData.stats }, { merge: true });
      }
      if (newData.processSteps) {
        await window.firestoreSetDoc(window.firestoreDoc(window.db, 'settings', 'processSteps'), { items: newData.processSteps }, { merge: true });
      }

      firestoreSaved = true;
      console.log("🔥 Cloud Firestore multi-collection save confirmed!");
    } catch (err) {
      console.error("Firestore cloud save error:", err);
      errorMsg = err.message || "Cloud Firestore save permission denied";
    }
  }

  if (firestoreSaved || localSaved) {
    return { success: true, source: firestoreSaved ? 'firestore' : 'local' };
  } else {
    return { success: false, error: errorMsg || "Failed to persist data in storage or cloud" };
  }
}

// Subscribe to Cloud Firestore Realtime Updates
function initFirestoreLiveSync() {
  if (window.db && window.firestoreOnSnapshot && window.firestoreDoc) {
    try {
      const docRef = window.firestoreDoc(window.db, 'app_data', 'triangle_custom_data');
      window.firestoreOnSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data();
          const newStr = JSON.stringify(cloudData);
          const currentStr = localStorage.getItem('triangle_custom_data');

          if (newStr !== currentStr) {
            console.log("🔥 Received real-time Cloud Firestore update from Admin!");
            try {
              localStorage.setItem('triangle_custom_data', newStr);
            } catch (e) {
              console.warn("LocalStorage caching notice:", e);
            }
            window.TRIANGLE_DATA = loadLiveTriangleData();
            window.dispatchEvent(new CustomEvent('triangle_data_updated', { detail: window.TRIANGLE_DATA }));
          }
        }
      });
    } catch (err) {
      console.warn("Firestore live snapshot listener notice:", err);
    }
  }
}

// Global initialization
const TRIANGLE_DATA = loadLiveTriangleData();

if (typeof window !== 'undefined') {
  window.BASE_TRIANGLE_DATA = BASE_TRIANGLE_DATA;
  window.TRIANGLE_DATA = TRIANGLE_DATA;
  window.loadLiveTriangleData = loadLiveTriangleData;
  window.saveLiveTriangleData = saveLiveTriangleData;
  window.initFirestoreLiveSync = initFirestoreLiveSync;
}
