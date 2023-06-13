import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConUsuarioYContraseña = (email, contraseña) => {
  signInWithEmailAndPassword(auth, email, contraseña);
};

export const crearPost = (text) => {
  addDoc(collection(db, 'posts'), {
    contenido: text,
  });
};
