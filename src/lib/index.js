import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  return createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConUsuarioYContraseña = (email, contraseña) => {
  return signInWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const crearPost = (text) => {
  addDoc(collection(db, 'posts'), {
    contenido: text,
  });
};
