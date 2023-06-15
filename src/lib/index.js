import {
  addDoc,
  collection,
  setDoc,
  doc,
} from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth, db, db2 } from '../firebase';

export const crearPost = (text) => {
  addDoc(collection(db, 'posts'), {
    contenido: text,
  });
};
// identificador unico de usuario
// Guarda colección de usuarios en Firestore
const saveUser = (displayName, email, clave, uid) => {
  setDoc(doc(db2, 'users', uid), {
    displayName,
    email,
    clave,
    uid,
  });
};
// Registra y crea el usuario con email y contraseña
// eslint-disable-next-line
export const crearUsuarioConCorreoYContraseña = ( email, clave, displayName ) => { 
  return createUserWithEmailAndPassword(auth, email, clave)
    .then((userCredentials) => {
      const user = userCredentials.user;
      saveUser(displayName, email, clave, user.uid);
      return user;
    });
};

// Iniciar sesión
export const iniciarSesionConUsuarioYContraseña = (inputCorreo, inputContraseña) =>
signInWithEmailAndPassword(auth, inputCorreo, inputContraseña);

export const iniciarSesionConGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return { user, token };
    });
};
