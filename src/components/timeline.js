import { crearPost, guardarTodosLosPost } from '../lib';

export const Timeline = (onNavigate) => {
  const postDiv = document.createElement('div');
  postDiv.className = 'postDiv';

  // -------------------------------- Header --------------------------------
  const titleFloraTimeline = document.createElement('header');
  titleFloraTimeline.textContent = 'Flora';
  titleFloraTimeline.className = 'title-flora';

  // -------------------------------- Cerrar sesión --------------------------------
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Cerrar sesión';
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // -------------------------------- Contenedor secundario article --------------------------------
  const articlePost = document.createElement('article');
  articlePost.className = 'articleCreatePost';

  // const nameUser = document.createElement('h5');
  // nameUser.className = 'nameUser';

  // -------------------------------- Text Area --------------------------------
  const textArea = document.createElement('textarea');
  textArea.name = 'textarea';
  textArea.rows = '10';
  textArea.cols = '50';
  textArea.className = 'inp-post';
  textArea.id = 'inp-post';
  textArea.placeholder = 'Escribe aquí...';

  const errorTextoVacio = document.createElement('h4');
  errorTextoVacio.textContent = '';
  errorTextoVacio.setAttribute('class', 'error-message');

  // -------------------------------- Botones publicar / cancelar --------------------------------
  const btnPost = document.createElement('button');
  btnPost.className = 'button';
  btnPost.id = 'btn-post';
  btnPost.textContent = 'Publicar';

  const btnCancelPost = document.createElement('button');
  btnCancelPost.className = 'button';
  btnCancelPost.textContent = 'Cancelar';
  btnCancelPost.addEventListener('click', () => onNavigate('/timeline'));

  // -------------------------------- Contenedor despliegue posts --------------------------------
  const postsContainer = document.createElement('div');
  postsContainer.className = 'posts-container';

  // -------------------------------- appenChild --------------------------------

  postDiv.appendChild(titleFloraTimeline);
  // articlePost.appendChild(nameUser);
  articlePost.appendChild(textArea);
  articlePost.appendChild(btnCancelPost);
  articlePost.appendChild(btnPost);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(postsContainer);
  articlePost.appendChild(errorTextoVacio);
  postDiv.appendChild(buttonHome);

  // ---------------------- Evento y fuciones del botón publicar y textarea ---------------------

  articlePost.querySelector('#btn-post').addEventListener('click', () => {
    const contenidoPost = articlePost.querySelector('#inp-post').value;

    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario';
      errorTextoVacio.style.display = 'block';
    } else {
      errorTextoVacio.style.display = 'none';
      articlePost.querySelector('#inp-post').value = ''; // Limpiar el área de texto

      crearPost(contenidoPost)
        .then(() => {
          guardarTodosLosPost(); // Devolver la promesa para poder acceder a los posts
          console.log(guardarTodosLosPost());
        })
        .then((posts) => {
          posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.textContent = post.contenidoPost;
            postsContainer.appendChild(postElement);
          });
        });
    }
  });
  return postDiv;
};

// export const Timeline = (onNavigate) => {
//   const timelineDiv = document.createElement('div');
//   timelineDiv.className = 'container-timeline';
//   // --> esto es para asignarle caracteristicas al contenedor flex ppal

//   timelineDiv.innerHTML += `
//   <header class='title-flora'Flora>
//    <div class='new-post-container'>
//     <textarea class='new-post-container-textarea'></textarea>
//     <button class='button'>Publicar</button>
//    </div>
//   <section class='posts'>
//   </section>
//   `;
//   return timelineDiv;
// };
