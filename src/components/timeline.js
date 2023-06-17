import { crearPost, guardarTodosLosPost } from '../lib';

export const Timeline = (onNavigate) => {
  // Div que almacena todo-------------------------------------
  const postDiv = document.createElement('div');
  postDiv.className = 'login-register-div ';

  // titulo ------------------------------------------------------
  const titleFloraTimeline = document.createElement('header');
  titleFloraTimeline.textContent = 'Flora';
  titleFloraTimeline.className = 'title-flora';

  // almacena el text AREA ------------------------------------------------------
  const articlePost = document.createElement('article');
  articlePost.className = 'login-register-div ';

  // NOMBRE DE USUARIO ------------------------------------------------------
  const nameUser = document.createElement('h5');
  nameUser.className = 'logo-flora';

  // TEXT AREA -------------------------------------------------------------
  const textArea = document.createElement('textarea');
  textArea.name = 'textarea';
  textArea.rows = '10';
  textArea.cols = '50';
  textArea.className = 'inpPost';
  textArea.id = 'inpPost';
  textArea.placeholder = 'Escribe aquí...';

  // BOTON CANCELAR ------------------------------------------------------
  const btnCancelPost = document.createElement('button');
  btnCancelPost.className = 'button';
  btnCancelPost.textContent = 'Cancelar';

  // BOTON PUBLICAR ------------------------------------------------------
  const newPost = document.createElement('button');
  newPost.className = 'button';
  newPost.id = 'new-post';
  newPost.textContent = 'Publicar';

  // ERROR DE CAMPO VACIO ANTES DE PUBLICAR ------------------------------------------------------
  const errorTextoVacio = document.createElement('h4');
  errorTextoVacio.textContent = '';
  errorTextoVacio.setAttribute('class', 'error-message');

  // DIVS DE POST REALIZADOS ------------------------------------------------------
  const postsContainer = document.createElement('div');
  postsContainer.className = 'posts-container';

  // VOLVER A HOME ------------------------------------------------------
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';

  postDiv.appendChild(titleFloraTimeline);
  articlePost.appendChild(nameUser);
  articlePost.appendChild(textArea);
  articlePost.appendChild(newPost);
  articlePost.appendChild(btnCancelPost);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(errorTextoVacio);
  articlePost.appendChild(postsContainer);
  postDiv.appendChild(buttonHome);

  // EVENTO BOTON CANCELAR POST ------------------------------------------------------
  btnCancelPost.addEventListener('click', () => onNavigate('/timeline'));

  // EVENTO BOTON IR A  HOME ------------------------------------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

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
        .then(() => guardarTodosLosPost())
        .then((posts) => {
          posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.innerHTML = post;
            postElement.className = 'divPost';
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
