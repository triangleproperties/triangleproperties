// Triangle Properties - Static Data & Fallback Storage

const TRIANGLE_DATA = {
  company: {
    name: "Triangle Properties & Constructions",
    tagline: "Building Dreams, Creating Legacies",
    phone: "+91 98765 43210",
    phoneRaw: "+919876543210",
    whatsapp: "+919876543210",
    email: "info@triangleproperties.in",
    address: "123 Prime Estate Avenue, Anna Nagar, Chennai, Tamil Nadu - 600040",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0024479907727!2d80.2078563!3d13.0850029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264269e8bb435%3A0x2897585097f4806a!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    workingHours: "Mon - Sat: 9:00 AM - 7:30 PM | Sun: By Appointment"
  },
  
  stats: [
    { label: "Completed Projects", value: 120, prefix: "", suffix: "+" },
    { label: "Happy Families", value: 650, prefix: "", suffix: "+" },
    { label: "Years of Trust", value: 15, prefix: "", suffix: "+" },
    { label: "Sq.Ft Developed", value: 2.5, prefix: "", suffix: "M+" }
  ],

  properties: [
    {
      id: "prop-101",
      title: "The Golden Crest Residency",
      category: "Apartment",
      status: "For Sale",
      price: "₹ 1.25 Cr",
      priceRaw: 12500000,
      location: "Anna Nagar, Chennai",
      address: "Plot 42, 4th Main Road, Anna Nagar West, Chennai",
      bedrooms: 3,
      bathrooms: 3,
      areaSqft: 1850,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Experience ultra-luxury living at The Golden Crest Residency. Featuring premium teak wood finishings, Italian marble flooring, 100% Vastu compliance, and state-of-the-art smart home integration.",
      amenities: ["Covered Car Parking", "24/7 Power Backup", "Gymnasium", "Rooftop Garden", "CCTV Security", "EV Charging Point", "Children's Play Area"],
      specs: {
        facing: "East",
        floor: "3rd Floor of 5",
        possession: "Ready to Move",
        approval: "CMDA Approved"
      }
    },
    {
      id: "prop-102",
      title: "Royal Emerald Villa",
      category: "Villa",
      status: "For Sale",
      price: "₹ 3.80 Cr",
      priceRaw: 38000000,
      location: "ECR, Chennai",
      address: "East Coast Road, Near Kovalam Beach, Chennai",
      bedrooms: 4,
      bathrooms: 5,
      areaSqft: 3400,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Exclusive sea-facing luxury villa offering private swimming pool, private terrace garden, double-height living room, and contemporary architectural design.",
      amenities: ["Private Pool", "Private Garden", "Home Theater Room", "Solar Panel Grid", "24/7 Gated Security", "Hydro-Pneumatic Water System"],
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
      price: "₹ 85 Lakhs",
      priceRaw: 8500000,
      location: "Velachery, Chennai",
      address: "100 Feet Bypass Road, Velachery, Chennai",
      bedrooms: 2,
      bathrooms: 2,
      areaSqft: 1220,
      builtYear: 2025,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Modern budget-friendly premium apartments strategically located near IT parks and metro links. High rental yield potential and rapid capital appreciation.",
      amenities: ["Clubhouse", "Lift Access", "Badminton Court", "Water Treatment Plant", "Intercom", "Visitor Parking"],
      specs: {
        facing: "North",
        floor: "2nd Floor of 8",
        possession: "December 2025",
        approval: "RERA Registered"
      }
    },
    {
      id: "prop-104",
      title: "Sapphire Commercial Enclave",
      category: "Commercial",
      status: "For Rent",
      price: "₹ 1.8 Lakhs / mo",
      priceRaw: 180000,
      location: "OMR, Chennai",
      address: "Perungudi OMR IT Corridor, Chennai",
      bedrooms: 0,
      bathrooms: 4,
      areaSqft: 4200,
      builtYear: 2023,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Grade-A plug-and-play office workspace ready for IT, corporate headquarters, or showroom setup. High visibility main road frontage with ample car parking.",
      amenities: ["Centralized AC", "100% Power Backup", "High-Speed Elevators", "Fire Safety System", "Valet Parking"],
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
      price: "₹ 48 Lakhs",
      priceRaw: 4800000,
      location: "Tambaram, Chennai",
      address: "Near MEPZ, Tambaram West, Chennai",
      bedrooms: 0,
      bathrooms: 0,
      areaSqft: 2400,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: false,
      description: "Premium villa plots in a fully developed gated township featuring 30ft wide blacktop roads, avenue trees, LED streetlights, and compound wall security.",
      amenities: ["Gated Community", "30ft Wide Roads", "Underground Electricity Lines", "Water Connection Ready", "Park & Walking Track"],
      specs: {
        facing: "South-East",
        floor: "Plot / Land",
        possession: "Immediate Registration",
        approval: "DTCP & RERA Approved"
      }
    },
    {
      id: "prop-106",
      title: "The Vantage Sky Penthouse",
      category: "Apartment",
      status: "For Sale",
      price: "₹ 2.65 Cr",
      priceRaw: 26500000,
      location: "Adyar, Chennai",
      address: "Lattice Bridge Road, Adyar, Chennai",
      bedrooms: 4,
      bathrooms: 4,
      areaSqft: 2950,
      builtYear: 2024,
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: "Duplex penthouse with panoramic cityscape views, private deck, Jacuzzi, Italian modular kitchen, and smart automated lighting.",
      amenities: ["Private Jacuzzi", "Duplex Layout", "Automated Lighting", "Dedicated 3 Car Parking", "Concierge Service"],
      specs: {
        facing: "East",
        floor: "12th & 13th Floor",
        possession: "Ready to Move",
        approval: "CMDA Approved"
      }
    }
  ],

  services: [
    {
      id: "serv-1",
      icon: "building-office-2",
      title: "Property Sales & Marketing",
      shortDesc: "End-to-end guidance for buying and selling residential apartments, luxury villas, commercial spaces, and verified plot layouts.",
      fullDesc: "We assist buyers in finding legal-clear, prime property investments and help sellers get maximum market value through targeted marketing campaigns, professional staging, and clear negotiations."
    },
    {
      id: "serv-2",
      icon: "wrench-screwdriver",
      title: "Turnkey Construction",
      shortDesc: "Architectural design, structural execution, interior styling, and project management with transparent material specs.",
      fullDesc: "From soil testing and foundation to interior design and key handover, our engineering team manages complete turnkey residential and commercial building construction on time and within budget."
    },
    {
      id: "serv-3",
      icon: "handshake",
      title: "Joint Venture Development",
      shortDesc: "Maximize land value with zero investment through transparent development agreements and high profit sharing ratio.",
      fullDesc: "We partner with prime landowners in Chennai and surrounding districts to construct modern residential complexes and commercial centers, offering maximum built-up ratio or revenue share."
    },
    {
      id: "serv-4",
      icon: "document-text",
      title: "Legal & Valuation Services",
      shortDesc: "Strict title scrutiny, CMDA/DTCP/RERA verification, property valuation, bank loan processing, and registration support.",
      fullDesc: "Our legal experts review all mother documents, encumbrance certificates, and statutory approvals to guarantee 100% hassle-free title transfers and quick home loan approvals."
    }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Ramesh & Sunitha",
      role: "Apartment Buyers (Anna Nagar)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content: "Triangle Properties made our dream home purchase effortless. From title verification to hand-over, every detail was handled transparently. Quality of construction is top-notch!"
    },
    {
      id: "test-2",
      name: "Dr. K. Parthasarathy",
      role: "Landowner - Joint Venture Partner",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content: "I gave my 3-ground plot for JV development with Triangle Properties. They delivered the apartment building 2 months ahead of schedule with exceptional build finish. Highly trustworthy team!"
    },
    {
      id: "test-3",
      name: "Anand Vikram",
      role: "Villa Owner (ECR)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      content: "Their turnkey construction service is outstanding. Clear itemized estimates, zero hidden costs, daily WhatsApp photo updates during construction, and excellent Vastu layout."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Golden Crest Exterior Elevation",
      category: "Elevation",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-2",
      title: "Luxury Living Room Interior",
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
      title: "Ongoing Structural Concreting Work",
      category: "Construction",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-5",
      title: "Royal Emerald Villa Night View",
      category: "Completed",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-6",
      title: "Master Bedroom Suite Design",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
    }
  ],

  faqs: [
    {
      question: "Are all Triangle Properties projects DTCP/CMDA and RERA approved?",
      answer: "Yes, 100% of our residential and commercial projects hold mandatory CMDA/DTCP approvals, legal title clearance certificates, and official RERA registration numbers."
    },
    {
      question: "How does the Joint Venture (JV) land development process work?",
      answer: "Landowners provide the plot, while Triangle Properties handles architectural design, statutory approvals, construction, marketing, and sales. Profits or built-up area are split based on a mutually agreed, legally binding agreement."
    },
    {
      question: "Do you offer custom interior customization for under-construction apartments?",
      answer: "Absolutely! Buyers booking during the construction phase can select custom flooring tiles, wall paint palettes, bathroom fittings, electrical point layouts, and modular kitchen designs."
    },
    {
      question: "Can Triangle Properties assist with home loans?",
      answer: "Yes. All our projects are pre-approved by leading banks including HDFC, SBI, ICICI, Axis Bank, and LIC Housing Finance for hassle-free 80-90% home loan processing."
    },
    {
      question: "What is included in your Turnkey Construction packages?",
      answer: "Our turnkey construction covers complete architectural & structural drawings, soil testing, foundation, RCC structure, brickwork, plastering, electrical, plumbing, flooring, painting, doors, windows, and elevation features."
    }
  ]
};

// Export to window object for global usage in vanilla JS
if (typeof window !== 'undefined') {
  window.TRIANGLE_DATA = TRIANGLE_DATA;
}
