// En este archivo están todas las funciones principales del proyecto
import { addDoc, collection, onSnapshot, doc } from 'firebase/firestore';
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
  });
};


export const guardarTodosLosPost = () => {
  const unsubscribe = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
}
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