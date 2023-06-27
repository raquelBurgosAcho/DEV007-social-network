// En este archivo están todas las funciones principales del proyecto
import {
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  serverTimestamp,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import {
  auth,
  db,
  db2,
  provider,
} from '../firebase.js';

// createUser

const saveUser = (displayName, email, password, date, uid) => {
  setDoc(doc(db2, 'users', uid), {
    displayName,
    email,
    password,
    uid,
    date,
  });
};

// Registra y crea el usuario con email y contraseña
// eslint-disable-next-line
export const crearUsuarioConCorreoYContraseña =  (email, password , displayName, date) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((usercredentials) => {
      const user = usercredentials.user;
      saveUser(displayName, email, password, date, user.uid);
      return user;
    });
};
// eslint-disable-next-line
export const iniciarSesionConUsuarioYContraseña = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Iniciar sesión con Google
// eslint-disable-next-line
export const logInGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return { user, token };
    });
};
// export const iniciarSesionConGoogle = async () => {
//  await signInWithPopup(auth, provider);
// };
export const likes = [];

// Crea la colección de posts
// eslint-disable-next-line
export const crearPost = (post, ownerPost) => {
  return addDoc(collection(db, 'post'), {
    likes,
    post,
    id: auth.currentUser.uid,
    ownerPost,
    createDate: serverTimestamp(),
    photo: auth.currentUser.photoURL,
  });
};
// Da instrucciones para mostrar los post
export const queryInstruction = () => query((collection(db, 'post')), orderBy('createDate', 'desc'));

export const deletePost = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

export const getPost = (id) => getDoc(doc(db, 'post', id));

// Actualiza la información de los post
export const updatePost = (id, editedPost) => updateDoc(doc(db, 'post', id), editedPost);

export const toLike = (id, uid) => {
  updateDoc(doc(db, 'post', id), {
    likes: arrayUnion(uid),
  });
};

export const toDislike = (id, uid) => {
  updateDoc(doc(db, 'post', id), {
    likes: arrayRemove(uid),
  });
};
export const signOutUser = () => signOut(auth);

export const onGetPosts = () => {
  const post = [];
  onSnapshot(queryInstruction(), (array) => {
    array.forEach((allPosts) => {
      post.push(allPosts.data());
    });
  });
  return post;
};

// export const toEdit = () =>
