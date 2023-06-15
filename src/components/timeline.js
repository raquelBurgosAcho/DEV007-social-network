// import { crearPost } from '../lib';

export const Timeline = (onNavigate) => {
  const postDiv = document.createElement('div');
  postDiv.className = 'postDiv';
  const logoPost = document.createElement('img');
  logoPost.className = 'logoPost';
  logoPost.src = './images/floralogo.png';
  const articlePost = document.createElement('article');
  articlePost.className = 'articleCreatePost';
  const userImg = document.createElement('img');
  userImg.className = 'userImg';
  const nameUser = document.createElement('h5');
  nameUser.className = 'nameUser';
  const textArea = document.createElement('textarea');
  textArea.name = 'textarea';
  textArea.rows = '10';
  textArea.cols = '50';
  textArea.className = 'inpPost';
  textArea.id = 'inpPost';
  textArea.placeholder = 'Que te gustaria compartir ?';
  const btnCancelPost = document.createElement('button');
  btnCancelPost.className = 'btnCancelPost';
  btnCancelPost.textContent = 'CANCELAR';
  const btnCreatePost = document.createElement('button');
  btnCreatePost.className = 'btnCreatePost';
  btnCreatePost.id = 'btnCreatePost';
  btnCreatePost.textContent = 'CREARPOST';
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  articlePost.appendChild(userImg);
  articlePost.appendChild(nameUser);
  articlePost.appendChild(btnCancelPost);
  articlePost.appendChild(btnCreatePost);
  articlePost.appendChild(textArea);
  postDiv.appendChild(logoPost);
  postDiv.appendChild(articlePost);
  postDiv.appendChild(buttonHome);
  btnCancelPost.addEventListener('click', () => onNavigate('/timeline'));

  // const buttonPost = document.createElement('button');
  // buttonPost.id = 'new-post';

  // buttonPost.textContent = 'Publicar';

  // postDiv.querySelector('.new-post').addEventListener('click', () => {
  //   const contenidoPost = postDiv.querySelector('.new-post').value;
  //   crearPost(contenidoPost);
  // });

  // postDiv.appendChild(buttonHome);
  // postDiv.appendChild(buttonPost);
  return postDiv;
};
