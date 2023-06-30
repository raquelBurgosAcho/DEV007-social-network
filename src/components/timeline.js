import { auth } from '../firebase';
import {
  crearPost,
  mostrarTodosLosPost,
  eliminarPost,
  toLike,
  // toDislike,
  toEdit,
} from '../lib';

export const Timeline = (onNavigate) => {
  const user = auth.currentUser;

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
  nameUser.className = 'usuariopublicacion';
  // Función para actualizar el contenido de nameUser cuando se inicia sesión
  const updateNameUser = (usuario) => {
    nameUser.textContent = `Hola ${usuario.email}`;
  };
  // Observar cambios en el estado de autenticación
  auth.onAuthStateChanged((users) => {
    updateNameUser(users);
  });

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

  // EVENTO BOTON IR A  HOME
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // APENDIZAR LO PRINCIPAL DEL TIMELINE
  postDiv.appendChild(titleFloraTimeline);
  postDiv.appendChild(articlePost);
  articlePost.appendChild(nameUser);
  articlePost.appendChild(textArea);
  articlePost.appendChild(newPost);
  articlePost.appendChild(errorTextoVacio);
  postDiv.appendChild(postsContainer);
  postDiv.appendChild(buttonHome);

  // EVENTO BOTON PARA CREAR UNA PUBLICACION------------------------------------------------------
  newPost.addEventListener('click', async () => {
    const contenidoPost = textArea.value;

    if (contenidoPost === '') {
      errorTextoVacio.textContent = 'Por favor ingresa tu comentario.';
      errorTextoVacio.style.display = 'block';
    } else {
      errorTextoVacio.style.display = 'none';
      textArea.value = '';

      try {
        await crearPost(contenidoPost);
      } catch (error) {
        console.log('Error al crear el post:', error);
      }
    }
  });

  // Enlistar posts---------------------------------------------------------------------
  mostrarTodosLosPost((querySnapshot) => {
    postsContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      // console.log(post);

      //  // Crear elementos de la publicación
      const postEnlistados = document.createElement('div');
      postEnlistados.className = 'divPost';

      const article = document.createElement('article');
      article.className = 'articlePost';
      article.id = 'articlePost';

      const usuarioPublicacion = document.createElement('p');
      usuarioPublicacion.className = 'usuariopublicacion';
      usuarioPublicacion.textContent = `${post.usuario}`;

      const usuarioIcono = document.createElement('img');
      usuarioIcono.className = 'iconoUsuario';
      usuarioIcono.src = './img/usuarioicono.png';

      const contenidoElement = document.createElement('p');
      contenidoElement.textContent = post.contenido;

      const bottonDiv = document.createElement('div');
      bottonDiv.className = 'bottonDiv';

          // -------- Evento dar like ------------
          const btnsLike = document.createElement('button');
          btnsLike.className = 'btnLike';
          btnsLike.setAttribute('btnLikes', post.id);
      const likeCount = document.createElement('p');
      likeCount.className = 'contadorlike';
      likeCount.textContent = post.likes.length;

      const btnsLike = document.createElement('button');
      btnsLike.className = 'btnLike';
      btnsLike.setAttribute('btnLikes', doc.id);

      const like = document.createElement('img');
      like.className = 'like';
      like.src = './img/empty-heart-icon.png';

      // EVENTO BOTON LIKE---------------------------------------------------
      btnsLike.addEventListener('click', async () => {
        const postId = btnsLike.getAttribute('btnLikes');
        await toLike(postId);

        // Incrementar el contador de likes y actualizar el contenido
        const currentLikes = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${currentLikes + 1}`;

        // Cambiar la imagen del corazón al hacer clic
        like.src = './img/full-heart-icon.png';
      });

          // const buttonLike = btnsLike.querySelector('.btnLikes');
          // buttonLike.forEach((user) => {
          //   btnsLike.addEventListener('click', async () => {
          //     // e.preventDefault();
          //     const postId = btnsLike.getAttribute('btnLikes');
          //     const userLike = auth.currentUser.email;
          //     // await toLike(postId, userLike);

          //     if (buttonLike.includes(currentUser.email)) {
          //       await toLike(postId, userLike);
          //       like.src = './img/full-heart-icon.png';
          //     } else {
          //       await toDislike(postId, userLike);
          //       like.src = './img/empty-heart-icon.png';
          //     }
          //   });
          // });

          // -------- Evento editar post ------------
          const botonEditar = document.createElement('button');
          botonEditar.className = 'btnEdit';
          botonEditar.textContent = 'Editar';

      // EVENTO PARA EL BOTON DE EDITAR
      botonEditar.addEventListener('click', () => {
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
                await toEdit(doc.id, nuevoContenido);
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

          // -------- Evento eliminar post ------------
          const botonEliminar = document.createElement('button');
          botonEliminar.className = 'btnDelete';
          botonEliminar.textContent = 'Eliminar';
      // BOTON ELIMINAR-------------------------------------------------------------------
      // Código para mostrar el botón de eliminar y su evento

      const botonEliminar = document.createElement('button');
      botonEliminar.className = 'btnDelete';
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.style.display = 'none'; // Ocultar el botón inicialmente

      // Aquí agregamos la condición para mostrar el botón solo al autor de la publicación
      if (auth.currentUser && post.usuario === auth.currentUser.email) {
        // Mostrar el botón solo si el usuario actual es el autor de la publicación
        botonEliminar.style.display = 'inline-block';
      }

      botonEliminar.addEventListener('click', async () => {
        try {
          await eliminarPost(doc.id);
          postEnlistados.remove();
        } catch (error) {
          console.log('Error al eliminar el post:', error);
        }
      });

      // Agregar los elementos de la publicación al contenedor
      bottonDiv.appendChild(btnsLike);
      btnsLike.appendChild(likeCount);
      btnsLike.appendChild(like);
      article.appendChild(usuarioIcono);
      article.appendChild(usuarioPublicacion);
      article.appendChild(contenidoElement);
      article.appendChild(bottonDiv);
      article.appendChild(botonEditar);
      article.appendChild(botonEliminar);

      postEnlistados.appendChild(article);
      postsContainer.appendChild(postEnlistados);
    });
  });

  return postDiv;
};
