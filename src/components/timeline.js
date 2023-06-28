import {
  crearPost,
  guardarTodosLosPost,
  eliminarPost,
  // toDislike,
  toLike,
} from '../lib';

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

  // BOTON PUBLICAR ------------------------------------------------------
  const newPost = document.createElement('button');
  newPost.className = 'button';
  newPost.id = 'newPost';
  newPost.textContent = 'Publicar';

  // ERROR DE CAMPO VACIO ANTES DE PUBLICAR -----------------------------------------------
  const errorTextoVacio = document.createElement('h4');
  errorTextoVacio.textContent = '';
  errorTextoVacio.setAttribute('class', 'error-message');

  // DIVS DE POST REALIZADOS ------------------------------------------------------
  const postsContainer = document.createElement('div');
  postsContainer.className = 'posts-container';

  // VOLVER A HOME ------------------------------------------------------
  const buttonHome = document.createElement('button');
  buttonHome.className = 'button-logout';
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

            const bottonDiv = document.createElement('div');
            bottonDiv.className = 'bottonDiv';

            const btnsLike = document.createElement('button');
            btnsLike.className = 'btnLike';
            btnsLike.setAttribute('btnLikes', post.id);
            // btnsLike.id = 'btnsLikes';

            const like = document.createElement('img');
            like.className = 'like';
            like.src = './images/empty-heart-icon.png';
            // like.style.display = 'none';

            const dislike = document.createElement('img');
            dislike.className = 'dislike';
            like.src = './images/full-heart-icon.png';
            // dislike.style.display = 'none';

            const btnsLikes = postsContainer.querySelectorAll('.btnLike');
            btnsLikes.forEach((btn) => {
              btn.addEventListener('click', async () => {
                // console.log(btn);
                // const getIdPost = btn.getAttribute('btnLikes');
                // console.log(getIdPost, post.id);
                console.log('ya vamos por el tu laiq');
                // if (getIdPost === post.id) {
                const document = await guardarTodosLosPost(posts.id);
                // const postear = document.data();
                // console.log(postear);
                console.log('hay viene el tulaik');
                // if (postear.likes.includes(user.uid)) {
                console.log('hola');
                //  toDislike(post.id, user.uid);
                // } else {
                console.log('soy el tulaik');
                toLike(post.id);
                // }
                // }
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

            bottonDiv.appendChild(btnsLike);
            btnsLike.appendChild(like);
            btnsLike.appendChild(dislike);
            bottonDiv.appendChild(botonEliminar);

            article.appendChild(contenidoElement);
            article.appendChild(bottonDiv);

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
