/* eslint-disable eol-last */
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { crearPost } from '../lib/index.js';

export const Post = (onNavigate) => {
  // Div que almacena todo
  const postSection = document.createElement('section');
  postSection.className = 'postSection';
  const logoPost = document.createElement('img');
  logoPost.className = 'logoPost';
  logoPost.src = './img/logo.png';
  const articlePost = document.createElement('article');
  articlePost.className = 'articleCreatePost';
  const userImg = document.createElement('img');
  userImg.className = 'userImg';
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
  const btnCreatePost = document.createElement('button');
  btnCreatePost.className = 'btnCreatePost';
  btnCreatePost.id = 'btnCreatePost';
  btnCreatePost.textContent = 'POST';
  btnCreatePost.setAttribute('type', 'submit');
  articlePost.appendChild(userImg);
  articlePost.appendChild(nameUser);
  articlePost.appendChild(btnCancelPost);
  articlePost.appendChild(btnCreatePost);
  articlePost.appendChild(textArea);
  postSection.appendChild(logoPost);
  postSection.appendChild(articlePost);
  btnCancelPost.addEventListener('click', () => onNavigate('/timeline'));
  // Llena la información del usuario
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
      console.log('Valor de docRef:', docRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const nameF = docSnap.data().displayName;
        console.log('Valor de nameF:', nameF);
        nameUser.textContent = nameF;
        console.log('No se encontró el documento');

        btnCreatePost.addEventListener('click', (e) => {
          console.log('Clic en el botón POST');
          e.preventDefault();
          crearPost(textArea.value, docSnap.data().displayName)
            .then(() => {
              console.log('Texto del post:', textArea.value);
              console.log('Nombre del usuario:', docSnap.data().displayName);
              onNavigate('/timeline');
            })
            .catch((error) => {
              console.log('Error al crear el post:', error);
              const errorCode = error.code;
              return errorCode;
            });
        });
      }
    });
  }
  // Botón de crear post

  return postSection;
};