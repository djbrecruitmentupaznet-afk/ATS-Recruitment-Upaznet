import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAs7-E4Jw5FhQWpOhzP4MTX_PSD4Mxvueo",
  authDomain: "recruitmentupaznetats.firebaseapp.com",
  projectId: "recruitmentupaznetats",
  storageBucket: "recruitmentupaznetats.firebasestorage.app",
  messagingSenderId: "907827986807",
  appId: "1:907827986807:web:06a60cb242d1b2bac16172"
};

const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);
window.collection = collection;
window.getDocs = getDocs;
window.doc = doc;
window.setDoc = setDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;

const auth = getAuth(app);
window.auth = auth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.setPersistence = setPersistence;
window.browserLocalPersistence = browserLocalPersistence;
window.browserSessionPersistence = browserSessionPersistence;

// AUTH CHECKER (Penjaga Pintu)
onAuthStateChanged(auth, (user) => {
  const loginOverlay = document.getElementById('loginOverlay');
  const authGuardOverlay = document.getElementById('authGuardOverlay');
  const loadingOverlay = document.getElementById('loadingOverlay');

  if (user) {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (authGuardOverlay) authGuardOverlay.style.display = 'none';
    
    // Jalankan inisialisasi unik dari masing-masing HTML jika ada
    if (typeof window.initApp === 'function') {
      window.initApp();
    }
  } else {
    if (loginOverlay) {
      loginOverlay.style.display = 'flex';
      if (loadingOverlay) loadingOverlay.style.display = 'none';
    } else {
      window.location.href = 'index.html';
    }
  }
});

window.logoutApp = async function() {
  if (confirm("Yakin ingin keluar dari sistem?")) {
    await window.signOut(window.auth);
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      window.location.reload(); 
    } else {
      window.location.href = 'index.html';
    }
  }
}

window.toggleFilters = function() {
  const filterContainer = document.getElementById('filterContainer');
  if (filterContainer) {
    filterContainer.classList.toggle('hidden');
  }
};

const GAS_UPLOAD_URL = "https://script.google.com/macros/s/AKfycbwD7HjhmGyLeQsqSx6BK8rSTTp4SgZ1LECJoyllD9oF0rcugJq2icwr6LwvqRmtw-4lIA/exec";
window.uploadFileToDriveGAS = async function(base64Data, fileName) {
  try {
    const response = await fetch(GAS_UPLOAD_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ file: base64Data, name: fileName })
    });
    const result = await response.json();
    if (result.status === "success") {
      return result.url;
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    alert("Gagal mengupload file ke Drive: " + err.message);
    return null;
  }
}