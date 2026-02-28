// ============================================================
//  FIREBASE CONFIGURATION — Phoenix Institute
//  Project: phoenix-8b6a0
//  ⚠️  Keep this file private — do not share your API key publicly
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyBCuzohR31M-3O6soZt-RUlCeNh5cdmwyE",
    authDomain: "phoenix-8b6a0.firebaseapp.com",
    projectId: "phoenix-8b6a0",
    storageBucket: "phoenix-8b6a0.firebasestorage.app",
    messagingSenderId: "234365321276",
    appId: "1:234365321276:web:8aaf9a94286dd3bb6b8339",
    measurementId: "G-2YBWYL0RY1"
};

const _app = initializeApp(firebaseConfig);

// ── Offline-first persistence ────────────────────────────────────────
//  Data is stored in IndexedDB on the device.  On the first visit it
//  fetches from Firestore over the network; on every visit after that
//  it serves instantly from the local cache while syncing in the
//  background.  This is the single biggest speed gain for mobile.
export const db = initializeFirestore(_app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()   // safe to open multiple tabs
    })
});
