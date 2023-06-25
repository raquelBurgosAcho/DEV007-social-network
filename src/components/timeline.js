import { onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase';
import {
  queryInstruction,
  deletePost,
  getPost,
  updatePost,
  toLike,
  toDislike,
} from '../lib';

import { modalDelete, modalEditPost } from './modal.js';

export const Timeline = (onNavigate) => {
  const divPost = document.createElement('div');
  divPost.className = 'divPost';
  const imgPost = document.createElement('img');
  imgPost.className = 'imgPost';
  imgPost.src = './img/imgPost.png';
  const txtPost = document.createElement('h5');
  txtPost.className = 'txtPost';
  txtPost.textContent = 'NEW POST';
  divPost.appendChild(imgPost);
  divPost.appendChild(txtPost);
  // Botón para ir a crear post
  txtPost.addEventListener('click', () => onNavigate('/post'));
  imgPost.addEventListener('click', () => onNavigate('/post'));
  // Obtenemos los post en tiempo real
  const containerPosts = document.createElement('section');
  onSnapshot(queryInstruction(), (array) => {
    while (containerPosts.firstChild) {
      containerPosts.removeChild(containerPosts.firstChild);
    }
    array.forEach((posts) => {
      const postLikes = posts.data().likes;
      // Contenedor de todos los post
      containerPosts.className = 'containerPosts';
      containerPosts.id = 'containerPosts';
      // Contenedor de post individual
      const articlePost = document.createElement('article');
      articlePost.className = 'articlePost';
      articlePost.id = 'articlePost';
      const imgUserPost = document.createElement('img');
      imgUserPost.className = 'imgUserPost';
      const nameUserPost = document.createElement('h5');
      nameUserPost.className = 'nameUserPost';
      const btnDelete = document.createElement('button');
      btnDelete.type = 'submit';
      btnDelete.className = 'btnDelete';
      btnDelete.id = 'btnDelete';
      btnDelete.setAttribute('btnDelete', posts.id);
      btnDelete.value = posts.id;
      btnDelete.style.display = 'none';
      const imgDelete = document.createElement('img');
      imgDelete.className = 'imgDelete';
      imgDelete.src = './img/delete-post.png';
      imgDelete.id = posts.id;
      btnDelete.appendChild(imgDelete);
      const btnEdit = document.createElement('button');
      btnEdit.className = 'btnEdit';
      btnEdit.id = 'btnEdit';
      btnEdit.style.display = 'none';
      btnEdit.setAttribute('btnEdit', posts.id);
      const imgEdit = document.createElement('img');
      imgEdit.src = './img/edit-post.png';
      imgEdit.className = 'imgEdit';
      btnEdit.appendChild(imgEdit);
      const textPost = document.createElement('p');
      textPost.className = 'textPost';
      const bottomDiv = document.createElement('div');
      bottomDiv.className = 'bottomDiv';
      const likesNum = document.createElement('p');
      likesNum.className = 'likesNum';
      const likeNum = postLikes.length;
      likesNum.textContent = `${likeNum} likes`;
      const btnLike = document.createElement('button');
      btnLike.className = 'btnLike';
      btnLike.setAttribute('btnLikes', posts.id);
      const like = document.createElement('img');
      like.className = 'like';
      like.src = './img/heart.png';
      const dislike = document.createElement('img');
      dislike.className = 'dislike';
      dislike.src = './img/full-heart.png';
      dislike.style.display = 'none';
      bottomDiv.appendChild(likesNum);
      btnLike.appendChild(like);
      btnLike.appendChild(dislike);
      bottomDiv.appendChild(btnLike);
      articlePost.appendChild(imgUserPost);
      articlePost.appendChild(nameUserPost);
      articlePost.appendChild(btnDelete);
      articlePost.appendChild(btnEdit);
      articlePost.appendChild(textPost);
      articlePost.appendChild(bottomDiv);
      containerPosts.append(articlePost);
      divPost.appendChild(containerPosts);
      const user = auth.currentUser;
      // Llenamos cada contendor de post
      if (posts.data().photo == null) {
        imgUserPost.src = './img/user.png';
      } else {
        imgUserPost.src = posts.data().photo;
      }
      nameUserPost.textContent = posts.data().ownerPost;
      textPost.textContent = posts.data().post;
      const owner = posts.data().id;
      const userAuth = auth.currentUser.uid;
      if (owner === userAuth) {
        btnDelete.style.display = 'flex';
        btnEdit.style.display = 'flex';
      }
      if (postLikes.includes(auth.currentUser.uid)) {
        like.style.display = 'none';
        dislike.style.display = 'flex';
      } else {
        like.style.display = 'flex';
        dislike.style.display = 'none';
      }
      // Botón de like y dislike
      const btnsLikes = containerPosts.querySelectorAll('.btnLike');
      btnsLikes.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const getIdPost = btn.getAttribute('btnLikes');
          if (getIdPost === posts.id) {
            const document = await getPost(posts.id);
            const post = document.data();
            if (post.likes.includes(user.uid)) {
              toDislike(posts.id, user.uid);
            } else {
              toLike(posts.id, user.uid);
            }
          }
        });
      });
      // Botón de eliminar post
      const btnsDelete = containerPosts.querySelectorAll('#btnDelete');
      const modalForDelete = modalDelete();
      articlePost.appendChild(modalForDelete);
      btnsDelete.forEach((btn) => {
        const getIdPostDelete = btn.getAttribute('btnDelete');
        if (getIdPostDelete === posts.id) {
          btn.addEventListener('click', () => {
            modalForDelete.style.display = 'block';
            const confirmBtnDelete = modalForDelete.querySelector('#btnAgree');
            confirmBtnDelete.addEventListener('click', () => {
              deletePost(posts.id);
              modalForDelete.style.display = 'none';
              containerPosts.append(modalForDelete);
            });
            const btnCancel = modalForDelete.querySelector('#btnCancel');
            btnCancel.addEventListener('click', () => {
              modalForDelete.style.display = 'none';
            });
          });
        }
      });
      // Botón de editar post
      const btnsEdit = containerPosts.querySelectorAll('#btnEdit');
      btnsEdit.forEach((btn) => {
        const getIdPost = btn.getAttribute('btnEdit');
        if (getIdPost === posts.id) {
          const modalToEdit = modalEditPost();
          modalToEdit.style.display = 'none';
          containerPosts.appendChild(modalToEdit);
          btn.addEventListener('click', async () => {
            articlePost.style.display = 'none';
            modalToEdit.style.display = 'grid';
            const document = await getPost(posts.id);
            const post = document.data();
            if (post.photo === null) {
              modalToEdit.querySelector('.userImgEdit').src = './img/user.png';
            } else {
              modalToEdit.querySelector('.userImgEdit').src = post.photo;
            }
            modalToEdit.querySelector('.nameUserEdit').textContent = post.ownerPost;
            modalToEdit.querySelector('.textAreaEdit').value = post.post;
            const btnConfirmEdit = modalToEdit.querySelector('.editPostConfirm');
            btnConfirmEdit.addEventListener('click', () => {
              const editPost = modalToEdit.querySelector('.textAreaEdit').value;
              updatePost(posts.id, { post: editPost });
            });
            const btnCanceledit = modalToEdit.querySelector('.btnCancelEdit');
            btnCanceledit.addEventListener('click', () => {
              articlePost.style.display = 'grid';
              modalToEdit.style.display = 'none';
            });
          });
        }
      });
    });
  });
  return divPost;
};
