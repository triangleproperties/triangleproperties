// Triangle Properties Pvt. Ltd. - Dynamic Data & Live Content Sync Module

const BASE_TRIANGLE_DATA = {
  company: {
    name: "Triangle Properties Pvt. Ltd.",
    shortName: "Triangle Properties",
    tagline: "Chennai's Most Affordable Property Developer",
    altTagline: "Building Dreams. Creating Value.",
    logoPath: "assets/logo.png",
    phone1: "8838957874",
    phone2: "7200212759",
    phoneDisplay: "+91 88389 57874 / +91 72002 12759",
    phoneRaw: "+918838957874",
    whatsapp: "918838957874",
    email: "info@triangleproperties.in",
    address: "No.23, Pillaiyar Kovil Street, Vadapalani, Chennai, Tamil Nadu - 600026, India",
    domains: ["triangleproperties.in", "trianglepropertiespvt.com"],
    socialLinks: {
      instagram: "https://www.instagram.com/trianglepropertiespvt/",
      facebook: "https://www.facebook.com/Triangleproperties/?ref=NONE_xav_ig_profile_page_web#",
      googleReviews: "https://www.google.com/search?q=trianglepropertiespvt+google+reviews"
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6872580436444!2d80.2089901!3d13.0506307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266c1f1f280a9%3A0x6b801a2f64d0d0f5!2sVadapalani%2C%20Chennai%2C%20Tamil%20Nadu%20600026!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    workingHours: "Mon - Sat: 9:00 AM - 7:30 PM | Sun: By Appointment"
  },
  
  stats: [
    { label: "Years of Excellence", value: 15, prefix: "", suffix: "+" },
    { label: "Approved Layouts", value: 120, prefix: "", suffix: "+" },
    { label: "Satisfied Plot Owners", value: 650, prefix: "", suffix: "+" },
    { label: "Square Feet Developed", value: 2.5, prefix: "", suffix: "M+ sqft" }
  ],

  processSteps: [
    { step: "01", title: "Site Selection", desc: "Browse 100% legal-clear CMDA & DTCP approved plots, commercial land, or farm land." },
    { step: "02", title: "Guided Site Visit", desc: "Free site visit with our land advisors to inspect layout roads and plot dimensions." },
    { step: "03", title: "EMI & Loan Plan", desc: "Select flexible monthly EMI options or 80% bank loan approval with 0% hidden fee." },
    { step: "04", title: "Documentation", desc: "Title deed verification, parent document audit, and Encumbrance Certificate (EC) check." },
    { step: "05", title: "Registration", desc: "Sub-registrar office registration assistance and immediate physical plot handover." }
  ],

  properties: [
    {
      id: "prop-101",
      title: "Vadapalani Metro Enclave Plot",
      category: "CMDA Approved Plot",
      projectCategory: "Completed Projects",
      status: "For Sale",
      price: "₹ 48 Lakhs",
      priceRaw: 4800000,
      emiOption: "EMI from ₹22,500/mo",
      location: "Vadapalani, Chennai",
      address: "Near Vadapalani Metro & Forum Mall, Chennai - 600026",
      areaSqft: 1200,
      plotDimensions: "30ft × 40ft",
      roadWidth: "30ft Tar Road",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Prime CMDA approved residential plot situated in Vadapalani near Metro Station. 100% Vastu compliant layout, clear title deed, immediate registration, and 80% bank loan approval with easy monthly EMI options.",
      amenities: ["CMDA Approved", "30ft Wide Tar Road", "Underground Water Line", "Electricity Connection", "Compound Wall", "80% Bank Loan Approved"],
      specs: { facing: "East", dimensions: "30ft × 40ft", emi: "₹22,500/mo", approval: "CMDA P.P. No. 142/2024", roadWidth: "30ft Blacktop" }
    },
    {
      id: "prop-102",
      title: "ECR Seaside Gated Villa Plot",
      category: "Gated Villa Plot",
      projectCategory: "Completed Projects",
      status: "For Sale",
      price: "₹ 75 Lakhs",
      priceRaw: 7500000,
      emiOption: "EMI from ₹35,000/mo",
      location: "ECR Kovalam, Chennai",
      address: "East Coast Road, Near Kovalam Beach, Chennai",
      areaSqft: 2400,
      plotDimensions: "40ft × 60ft",
      roadWidth: "40ft Blacktop Road",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Exclusive ocean-breeze DTCP approved villa plot in gated enclave on East Coast Road. Features avenue trees, street lights, 24/7 security gate, and zero-interest EMI payment terms.",
      amenities: ["DTCP Approved", "Gated Security", "40ft Avenue Road", "Avenue Trees", "Streetlights", "Easy EMI Payment Plan"],
      specs: { facing: "North-East", dimensions: "40ft × 60ft", emi: "₹35,000/mo", approval: "DTCP L.P. No. 88/2024", roadWidth: "40ft Avenue" }
    },
    {
      id: "prop-103",
      title: "Tambaram Green City Plots",
      category: "DTCP Approved Plot",
      projectCategory: "Startup Projects",
      status: "For Sale",
      price: "₹ 24 Lakhs",
      priceRaw: 2400000,
      emiOption: "EMI from ₹12,000/mo",
      location: "Tambaram West, Chennai",
      address: "Near MEPZ & Outer Ring Road, Tambaram, Chennai",
      areaSqft: 800,
      plotDimensions: "20ft × 40ft",
      roadWidth: "30ft Blacktop Road",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Budget-friendly DTCP approved residential plot in rapidly developing Tambaram West corridor. 100% legal clearance with 36-month easy EMI payment flexibility.",
      amenities: ["DTCP Approved", "30ft Tar Road", "Park & Children Play Area", "Street Lights", "Rainwater Harvesting", "Bank Loan Assistance"],
      specs: { facing: "North", dimensions: "20ft × 40ft", emi: "₹12,000/mo", approval: "DTCP Approved 2024", roadWidth: "30ft Tar" }
    },
    {
      id: "prop-104",
      title: "OMR Commercial Highway Plot",
      category: "Commercial Land",
      projectCategory: "Startup Projects",
      status: "For Sale",
      price: "₹ 1.80 Cr",
      priceRaw: 18000000,
      emiOption: "Commercial EMI Available",
      location: "OMR IT Corridor, Chennai",
      address: "Main Road Frontage, Perungudi OMR, Chennai",
      areaSqft: 4800,
      plotDimensions: "60ft × 80ft",
      roadWidth: "60ft Main Road",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Prime CMDA commercial plot with 60ft main road frontage along OMR IT Corridor. Ideal for corporate office building, commercial complex, or showroom.",
      amenities: ["CMDA Commercial", "60ft Main Road", "High Visibility", "3-Phase Power Ready", "Commercial Loan 80%"],
      specs: { facing: "East", dimensions: "60ft × 80ft", emi: "Commercial Loan Available", approval: "CMDA Commercial Approved", roadWidth: "60ft Main Road" }
    },
    {
      id: "prop-105",
      title: "Poonamallee Smart Township Plots",
      category: "CMDA Approved Plot",
      projectCategory: "Completed Projects",
      status: "For Sale",
      price: "₹ 36 Lakhs",
      priceRaw: 3600000,
      emiOption: "EMI from ₹16,500/mo",
      location: "Poonamallee, Chennai",
      address: "Near Poonamallee Bus Terminus & Upcoming Metro, Chennai",
      areaSqft: 1500,
      plotDimensions: "30ft × 50ft",
      roadWidth: "30ft Tar Road",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "CMDA approved residential plots in Poonamallee smart township. High capital appreciation zone near Chennai-Bengaluru highway & Metro extension.",
      amenities: ["CMDA Approved", "Gated Township", "Underground Drainage", "EB Connection", "24/7 Security Guard"],
      specs: { facing: "East", dimensions: "30ft × 50ft", emi: "₹16,500/mo", approval: "CMDA Approved", roadWidth: "30ft Blacktop" }
    },
    {
      id: "prop-106",
      title: "Sriperumbudur Eco Farm Lands",
      category: "Farm & Agricultural Land",
      projectCategory: "Startup Projects",
      status: "For Sale",
      price: "₹ 18 Lakhs / Acre",
      priceRaw: 1800000,
      emiOption: "EMI from ₹9,999/mo",
      location: "Sriperumbudur, Chennai",
      address: "Near Industrial Corridor, Sriperumbudur, Chennai",
      areaSqft: 43560,
      plotDimensions: "1 Acre (100 Cents)",
      roadWidth: "24ft Panchayat Road",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Fertile agricultural and farm land plots ideal for farmhouse, organic cultivation, or long-term investment. Clear title deed with easy EMI options.",
      amenities: ["Clear Title Deed", "Good Groundwater Table", "Fencing Completed", "24ft Access Road", "Easy EMI"],
      specs: { facing: "South-East", dimensions: "1 Acre", emi: "₹9,999/mo", approval: "Panchayat Clearance", roadWidth: "24ft Road" }
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
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: "Excellent service from start to finish. The team was professional, transparent, and very supportive throughout the entire process. They helped us find the perfect property with clear guidance and quick responses."
    },
    {
      id: "test-2",
      name: "Dillibabu Ramu",
      role: "Google Reviewer (8 Reviews • 3 Photos)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content: "Perfect location! Perfect choice! Perfect partner! Perfect price! Triangle Properties service is professional, organized, and customer-friendly."
    },
    {
      id: "test-3",
      name: "Sandhiya Jagadeesan",
      role: "Google Reviewer (4 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      content: "Very happy with our land purchase experience. The team was very trustworthy and guided clearly according to our budget. Every step was transparent, and felt money was completely safe."
    },
    {
      id: "test-4",
      name: "Sathesh S",
      role: "Google Reviewer (2 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      content: "It was easy to contact these people, and their rates are very competitive. I am planning to purchase one of these properties soon."
    },
    {
      id: "test-5",
      name: "Shankar M",
      role: "Google Reviewer (5 Reviews • 3 Photos)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
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
  }
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
          console.log("🔥 Received real-time Cloud Firestore update from Admin!");
          try {
            localStorage.setItem('triangle_custom_data', JSON.stringify(cloudData));
          } catch (e) {
            console.warn("LocalStorage caching notice:", e);
          }
          window.TRIANGLE_DATA = loadLiveTriangleData();
          window.dispatchEvent(new CustomEvent('triangle_data_updated', { detail: window.TRIANGLE_DATA }));
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
