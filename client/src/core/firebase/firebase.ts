import { initializeApp } from "firebase/app";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRE_BASE_MESSAGIN_SENDER_ID,
  appId: import.meta.env.VITE_FIRE_BASE_APP_ID,
};


// Initialize firebase
const app = initializeApp(firebaseConfig);

// Initialize GoogleAuth and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);

// Google Auth
export async function signInWithGoogle()  {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  const user = {
    name : res.user.displayName,
    email : res.user.email,
    password: res.user.uid,
  }
  
  return user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  const user = {
    email : res.user.email,
    password: res.user.uid,
  }
  
  return user;
}

// Query Firestore

export async function getTasksFromDatabase(uid: string) : Promise<[]|undefined> {
  const userDoc = doc(firestore, `users/${uid}`);
    const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data().tasks;
  } else {
    console.log("No such document!");
    return undefined;
  }
}