// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD2FrZ_NowdlOiJA0oTnllvhP7PoibglRE',
  authDomain: 'flora-social-network.firebaseapp.com',
  projectId: 'flora-social-network',
  storageBucket: 'flora-social-network.appspot.com',
  messagingSenderId: '545001359061',
  appId: '1:545001359061:web:633e604d178d6c13ed445c',
  measurementId: 'G-ZHZL825TFH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
