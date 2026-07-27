// Triangle Properties Pvt. Ltd. - Firebase 12.16.0 Live Cloud Integration

// Real Firebase Web App Config for triangle-properties
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

// Fallback local storage helper
const LocalInquiryStore = {
  saveInquiry: function(inquiryData) {
    try {
      const existing = JSON.parse(localStorage.getItem('triangle_inquiries') || '[]');
      const newEntry = {
        ...inquiryData,
        id: 'inq_' + Date.now(),
        submittedAt: new Date().toISOString()
      };
      existing.push(newEntry);
      localStorage.setItem('triangle_inquiries', JSON.stringify(existing));
      console.log('Inquiry saved to local fallback store:', newEntry);
      return Promise.resolve({ success: true, id: newEntry.id, mode: 'local' });
    } catch (err) {
      console.error('Error saving local inquiry:', err);
      return Promise.reject(err);
    }
  },
  getInquiries: function() {
    return JSON.parse(localStorage.getItem('triangle_inquiries') || '[]');
  }
};

// Dynamically initialize Firebase Modules
(async function initFirebase() {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    const { getFirestore, collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
    const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let analytics = null;
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.log("Analytics initialized in non-measurement browser scope");
    }

    window.firebaseApp = app;
    window.db = db;
    window.analytics = analytics;
    window.firestoreAddDoc = addDoc;
    window.firestoreCollection = collection;
    window.firestoreTimestamp = serverTimestamp;

    console.log("🔥 Firebase initialized successfully for triangle-properties!");
  } catch (err) {
    console.warn("Firebase SDK initialization notice (using offline local store):", err);
  }
})();

// Global Submit Inquiry Handler with Firebase Firestore Cloud Sync
async function submitInquiry(formData) {
  console.log('Submitting inquiry:', formData);
  
  if (window.db && window.firestoreAddDoc && window.firestoreCollection) {
    try {
      const colRef = window.firestoreCollection(window.db, 'inquiries');
      const docRef = await window.firestoreAddDoc(colRef, {
        ...formData,
        createdAt: window.firestoreTimestamp ? window.firestoreTimestamp() : new Date().toISOString()
      });
      console.log('🔥 Lead saved to Firebase Firestore Cloud! Doc ID:', docRef.id);
      return { success: true, id: docRef.id, mode: 'firestore' };
    } catch (error) {
      console.warn('Firestore Cloud write failed, falling back to local storage:', error);
      return LocalInquiryStore.saveInquiry(formData);
    }
  } else {
    return LocalInquiryStore.saveInquiry(formData);
  }
}

// Export global handlers
if (typeof window !== 'undefined') {
  window.firebaseConfig = firebaseConfig;
  window.submitInquiry = submitInquiry;
  window.LocalInquiryStore = LocalInquiryStore;
}
