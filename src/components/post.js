/* eslint-disable eol-last */
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { crearPost } from '../lib';

export const Post = (onNavigate) => {
  // Div que almacena todo
  const postDiv = document.createElement('div');
  postDiv.className = 'login-register-div';

  // título
  const titleFloraTimeline = document.createElement('header');
  titleFloraTimeline.textContent = 'Flora';
  titleFloraTimeline.className = 'title-flora';

  // contenedor del formulario de publicación
  const articlePost = document.createElement('article');
  articlePost.className = 'login-register-div';
  const userImg = document.createElement('img');
  userImg.className = 'userImg';

  // nombre de usuario
  const nameUser = document.createElement('h5');
  nameUser.className = 'nameUser';

  // área de texto
  const textArea = document.createElement('textarea');
  textArea.name = 'textarea';
  textArea.rows = '10';
  textArea.cols = '50';
  textArea.className = 'inpPost';
  textArea.id = 'inpPost';
  textArea.placeholder = 'Escribe aquí...';

  const btnCancelPost = document.createElement('button');
  btnCancelPost.className = 'btnCancelPost';
  btnCancelPost.textContent = 'CANCEL';

  // BOTON PUBLICAR
  const newPost = document.createElement('button');
  newPost.className = 'button';
  newPost.id = 'newPost';
  newPost.textContent = 'Publicar';

  // botón Volver a Home
  const buttonHome = document.createElement('button');
  buttonHome.className = 'button-logout';
  buttonHome.textContent = 'Cerrar sesión';

  postDiv.appendChild(titleFloraTimeline);
  articlePost.appendChild(textArea);
  articlePost.appendChild(userImg);
  articlePost.appendChild(newPost);
  articlePost.appendChild(btnCancelPost);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(buttonHome);

  // EVENTO BOTON IR A HOME
  buttonHome.addEventListener('click', () => onNavigate('/'));
  btnCancelPost.addEventListener('click', () => onNavigate('/timeline'));

  // BOTON PUBLICAR
  const user = auth.currentUser;
  if (user !== null) {
    user.providerData.forEach(async (profile) => {
      const photo = profile.photoURL;
      userImg.src = photo;
      const name = profile.displayName;
      nameUser.textContent = name;
      if (photo === null) {
        userImg.src = './img/user.png';
      }
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const nameF = docSnap.data().displayName;
        nameUser.textContent = nameF;

        newPost.addEventListener('click', (e) => {
          e.preventDefault();
          crearPost(textArea.value, docSnap.data().displayName)
            .then(() => {
              onNavigate('/timeline');
            })
            .catch((error) => {
              const errorCode = error.code;
              return errorCode;
            });
        });
      }
    });
  }

  return postDiv;
};