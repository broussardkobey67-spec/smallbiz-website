// Firebase lead capture for the contact form.
// The Firebase web apiKey is public by design — security is enforced by the
// Firestore rules (create-only on /leads, validated, no client reads).
//
// Firebase is loaded lazily (dynamic import on first submit) so window.sendLead
// is available immediately — no race where an early submit misses the backend.

const firebaseConfig = {
  apiKey: "AIzaSyAEKNL2xCNDDplnLROGUS53tKUf3ZG5e4M",
  authDomain: "gen-lang-client-0539533049.firebaseapp.com",
  projectId: "gen-lang-client-0539533049",
  storageBucket: "gen-lang-client-0539533049.firebasestorage.app",
  messagingSenderId: "1001184771195",
  appId: "1:1001184771195:web:be22d4679aa2856a62f6de",
};

const SDK = "https://www.gstatic.com/firebasejs/10.12.5";
let firestorePromise = null;

async function getFirestoreApi() {
  if (!firestorePromise) {
    firestorePromise = (async () => {
      const [{ initializeApp }, firestore] = await Promise.all([
        import(`${SDK}/firebase-app.js`),
        import(`${SDK}/firebase-firestore.js`),
      ]);
      const app = initializeApp(firebaseConfig);
      return { db: firestore.getFirestore(app), ...firestore };
    })();
  }
  return firestorePromise;
}

window.sendLead = async (payload) => {
  const { db, collection, addDoc, serverTimestamp } = await getFirestoreApi();
  await addDoc(collection(db, "leads"), {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || "",
    message: payload.message,
    source: "cedarstone-demo",
    createdAt: serverTimestamp(),
  });
};
