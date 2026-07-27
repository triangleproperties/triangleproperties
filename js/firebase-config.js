// Triangle Properties Pvt. Ltd. - Firebase Production Auth, Firestore & Cloud Storage Integration

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

// Fallback local storage helper for offline mode
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
      return Promise.resolve({ success: true, id: newEntry.id, mode: 'local' });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getInquiries: function() {
    return JSON.parse(localStorage.getItem('triangle_inquiries') || '[]');
  }
};

// Dynamically initialize Firebase Auth, Firestore, Cloud Storage & Analytics
(async function initFirebase() {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    const { getFirestore, collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
    const { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
    const { getStorage, ref, uploadBytesResumable, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js");
    const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js");

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);
    let analytics = null;
    try { analytics = getAnalytics(app); } catch (e) {}

    window.firebaseApp = app;
    window.db = db;
    window.firebaseAuth = auth;
    window.firebaseStorage = storage;
    window.analytics = analytics;
    window.firestoreAddDoc = addDoc;
    window.firestoreCollection = collection;
    window.firestoreTimestamp = serverTimestamp;

    window.firebaseSignIn = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
    window.firebaseSignOut = () => signOut(auth);
    window.onFirebaseAuthStateChanged = (callback) => onAuthStateChanged(auth, callback);

    // Global Firebase Cloud Storage File Upload Helper
    window.uploadFileToFirebaseStorage = function(file, folderName = 'uploads', onProgress, onSuccess, onError) {
      if (!file) return;
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const storageRef = ref(storage, `${folderName}/${cleanFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Firebase Storage Upload Progress: ${progress.toFixed(0)}%`);
          if (typeof onProgress === 'function') onProgress(progress);
        },
        (error) => {
          console.error("Firebase Storage Upload Error:", error);
          if (typeof onError === 'function') onError(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("🔥 File uploaded to Firebase Storage! URL:", downloadURL);
          if (typeof onSuccess === 'function') onSuccess(downloadURL);
        }
      );
    };

    console.log("🔥 Firebase Auth, Firestore & Cloud Storage initialized for triangle-properties!");
  } catch (err) {
    console.warn("Firebase SDK initialization notice:", err);
  }
})();

// Global Submit Inquiry Handler
async function submitInquiry(formData) {
  if (window.db && window.firestoreAddDoc && window.firestoreCollection) {
    try {
      const colRef = window.firestoreCollection(window.db, 'inquiries');
      const docRef = await window.firestoreAddDoc(colRef, {
        ...formData,
        createdAt: window.firestoreTimestamp ? window.firestoreTimestamp() : new Date().toISOString()
      });
      return { success: true, id: docRef.id, mode: 'firestore' };
    } catch (error) {
      return LocalInquiryStore.saveInquiry(formData);
    }
  } else {
    return LocalInquiryStore.saveInquiry(formData);
  }
}

if (typeof window !== 'undefined') {
  window.firebaseConfig = firebaseConfig;
  window.submitInquiry = submitInquiry;
  window.LocalInquiryStore = LocalInquiryStore;
}
