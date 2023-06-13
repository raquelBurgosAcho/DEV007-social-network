import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConUsuarioYContraseña = (email, contraseña) => {
  signInWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConGoogle = (email, contraseña) => {
  signInWithPopup(auth, email, contraseña);
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const crearPost = (text) => {
  addDoc(collection(db, 'posts'), {
    contenido: text,
  });
};
