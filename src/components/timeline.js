import { auth } from '../firebase';
import {
  crearPost,
  guardarTodosLosPost,
  eliminarPost,
  toLike,
  toEdit,
} from '../lib';

export const Timeline = (onNavigate) => {
  const postDiv = document.createElement('div');
  postDiv.className = 'login-register-div';

  const titleFloraTimeline = document.createElement('header');
  titleFloraTimeline.textContent = 'Flora';
  titleFloraTimeline.className = 'title-flora';

  // almacena el text AREA ------------------------------------------------------
  const articlePost = document.createElement('article');
  articlePost.className = 'login-register-div';

  // NOMBRE DE USUARIO ------------------------------------------------------
  const nameUser = document.createElement('h5');
  nameUser.className = 'logo-flora';
  nameUser.textContent = '';

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
  errorTextoVacio.className = 'error-message';

  // DIVS DE POST REALIZADOS ------------------------------------------------------
  const postsContainer = document.createElement('div');
  postsContainer.className = 'posts-container';

  // VOLVER A HOME ------------------------------------------------------
  const buttonHome = document.createElement('button');
  buttonHome.className = 'button-logout';
  buttonHome.textContent = 'Cerrar sesión';

  postDiv.appendChild(titleFloraTimeline);
  articlePost.appendChild(nameUser);
  articlePost.appendChild(textArea);
  articlePost.appendChild(newPost);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(errorTextoVacio);
  articlePost.appendChild(postsContainer);
  postDiv.appendChild(buttonHome);

  // EVENTO BOTON IR A  HOME ------------------------------------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

  newPost.addEventListener('click', async () => {
    const user = auth.currentUser;
    const contenidoPost = textArea.value;

    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario.';
      errorTextoVacio.style.display = 'block';
    } else {
      errorTextoVacio.style.display = 'none';
      textArea.value = '';

      try {
        await crearPost(contenidoPost);
        const posts = await guardarTodosLosPost();
        postsContainer.innerHTML = '';

        posts.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.className = 'divPost';

          const article = document.createElement('article');
          article.className = 'articlePost';
          article.id = 'articlePost';

          const contenidoElement = document.createElement('p');
          contenidoElement.textContent = post.contenido;

          const nombreUsuarioElement = document.createElement('span');
          nombreUsuarioElement.textContent = post.nombreUsuario;
          nombreUsuarioElement.className = 'nombreUsuario';

          const fotoUsuarioElement = document.createElement('img');
          fotoUsuarioElement.className = 'fotoUsuario';
          if (post.fotoUsuario) {
            fotoUsuarioElement.src = post.fotoUsuario;
          } else {
            // En caso de que no haya una foto de usuario, usar una imagen ;)
            fotoUsuarioElement.src = './img/user.png';
          }

          const bottonDiv = document.createElement('div');
          bottonDiv.className = 'bottonDiv';

          const btnsLike = document.createElement('button');
          btnsLike.className = 'btnLike';
          btnsLike.setAttribute('btnLikes', post.id);

          const like = document.createElement('img');
          like.className = 'like';
          like.src = './img/empty-heart-icon.png';

          btnsLike.addEventListener('click', async () => {
            const postId = btnsLike.getAttribute('btnLikes');
            await toLike(postId);
          });

          const botonEditar = document.createElement('button');
          botonEditar.className = 'btnEdit';
          botonEditar.textContent = 'Editar';

          botonEditar.addEventListener('click', () => {
            const user = auth.currentUser;
            if (user && post.usuario === user.email) {
              const textAreaEdit = document.createElement('textarea');
              textAreaEdit.className = 'inpPost';
              textAreaEdit.value = contenidoElement.textContent;
              textAreaEdit.placeholder = 'Escribe aquí...';

              const btnGuardar = document.createElement('button');
              btnGuardar.className = 'btnSave';
              btnGuardar.textContent = 'Guardar';

              const btnCancelar = document.createElement('button');
              btnCancelar.className = 'btnCancel';
              btnCancelar.textContent = 'Cancelar';

              const editContainer = document.createElement('div');
              editContainer.className = 'editContainer';
              editContainer.appendChild(textAreaEdit);
              editContainer.appendChild(btnGuardar);
              editContainer.appendChild(btnCancelar);

              article.replaceChild(editContainer, contenidoElement);

              btnGuardar.addEventListener('click', async () => {
                const nuevoContenido = textAreaEdit.value;
                if (nuevoContenido) {
                  try {
                    await toEdit(post.id, nuevoContenido);
                    contenidoElement.textContent = nuevoContenido;
                    article.replaceChild(contenidoElement, editContainer);
                    console.log('El post se editó correctamente');
                  } catch (error) {
                    console.log('Error al editar el post:', error);
                  }
                }
              });

              btnCancelar.addEventListener('click', () => {
                article.replaceChild(contenidoElement, editContainer);
              });
            }
          });

          const botonEliminar = document.createElement('button');
          botonEliminar.className = 'btnDelete';
          botonEliminar.textContent = 'Eliminar';

          botonEliminar.addEventListener('click', async () => {
            try {
              await eliminarPost(post.id);
              postElement.remove();
            } catch (error) {
              console.log('Error al eliminar el post:', error);
            }
          });

          bottonDiv.appendChild(btnsLike);
          btnsLike.appendChild(like);
          article.appendChild(nombreUsuarioElement);
          article.appendChild(contenidoElement);
          article.appendChild(bottonDiv);
          article.appendChild(botonEditar);
          article.appendChild(botonEliminar);
          article.appendChild(fotoUsuarioElement);

          postElement.appendChild(article);
          postsContainer.appendChild(postElement);
        });
      } catch (error) {
        console.log('Error al crear el post:', error);
      }
    }
  });

  return postDiv;
};
