import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Bienvenida al registro';
  const buttonHome = document.createElement('button');
  const errorRegister = document.createElement('h4');

  errorRegister.className = 'errorMessage';
  errorRegister.textContent = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';

  const formRegister = document.createElement('form');
  formRegister.textContent = 'Ingresa los datos con los que deseas iniciar sesión';
  formRegister.id = 'formRegister';

  const nameRegister = document.createElement('input');
  nameRegister.type = 'text';
  nameRegister.placeholder = 'Nombre de Usuario';

  const emailRegister = document.createElement('input');
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email';

  const claveRegister = document.createElement('input');
  claveRegister.type = 'password';
  claveRegister.placeholder = 'contraseña';

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Iniciar sesión';

  buttonHome.textContent = 'Regresar al Home';
  HomeDiv.setAttribute('class', 'logindiv');
  // nameRegister.setAttribute('class', 'input-name');
  emailRegister.setAttribute('class', 'input-correo');
  claveRegister.setAttribute('class', 'input-contraseña');

  // nameRegister.setAttribute('id', 'input-name'); //

  emailRegister.setAttribute('id', 'input-correo');
  claveRegister.setAttribute('id', 'input-contraseña');

  // const registerName = HomeDiv.querySelector('#input-name'); 
  const registerEmail = HomeDiv.querySelector('#input-correo');
  const registerClave = HomeDiv.querySelector('#input-contraseña');

  buttonHome.addEventListener('click', () => onNavigate('/')); // renderiza a home
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value);
  });
  HomeDiv.appendChild(buttonHome);
  HomeDiv.appendChild(errorRegister);
  HomeDiv.appendChild(formRegister);
  HomeDiv.appendChild(emailRegister);
  HomeDiv.appendChild(nameRegister);
  HomeDiv.appendChild(claveRegister);
  HomeDiv.appendChild(buttonRegister);

  return HomeDiv;
};
