import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCmjHFlSjML-Q-Wc8ID3gl9ZbjI-GUQ0Os',
  authDomain: 'naderi-english.firebaseapp.com',
  projectId: 'naderi-english',
  storageBucket: 'naderi-english.firebasestorage.app',
  messagingSenderId: '1036429974084',
  appId: '1:1036429974084:web:be8d26d3501949b60d3a11',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
