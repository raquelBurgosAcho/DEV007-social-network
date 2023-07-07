// En este archivo están todas las funciones principales del proyecto
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConUsuarioYContraseña = (email, contraseña) => {
  signInWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConGoogle = async () => {
  const provider = new GoogleAuthProvider();
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
