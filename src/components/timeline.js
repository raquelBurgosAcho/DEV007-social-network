import { QuerySnapshot, onSnapshot } from 'firebase/firestore';
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

  // --------------------------EVENTO IR A  HOME/CERRAR SESIÓN -------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // ------------------------------ CLICK AL BOTÓN PUBLICAR --------------------------------
  newPost.addEventListener('click', async () => {
    const contenidoPost = textArea.value;

    // --------------------------- VALIDACIÓN CAMPO VACÍO --------------------------
    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario.';
      errorTextoVacio.style.display = 'block';
    } else {
      errorTextoVacio.style.display = 'none';
      textArea.value = '';
      // --------------------------- TRY/CATCH --------------------------
      try {
        await crearPost(contenidoPost);
        // lamando la función de traer los posts, esto es suficiente para traerlos?
        const posts = await guardarTodosLosPost();
        // postsContainer.innerHTML = '';

        // ------------- uso querySnapshot ¿y onSnapshot? -----------
        // obtener referencia de la colección posts
        // const postsRef = db.collection('posts');

        // escuchar cambios en tiempo real utilizando onSnapshot
        posts.onSnapshot((QuerySnapshot) => {
          postsContainer.innerHTML = '';

          QuerySnapshot.forEach((doc) => {
            console.log(QuerySnapshot);
            const post = doc.data();

            // ---------------CREACIÓN ELEMENTOS DEL POST----------------
            const postElement = document.createElement('div');
            postElement.className = 'divPost';

            const article = document.createElement('article');
            article.className = 'articlePost';
            article.id = 'articlePost';

            const contenidoElement = document.createElement('p');
            contenidoElement.textContent = post.contenido;

            const bottonDiv = document.createElement('div');
            bottonDiv.className = 'bottonDiv';

            // ------------------------------CREACIÓN EVENTO LIKE ----------------------------------
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

            // -------------------------CREACIÓN EVENTO EDITAR ----------------------------------
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

            // ----------------------------CREACIÓN EVENTO ELIMINAR -------------------------------
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

            // ------------------------------APPENCHILD DE EVENTOS ------------------------------

            bottonDiv.appendChild(btnsLike);
            btnsLike.appendChild(like);
            article.appendChild(contenidoElement);
            article.appendChild(bottonDiv);
            article.appendChild(botonEditar);
            article.appendChild(botonEliminar);

            postElement.appendChild(article);
            postsContainer.appendChild(postElement);
          }); // cierra el for.Each ln 90
        });
        //
        //
        //
        //
        //
        //
        //
        // cierra el try ln 80, abre catch
      } catch (error) {
        console.log('Error al crear el post:', error);
      } // y cierra el catch
    } // cierra el else ln 76 de lo que debe pasar si el usuario ingresa un valor en el textarea
  }); // cierra addEventListener del botón de publicar newPost ln 69

  return postDiv;
}; // cierra toda la función Timeline
