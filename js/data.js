// Triangle Properties Pvt. Ltd. - Corporate Data Module

const TRIANGLE_DATA = {
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
    { label: "Years of Experience", value: 15, prefix: "", suffix: "+" },
    { label: "Completed Projects", value: 120, prefix: "", suffix: "+" },
    { label: "Satisfied Homeowners", value: 650, prefix: "", suffix: "+" },
    { label: "Square Feet Developed", value: 2.5, prefix: "", suffix: "M+ sqft" }
  ],

  processSteps: [
    { step: "01", title: "Consultation", desc: "Understanding budget, Vastu preferences, structural scope, and location criteria." },
    { step: "02", title: "Property Selection", desc: "Shortlisting 100% legal-clear apartments, villas, plots, or commercial layouts." },
    { step: "03", title: "Site Visit", desc: "Guided site walkthrough with senior engineering project advisors." },
    { step: "04", title: "Documentation", desc: "Title deed verification, CMDA/DTCP clearance, & bank home loan sanction." },
    { step: "05", title: "Registration", desc: "Sub-registrar office registration assistance and encumbrance certificate generation." },
    { step: "06", title: "Construction", desc: "Itemized civil execution with weekly structural progress updates." },
    { step: "07", title: "Handover", desc: "Formal key handover with 1-year structural warranty & ongoing property management." }
  ],

  properties: [
    {
      id: "prop-101",
      title: "Vadapalani Luxury Crest Apartments",
      category: "Apartment",
      status: "For Sale",
      price: "₹ 88 Lakhs",
      priceRaw: 8800000,
      location: "Vadapalani, Chennai",
      address: "Near Vadapalani Metro & Forum Mall, Chennai - 600026",
      bedrooms: 3,
      bathrooms: 2,
      parking: "Covered Car & Bike",
      areaSqft: 1450,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Executive 3 BHK apartments in prime Vadapalani. Featuring 100% Vastu compliance, covered car parking, elevator backup, and proximity to Vadapalani Metro station.",
      amenities: ["Covered Parking", "24/7 Power Backup", "Elevator Access", "CCTV Security", "Vastu Compliant Layout", "EV Charging Point"],
      specs: {
        facing: "East",
        floor: "2nd Floor of 5",
        possession: "Ready to Move",
        approval: "CMDA Approved"
      }
    },
    {
      id: "prop-102",
      title: "Royal Emerald Oceanfront Villa",
      category: "Villa",
      status: "For Sale",
      price: "₹ 3.40 Cr",
      priceRaw: 34000000,
      location: "ECR, Chennai",
      address: "East Coast Road, Near Kovalam Beach, Chennai",
      bedrooms: 4,
      bathrooms: 5,
      parking: "Private 3 Cars",
      areaSqft: 3200,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Exclusive sea-facing luxury villa offering private swimming pool, private terrace garden, double-height living room, and modern architectural finishes.",
      amenities: ["Private Pool", "Private Garden", "Home Theater Room", "Solar Panel Grid", "24/7 Gated Security"],
      specs: {
        facing: "North-East",
        floor: "G+2 Independent Villa",
        possession: "Immediate",
        approval: "DTCP Approved"
      }
    },
    {
      id: "prop-103",
      title: "Triangle Grand Horizon",
      category: "Apartment",
      status: "Under Construction",
      price: "₹ 65 Lakhs",
      priceRaw: 6500000,
      location: "Velachery, Chennai",
      address: "100 Feet Bypass Road, Velachery, Chennai",
      bedrooms: 2,
      bathrooms: 2,
      parking: "Covered Parking",
      areaSqft: 1120,
      builtYear: 2025,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Premium 2 BHK budget apartments strategically located near IT corridors and metro links. Excellent capital growth and rental yield potential.",
      amenities: ["Clubhouse Facilities", "Elevator Access", "Badminton Court", "Water Treatment Plant", "Visitor Parking"],
      specs: {
        facing: "North",
        floor: "3rd Floor of 8",
        possession: "December 2025",
        approval: "RERA Registered"
      }
    },
    {
      id: "prop-104",
      title: "Sapphire Commercial Workspace",
      category: "Commercial",
      status: "For Rent",
      price: "₹ 1.5 Lakhs / mo",
      priceRaw: 150000,
      location: "OMR, Chennai",
      address: "Perungudi OMR IT Corridor, Chennai",
      bedrooms: 0,
      bathrooms: 4,
      parking: "5 Cars & 10 Bikes",
      areaSqft: 3800,
      builtYear: 2023,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Grade-A plug-and-play office workspace ready for IT, corporate headquarters, or showroom setup. High visibility main road frontage.",
      amenities: ["Centralized AC", "100% Power Backup", "High-Speed Elevators", "Fire Safety Systems", "Valet Parking"],
      specs: {
        facing: "East",
        floor: "1st Floor",
        possession: "Immediate",
        approval: "CMDA Commercial"
      }
    },
    {
      id: "prop-105",
      title: "Green Meadows Gated Plots",
      category: "Plot",
      status: "For Sale",
      price: "₹ 36 Lakhs",
      priceRaw: 3600000,
      location: "Tambaram, Chennai",
      address: "Near MEPZ, Tambaram West, Chennai",
      bedrooms: 0,
      bathrooms: 0,
      parking: "Plot Space",
      areaSqft: 1800,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "DTCP & RERA approved villa plots in a fully developed gated township with 30ft wide blacktop roads and LED streetlights.",
      amenities: ["Gated Community", "30ft Wide Roads", "Underground Electrical Lines", "Water Connection Ready", "Park & Track"],
      specs: {
        facing: "South-East",
        floor: "Plot / Land",
        possession: "Immediate Registration",
        approval: "DTCP & RERA Approved"
      }
    },
    {
      id: "prop-106",
      title: "Anna Nagar Prime Residency",
      category: "Apartment",
      status: "For Sale",
      price: "₹ 1.45 Cr",
      priceRaw: 14500000,
      location: "Anna Nagar, Chennai",
      address: "2nd Avenue, Anna Nagar East, Chennai",
      bedrooms: 3,
      bathrooms: 3,
      parking: "Reserved Car Parking",
      areaSqft: 1680,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Ultra-prime 3 BHK apartment with Italian marble flooring, teak wood finishings, and smart security systems in Anna Nagar East.",
      amenities: ["Covered Parking", "Elevator Access", "Intercom Facility", "Power Backup", "CCTV Surveillance"],
      specs: {
        facing: "East",
        floor: "3rd Floor",
        possession: "Ready to Move",
        approval: "CMDA Approved"
      }
    }
  ],

  services: [
    {
      id: "serv-1",
      icon: "building-office-2",
      title: "Real Estate Sales & Advisory",
      shortDesc: "End-to-end assistance for residential apartments, independent houses, luxury villas, gated plots, and commercial spaces.",
      fullDesc: "We help home buyers find legal-clear, affordable properties in Chennai and guide property owners to get maximum market valuation with zero stress."
    },
    {
      id: "serv-2",
      icon: "wrench-screwdriver",
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
      icon: "document-text",
      title: "Property Management & Legal Documentation",
      shortDesc: "Rental management, tenant vetting, property inspection, title deed clearance, encumbrance certificates, and registration support.",
      fullDesc: "Our legal advocates and property managers look after your investment portfolio, handle tenant contracts, and ensure 100% legal title safety."
    }
  ],

  // Real Authentic Google Reviews
  testimonials: [
    {
      id: "test-1",
      name: "Suryamech",
      role: "Verified Google Reviewer (3 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: "Excellent service from start to finish. The team was professional, transparent, and very supportive throughout the entire process. They helped us find the perfect property with clear guidance and quick responses to all our questions. Highly trustworthy and customer friendly company."
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
      content: "Very happy with our land purchase experience. The team was very trustworthy and guided clearly according to our budget. Every step was transparent, and felt money was completely safe. All documents were genuine and properly explained."
    },
    {
      id: "test-4",
      name: "Sathesh S",
      role: "Google Reviewer (2 Reviews)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      content: "It was easy to contact these people, and their rates are very competitive. I am planning to purchase one of these properties soon. Thank you, everyone."
    },
    {
      id: "test-5",
      name: "Shankar M",
      role: "Google Reviewer (5 Reviews • 3 Photos)",
      rating: 5,
      time: "2 months ago",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
      content: "Kutumbakam project land I am also purchasing. Good place, customer support is very friendly."
    },
    {
      id: "test-6",
      name: "Ashok Thapa M",
      role: "Google Local Guide (22 Reviews)",
      rating: 5,
      time: "1 year ago",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      content: "The most trusted company and referred by my friend... well guided persons and had the best experience."
    },
    {
      id: "test-7",
      name: "Keshore Muruga",
      role: "Google Reviewer (4 Reviews)",
      rating: 5,
      time: "1 year ago",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      content: "Best property company I ever came across. Kind management and helpful employees."
    },
    {
      id: "test-8",
      name: "S Natarajan",
      role: "Google Reviewer (4 Reviews)",
      rating: 5,
      time: "6 months ago",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      content: "Best projects and price, very good customer service and transparency."
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

  faqs: [
    {
      question: "Why choose Triangle Properties Pvt. Ltd. for property development in Chennai?",
      answer: "We combine architectural innovation, direct manufacturer material sourcing, and comprehensive legal clearance to deliver high-end properties at accessible market prices."
    },
    {
      question: "Are all Triangle Properties projects DTCP/CMDA and RERA approved?",
      answer: "Yes, 100% of our residential and commercial developments hold mandatory CMDA/DTCP approvals, legal title clearance certificates, and official RERA registrations."
    },
    {
      question: "How does the Joint Venture (JV) land development process work?",
      answer: "Landowners provide the plot, while Triangle Properties Pvt. Ltd. manages architectural planning, statutory approvals, construction, and sales. Built-up area or revenues are shared transparently under a legal JDA contract."
    },
    {
      question: "Where is the head office of Triangle Properties Pvt. Ltd. located?",
      answer: "Our head office is located at No.23, Pillaiyar Kovil Street, Vadapalani, Chennai, Tamil Nadu - 600026, India. (Near Vadapalani Metro Station)."
    },
    {
      question: "What are your customer contact mobile and WhatsApp numbers?",
      answer: "You can reach our sales and advisory team directly via Phone or WhatsApp at 8838957874 or 7200212759."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.TRIANGLE_DATA = TRIANGLE_DATA;
}
