// Este es el punto de entrada de tu aplicacion

import { Home } from './components/home.js';
import { Register } from './components/register.js';
import { Login } from './components/login.js';
import { Timeline } from './components/timeline.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/timeline': Timeline,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname](onNavigate));
};
// nodo que corresponde al path? () para renderizaarlo

// estudiar qué hace onpopstate
window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname](onNavigate));
};
rootDiv.appendChild(routes[window.location.pathname](onNavigate));

// comportamiento SPA -> rutas

// onnavigate cambia la ruta -> ese es el comportamiento de SPA

// onNavigate, la función, es para enrutar el enlace

// INVESTIGAR
// pathname -> propiedad que da el nombre de la ruta
// pushState -> método que permite navegar entre vistas
// onpopstate -> propiedad para procesar eventos popstate de la ventana.
// window.location -> window.location es una especie de appenchild,
// que muestra info. de la ubicación actual de documento ?
// qué hace "while"
// firstChild
// removeChild
// appendChild
