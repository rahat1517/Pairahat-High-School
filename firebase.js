

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = mobTbda27K
  authDomain: "public-result-system.firebaseapp.com",
  projectId: "public-result-system",
  storageBucket: "public-result-system.appspot.com",
  messagingSenderId: "326336877848",
  appId: "1:326336877848:web:b06f81b8be6c23f3c0ba6d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
