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

  // ---------- Evento y llamado de fuciones del botón publicar y textarea --------------

  articlePost.querySelector('#btn-post').addEventListener('click', () => {
    const contenidoPost = articlePost.querySelector('#inp-post').value;

    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario';
      errorTextoVacio.style.display = 'block';
    } else {
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



//////////////////////////////////

import {
  crearPost,
  guardarTodosLosPost,
  eliminarPost,
  toDislike,
  toLike,
} from '../lib';

export const Timeline = (onNavigate, user) => {
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

  // BOTON PUBLICAR ------------------------------------------------------
  const newPost = document.createElement('button');
  newPost.className = 'button';
  newPost.id = 'newPost';
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
  buttonHome.textContent = 'Cerrar sesión';

  postDiv.appendChild(titleFloraTimeline);
  // articlePost.appendChild(nameUser);
  articlePost.appendChild(textArea);
  articlePost.appendChild(newPost);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(errorTextoVacio);
  articlePost.appendChild(postsContainer);
  postDiv.appendChild(buttonHome);

  // EVENTO BOTON IR A  HOME ------------------------------------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // ---------------------BOTON PUBLICAR---------------------------------------------------------

  newPost.addEventListener('click', () => {
    const contenidoPost = textArea.value;

    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario.';
      errorTextoVacio.style.display = 'block';
    } else {
      errorTextoVacio.style.display = 'none';
      textArea.value = '';

      crearPost(contenidoPost)
        .then(() => guardarTodosLosPost())
        .then((posts) => {
          postsContainer.innerHTML = ''; // Limpiar el contenedor de publicaciones antes de generar los nuevos elementos

          posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'divPost';

            const article = document.createElement('article');
            article.className = 'articlePost';
            article.id = 'articlePost';

            const contenidoElement = document.createElement('p');
            contenidoElement.textContent = post.contenido;

            const bottomDiv = document.createElement('div');
            bottomDiv.className = 'bottomDiv';

            const btnsLike = document.createElement('button');
            btnsLike.className = 'btnLike';
            btnsLike.setAttribute('btnLikes', post.id);
            btnsLike.id = 'btnsLikes';

            const like = document.createElement('img');
            like.className = 'like';
            like.src = './images/heart.png';

            const dislike = document.createElement('img');
            dislike.className = 'dislike';
            dislike.src = './images/full-heart.png';
            dislike.style.display = 'none';

            const btnsLikes = postsContainer.querySelectorAll('#btnLikes');
            btnsLikes.forEach((btn) => {
              btn.addEventListener('click', async () => {
                const getIdPost = btn.getAttribute('btnLikes');
                if (getIdPost === post.id) {
                  const document = await guardarTodosLosPost(posts.id);
                  const postear = document.data();
                  if (postear.likes.includes(user.uid)) {
                    toDislike(post.id, user.uid);
                  } else {
                    toLike(post.id, user.uid);
                  }
                }
              });
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'btnDelete';
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
              eliminarPost(post.id)
                .then(() => {
                  postElement.remove(); // Eliminar el elemento del DOM después de eliminar el post
                })
                .catch((error) => {
                  console.log('Error al eliminar el post:', error);
                });
            });

            bottomDiv.appendChild(btnsLike);
            btnsLike.appendChild(like);
            btnsLike.appendChild(dislike);
            bottomDiv.appendChild(botonEliminar);

            article.appendChild(contenidoElement);
            article.appendChild(bottomDiv);

            postElement.appendChild(article);
            postsContainer.appendChild(postElement);
          });
        })
        .catch((error) => {
          console.log('Error al crear el post:', error);
        });
    }
  });

  return postDiv;
};
