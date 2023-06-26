import { QuerySnapshot } from 'firebase/firestore';
import {
} from '../lib';

export const Timeline = (onNavigate) => {
  const containerTimeline = document.createElement('section');
  containerTimeline.className = 'container-timeline';
  const postHtml = `<header>
 <div class="header-timeline">
  <h1 class="title-flora">Flora</h1>
 </div>
 <div class="log-out">
    <button class="button" id="cerrarSesion">Cerrar sesión</button>
  </div>
</header>
<!-- Text area -->
 <section class="text-area-create-post">
 <textarea class="input-data" placeholder="Escribe aquí..."></textarea>
 <button class="button" id="publicar">Publicar</button> 
   
   <!-- Publicaciones -->
   <div class="posts-container" id="posts-container">
       <!-- posts desplegados -->
  </div>
      
</main>
<!-- Barra  -->
<div class="nav">
  <i class="fa-solid fa-user iconsColor"></i>
 
  <div class="buscar">
  <input type="text" placeholder="Buscar" required>
  <div class ="btn">
    <i class="fa-solid fa-magnifying-glass iconsColor"></i>
  </div>
</div>
  <i class="fa-solid fa-pen-to-square iconsColor"></i>
</div>
`;

  containerTimeline.innerHTML = postHtml;
};

// para agregar después del eventListener del botón de publicar
// e.preventDefault(); */
