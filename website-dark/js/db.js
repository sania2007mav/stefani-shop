// db.js — чтение каталога из Cloud Firestore (облегчённая версия SDK)
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore-lite.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchProducts() {
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map(d => d.data()).sort((a, b) => a.id - b.id);
}
