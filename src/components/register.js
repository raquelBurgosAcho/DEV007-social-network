import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const registerDiv = document.createElement('div');
  registerDiv.className = 'login-register-div';

  const buttonHome = document.createElement('button');
  buttonHome.className = 'button';
  buttonHome.textContent = 'Regresar al Home';

  const titleR = document.createElement('h2');
  titleR.textContent = 'Registrarse';
  titleR.className = 'titles';

  const errorRegister = document.createElement('h4');
  errorRegister.className = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';
  // crea formulario de registro
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
  buttonRegister.type = 'submit';
  buttonRegister.textContent = 'Registrar';
  buttonRegister.className = 'button';

  // const buttonGoogle = document.createElement('button');
  // buttonGoogle.textContent = 'Continuar con Google';
  // buttonGoogle.className = 'button-google';

  // const registerName = HomeDiv.querySelector('#name');

  registerDiv.appendChild(titleR);
  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);
  registerDiv.appendChild(buttonHome);
  // registerDiv.appendChild(nameRegister);
  // registerDiv.appendChild(emailRegister);
  // registerDiv.appendChild(claveRegister);
  // registerDiv.appendChild(buttonRegister);
  // registerDiv.appendChild(buttonGoogle);
  // registerDiv.appendChild(buttonHome);
  formRegister.appendChild(nameRegister);
  formRegister.appendChild(emailRegister);
  formRegister.appendChild(claveRegister);
  formRegister.appendChild(buttonRegister);

  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(emailRegister.value, claveRegister.value, nameRegister.value)
      .then(() => {
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'The password must be at least 6 characters.';
        } else if (errorCode === 'auth/network-request-failed.') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Fields cannot be empty.';
        } else if (errorCode === 'auth/invalid-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Invalid email.';
        } else if (errorCode === 'auth/missing-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email field cannot be empty.';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email already in use.';
        } else if (errorCode === 'auth/invalid-argument') {
          console.log('Error interno:', error);
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Password field cannot be empty.';
        }
        return error;
      });
  });
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
