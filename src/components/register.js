import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const registerDiv = document.createElement('div');
  registerDiv.textContent = 'Bienvenida al registro';
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
  nameRegister.id = 'name';

  const emailRegister = document.createElement('input');
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email';
  emailRegister.id = 'email';

  const claveRegister = document.createElement('input');
  claveRegister.type = 'password';
  claveRegister.placeholder = 'Contraseña';
  claveRegister.id = 'password';

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrar';

  buttonHome.textContent = 'Regresar al Home';
  registerDiv.setAttribute('class', 'logindiv');

  // const registerName = HomeDiv.querySelector('#name');

  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const registerEmail = registerDiv.querySelector('#email');
    const registerClave = registerDiv.querySelector('#password');
    // console.log(registerEmail.value, registerClave.value);
    crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value);
  });

  registerDiv.appendChild(buttonHome);
  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);
  registerDiv.appendChild(nameRegister);
  registerDiv.appendChild(emailRegister);
  registerDiv.appendChild(claveRegister);
  registerDiv.appendChild(buttonRegister);

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
