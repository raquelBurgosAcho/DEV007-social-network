import { crearPost, guardarTodosLosPost } from '../lib';

export const Timeline = (onNavigate) => {
  const postDiv = document.createElement('div');
  postDiv.className = 'postDiv';

  const titleFloraTimeline = document.createElement('header');
  titleFloraTimeline.textContent = 'Flora';
  titleFloraTimeline.className = 'title-flora';

  const articlePost = document.createElement('article');
  articlePost.className = 'articleCreatePost';

  const nameUser = document.createElement('h5');
  nameUser.className = 'nameUser';

  const textArea = document.createElement('textarea');
  textArea.name = 'textarea';
  textArea.rows = '10';
  textArea.cols = '50';
  textArea.className = 'inpPost';
  textArea.id = 'inpPost';
  textArea.placeholder = 'Escribe aquí...';

  const btnCancelPost = document.createElement('button');
  btnCancelPost.className = 'button';
  btnCancelPost.textContent = 'Cancelar';

  const newPost = document.createElement('button');
  newPost.className = 'button';
  newPost.id = 'new-post';
  newPost.textContent = 'Publicar';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));

  const postsContainer = document.createElement('div');
  postsContainer.className = 'posts-container';

  const errorTextoVacio = document.createElement('h4');
  errorTextoVacio.textContent = '';
  errorTextoVacio.setAttribute('class', 'error-message');

  postDiv.appendChild(titleFloraTimeline);
  articlePost.appendChild(nameUser);
  articlePost.appendChild(textArea);
  articlePost.appendChild(btnCancelPost);
  articlePost.appendChild(newPost);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(postsContainer);
  articlePost.appendChild(errorTextoVacio);
  postDiv.appendChild(buttonHome);

  btnCancelPost.addEventListener('click', () => onNavigate('/timeline'));

  // ---------------------BOTON PUBLICAR---------------------------------------------------------

  articlePost.querySelector('#new-post').addEventListener('click', () => {
    const contenidoPost = articlePost.querySelector('#inpPost').value;

    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario';
      errorTextoVacio.style.display = 'block';
    } else {
      errorTextoVacio.style.display = 'none';
      articlePost.querySelector('#inpPost').value = ''; // Limpiar el área de texto

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
// -----------------------------------
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
