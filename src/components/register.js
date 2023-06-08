import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Bienvenida al registro';
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar al Home';

  buttonHome.addEventListener('click', () => onNavigate('/')); // renderiza a home
  HomeDiv.appendChild(buttonHome);

  return HomeDiv;
};

inputEmail.setAttribute('id', 'input-email');
inputPassword.setAttribute('id', 'input-password');

const inputCorreo = loginDiv.querySelector('#input-email');
const inputContraseña = loginDiv.querySelector('#input-password');

buttonLogin.addEventListener('click', (e) => {
  e.preventDefault();
  crearUsuarioConCorreoYContraseña(inputCorreo.value, inputContraseña.value);
});