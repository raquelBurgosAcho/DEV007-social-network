import { QuerySnapshot } from 'firebase/firestore';
import {
  // crearPost,
  // guardarTodosLosPost,
  // eliminarPost,
  // toDislike,
  // toLike,
} from '../lib';

export const Timeline = (onNavigate) => {
  const timelineDiv = document.createElement('div');
  timelineDiv.className = 'container-timeline';
  // --> esto es para asignarle caracteristicas al contenedor flex ppal

  timelineDiv.innerHTML += `
  <header class='title-flora'Flora>
   <div class='new-post-container'>
    <textarea class='new-post-container-textarea'></textarea>
    <button class='button'>Publicar</button>
   </div>
  <section class='posts'>
  </section>
  `;

QuerySnapshot.forEach((doc) => {
    const postContent = doc.data(); // aquí guardamos la data como objetos
    timelineDiv.innerHTML += `
  <div>
    <p>${postContent.name}</p>
    <p>${postContent.posts}</p>
     <button class='btn-edit' data-id='${doc.id}'>Editar</button>
  </div>
 `;
  });

  timelineDiv.innerHTML;

  const btnsEdit = timelineDiv.querySelectroAll('.btn-edit')
  btnsEdit.forEach(btn => {
    console.log(btn)
  })

  return timelineDiv;
};

// para agregar después del eventListener del botón de publicar
// e.preventDefault();
