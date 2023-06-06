// Este es el punto de entrada de tu aplicacion

import { Home } from "./components/home.js";
import { Register } from "./components/register.js";
import { Login } from "./components/login.js";

const rootDiv = document.getElementById("root");

const routes = {
  "/": Home,
  "/register": Register,
  "/login": Login,
};

//qué hace exactamente onNavigate?
export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname](onNavigate)); //nodo que corresponde al path? () para que funcione? renderizaarlo
};

//estudiar qué hace onpopstate
window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname](onNavigate));
};
rootDiv.appendChild(routes[window.location.pathname](onNavigate));

// const component = routes[window.location.pathname];
// rootDiv.appendChild(component());

//comportamiento SPA -> rutas
