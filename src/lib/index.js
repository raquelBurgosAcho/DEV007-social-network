// En este archivo están todas las funciones principales del proyecto
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebase';

// eslint-disable-next-line max-len
export const crearUsuarioConCorreoYContraseña = (email, contraseña) => createUserWithEmailAndPassword(auth, email, contraseña);

// eslint-disable-next-line max-len
export const iniciarSesionConUsuarioYContraseña = async (email, contraseña) => signInWithEmailAndPassword(auth, email, contraseña);

export const iniciarSesionConGoogle = async () => {
  await signInWithPopup(auth, provider);
};

export const crearPost = async (texto) => {
  await addDoc(collection(db, 'posts'), {
    contenido: texto,
    likes: [],
    usuario: auth.currentUser.email,
    nombreUsuario: auth.currentUser.displayName,
    fotoUsuario: auth.currentUser.photoURL,
    fecha: new Date(),
  });
};

// onSnapshot!!!!!!
export const mostrarTodosLosPost = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('fecha', 'desc')), callback);

export const toEdit = async (id, nuevoContenido) => {
  await updateDoc(doc(db, 'posts', id), {
    contenido: nuevoContenido,
  });
};

export const eliminarPost = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

export const toLike = (id) => {
  const user = auth.currentUser;

  updateDoc(doc(db, 'posts', id), {
    likes: arrayUnion(user.email),
  });
};

export const toDislike = (id) => {
  const user = auth.currentUser;

  updateDoc(doc(db, 'posts', id), {
    likes: arrayRemove(user.email),
  });
};
