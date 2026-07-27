// Firebase / Firestore Integration & Client Inquiry Storage Handler

// Fallback local storage helper if Firebase is not active
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
      console.log('Inquiry saved locally:', newEntry);
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

// Global Submit Inquiry Handler
async function submitInquiry(formData) {
  console.log('Submitting inquiry:', formData);
  
  // If window.db (Firebase Firestore) is initialized, try writing to Firestore
  if (typeof window !== 'undefined' && window.db && typeof window.db.collection === 'function') {
    try {
      const docRef = await window.db.collection('inquiries').add({
        ...formData,
        timestamp: new Date()
      });
      return { success: true, id: docRef.id, mode: 'firestore' };
    } catch (error) {
      console.warn('Firestore write failed, falling back to local storage:', error);
      return LocalInquiryStore.saveInquiry(formData);
    }
  } else {
    // Graceful fallback to local storage
    return LocalInquiryStore.saveInquiry(formData);
  }
}

// Export functions to window
if (typeof window !== 'undefined') {
  window.submitInquiry = submitInquiry;
  window.LocalInquiryStore = LocalInquiryStore;
}
