// En este archivo están todas las funciones principales del proyecto
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // query,
  // onSnapshot,
  // orderBy,
} from 'firebase/firestore';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebase';

export const crearUsuarioConCorreoYContraseña = async (email, contraseña) => {
  await createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConUsuarioYContraseña = async (email, contraseña) => {
  await signInWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConGoogle = () => {
  signInWithPopup(auth, provider);
};

export const crearPost = async (texto) => {
  await addDoc(collection(db, 'posts'), {
    contenido: texto,
    likes: [],
    usuario: auth.currentUser.email,
    fecha: new Date(),
  });
};

export const guardarTodosLosPost = async () => {
  // realizar consulta a la coleccion y alamcenarla en snapshot
  const snapshot = await getDocs(collection(db, 'posts')); // cambiar por onSnapshot
  const posts = snapshot.docs.map((doc) => ({
    // iterar sobre cada documento y extraer el contenido de cada uno
    contenido: doc.data().contenido,
    // y el id elimina cada comentario
    id: doc.id,
    usuario: doc.data().usuario,
    likes: doc.data().likes,
  }));
  return posts;
};

// onSnapshot!!!!!!
// export const guardarTodosLosPost = (callback) => onSnapshot(query(collection(db, 'posts'),
// orderBy('postDate', 'asc')), callback);

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
  console.log('una persona de internet', user.email);
  console.log(' este es el id del post', id);
  updateDoc(doc(db, 'posts', id), {
    likes: arrayUnion(user.email),
  });
};

export const toDislike = (id) => {
  const user = auth.currentUser;
  console.log('una persona de internet', user);
  updateDoc(doc(db, 'posts', id), {
    likes: arrayRemove(user.email),
  });
};
