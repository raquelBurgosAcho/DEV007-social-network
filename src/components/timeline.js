// import { crearPost } from '../lib';

export const Timeline = (onNavigate) => {
  const postDiv = document.createElement('div');
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));

  const buttonPost = document.createElement('button');
  buttonPost.className = 'new-post';
  buttonPost.textContent = 'Publicar';

  /* postDiv.querySelector('.new-post').addEventListener('click', () => {
    const contenidoPost = postDiv.querySelector('.new-post').value;
    crearPost(contenidoPost);
  }); */

  postDiv.appendChild(buttonHome);
  postDiv.appendChild(buttonPost);
  return postDiv;
};
