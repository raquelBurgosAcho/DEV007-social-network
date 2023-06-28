// En este archivo están todas las funciones principales del proyecto
import {
  addDoc, collection,
  deleteDoc, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, query, orderBy,
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
    fecha: new Date(),
    emailUsuario: auth.currentUser.email,
    likes: [],
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
  }));
  return posts;
};

export const eliminarPost = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

export const toLike = (id, uid) => {
  updateDoc(doc(db, 'posts', id), {
    likes: arrayUnion(uid),
  });
};

export const toDislike = (id, uid) => {
  updateDoc(doc(db, 'posts', id), {
    likes: arrayRemove(uid),
  });
};

// export const toEdit = () =>
