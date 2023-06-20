import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebase';

export const crearUsuarioConCorreoYContraseña = async (email, contraseña) => {
  await createUserWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConUsuarioYContraseña = async (email, contraseña) => {
  await signInWithEmailAndPassword(auth, email, contraseña);
};

export const iniciarSesionConGoogle = async () => {
  await signInWithPopup(auth, provider);
};

export const crearPost = async (texto) => {
  await addDoc(collection(db, 'posts'), {
    contenido: texto,
  });
};

export const guardarTodosLosPost = async () => {
  // realizar consulta a la coleccion y alamcenarla en snapshot
  const snapshot = await getDocs(collection(db, 'posts'));
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
// import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,
// signInWithPopup } from 'firebase/auth';
// import { auth, db, db2 } from '../firebase';

// export const crearPost = (text) => {
//   addDoc(collection(db, 'posts'), {
//     contenido: text,
//   });
// };
// // // identificador unico de usuario
// // // Guarda colección de usuarios en Firestore
// const saveUser = (displayName, email, clave, uid) => {
//   setDoc(doc(db2, 'users', uid), {
//     displayName,
//     email,
//     clave,
//     uid,
//   });
// };
// // // Registra y crea el usuario con email y contraseña
// // // eslint-disable-next-line
// export const crearUsuarioConCorreoYContraseña = ( email, clave, displayName ) => {
//   return createUserWithEmailAndPassword(auth, email, clave)
//     .then((userCredentials) => {
//       const user = userCredentials.user;
//       saveUser(displayName, email, clave, user.uid);
//       return user;
//     });
// };
