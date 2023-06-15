// import { crearPost } from '../lib';

// export const Timeline = (onNavigate) => {
//   const postDiv = document.createElement('div');
//   const buttonHome = document.createElement('button');
//   buttonHome.textContent = 'Volver a Home';
//   buttonHome.addEventListener('click', () => onNavigate('/'));

//   const buttonPost = document.createElement('button');
//   buttonPost.id = 'new-post';

//   buttonPost.textContent = 'Publicar';

//   // postDiv.querySelector('.new-post').addEventListener('click', () => { ------
//   //   const contenidoPost = postDiv.querySelector('.new-post').value; ------
//   //   crearPost(contenidoPost); ------
//   // }); ------

//   postDiv.appendChild(buttonHome);
//   postDiv.appendChild(buttonPost);
//   return postDiv;
// };

export const Timeline = (onNavigate) => {
  const timelineDiv = document.createElement('div');
  timelineDiv.className = 'container-timeline';
  // --> esto es para asignarle caracteristicas al contenedor flex ppal

  timelineDiv.innerHTML += `
  <header class='title-flora'Flora>
   <div class='new-post-container'>
    <textarea class='new-post-container-textarea'></textarea>
    <button class='new-post-container-button'>Publicar</button>
   </div>
  <section class='posts'>
  </section>
  `;
  return timelineDiv;
};
