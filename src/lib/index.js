import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  createUserWithEmailAndPassword(auth, email, contraseña);
};

export const crearPost = (text) => {
  addDoc(collection(db, 'posts'), {
    contenido: text,
  });
};
