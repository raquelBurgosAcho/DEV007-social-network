import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const titleR = document.createElement('h2');
  const registerDiv = document.createElement('div');
  registerDiv.className = 'login-register-div';
  const buttonHome = document.createElement('button');
  buttonHome.className = 'button';
  const errorRegister = document.createElement('h4');

  titleR.textContent = 'Registrarse';
  titleR.className = 'titles';

  errorRegister.className = 'errorMessage';
  errorRegister.textContent = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';

  const formRegister = document.createElement('form');
  formRegister.id = 'formRegister';
  formRegister.className = 'login-register-div';

  const nameRegister = document.createElement('input');
  nameRegister.type = 'text';
  nameRegister.placeholder = '  Nombre de Usuario';
  nameRegister.id = 'name';
  nameRegister.className = 'input-data';

  const emailRegister = document.createElement('input');
  emailRegister.type = 'email';
  emailRegister.placeholder = '  Email';
  emailRegister.id = 'email';
  emailRegister.className = 'input-data';

  const claveRegister = document.createElement('input');
  claveRegister.type = 'password';
  claveRegister.placeholder = '  Contraseña';
  claveRegister.id = 'password';
  claveRegister.className = 'input-data';

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrar';
  buttonRegister.className = 'button';

  buttonHome.textContent = 'Regresar al Home';

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.className = 'button-google';

  // const registerName = HomeDiv.querySelector('#name');

  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const registerEmail = registerDiv.querySelector('#email');
    const registerClave = registerDiv.querySelector('#password');
    // console.log(registerEmail.value, registerClave.value);
    crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value);
    onNavigate('/timeline');
  });

  registerDiv.appendChild(titleR);
  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);
  registerDiv.appendChild(nameRegister);
  registerDiv.appendChild(emailRegister);
  registerDiv.appendChild(claveRegister);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonGoogle);
  registerDiv.appendChild(buttonHome);
  return registerDiv;
};

// import { crearUsuarioConCorreoYContraseña } from '../lib';

// export const Register = (onNavigate) => {
//   const HomeDiv = document.createElement('div');
//   HomeDiv.textContent = 'Bienvenida al registro';
//   const buttonHome = document.createElement('button');

//   buttonHome.textContent = 'Regresar al Home';

//   buttonHome.addEventListener('click', () => onNavigate('/')); // renderiza a home
//   HomeDiv.appendChild(buttonHome);

//   return HomeDiv;
// };

// inputEmail.setAttribute('id', 'input-email');
// inputPassword.setAttribute('id', 'input-password');

// const inputCorreo = loginDiv.querySelector('#input-email');
// const inputContraseña = loginDiv.querySelector('#input-password');

// buttonLogin.addEventListener('click', (e) => {
//   e.preventDefault();
//   crearUsuarioConCorreoYContraseña(inputCorreo.value, inputContraseña.value);
// });

// correo invalido
// registerUser(email,password).then(() => {
//   onNavigate('/muro');
//   console.log('¡Bienvenido!');
// }).catch((error) => {
//   const errorCode = error.code;
//   if (errorCode) {
//     if (errorCode === 'auth/invalid-email') {
//       console.log('Correo inválido.');
// }
// }
