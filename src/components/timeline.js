import {
  crearPost,
  guardarTodosLosPost,
  eliminarPost,
  toDislike,
  toLike,
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
  return timelineDiv;
};
