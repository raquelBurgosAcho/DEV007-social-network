/* eslint-disable max-len */
import { iniciarSesionConUsuarioYContraseña, logInGoogle } from '../lib';

export const Login = (onNavigate) => {
  const loginDiv = document.createElement('div');
  loginDiv.setAttribute('class', 'login-register-div');

  const titleIS = document.createElement('h2');
  titleIS.textContent = ' Iniciar sesión ';
  titleIS.setAttribute('class', 'titles');
  const errorHome = document.createElement('h5');
  errorHome.className = 'errorHome';
  errorHome.id = 'errorHome';
  errorHome.style.display = 'none';
  const formLogin = document.createElement('form');
  formLogin.className = 'formLogin';
  formLogin.id = 'formLogin';

  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Ingresa tu Email';
  inputEmail.setAttribute('class', 'input-data');
  inputEmail.setAttribute('id', 'input-email');

  const inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Ingresa tu contraseña';
  inputPassword.type = 'password';
  inputPassword.setAttribute('class', 'input-data');
  inputPassword.setAttribute('id', 'input-password');

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.setAttribute('class', 'button');

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.setAttribute('class', 'button-google');

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';
  buttonHome.setAttribute('class', 'button');

  const errorLogIn = document.createElement('h4');
  errorLogIn.textContent = '';
  errorLogIn.setAttribute('class', 'error-message');

  const welcomeMessage = document.createElement('h4');
  welcomeMessage.setAttribute('class', 'error-message');

  // boton para volver a home--------------------------------------------------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // boton para iniciar sesion--------------------------------------------------------------------
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    iniciarSesionConUsuarioYContraseña(inputEmail.value, inputPassword.value)
      .then((credentials) => {
        const user = credentials.user.uid;
        localStorage.setItem('idUser', user);
        onNavigate('/timeline');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          errorLogIn.textContent = 'Contraseña incorrecta. Verifica tu contraseña e intenta nuevamente.';
          errorLogIn.style.display = 'block';
        } else if (error.code === 'auth/invalid-email') {
          errorLogIn.textContent = 'El correo electrónico proporcionado no es válido.';
          errorLogIn.style.display = 'block';
        } else if (error.code === 'auth/user-not-found') {
          errorLogIn.textContent = 'El usuario no fue encontrado. Verifica tu correo y contraseña.';
          errorLogIn.style.display = 'block';
        } else {
          errorLogIn.textContent = 'Ha ocurrido un error en el inicio de sesión. Por favor, intenta nuevamente.';
          errorLogIn.style.display = 'block';
        }
      });
    alert('¡Has iniciado sesión correctamente!');
  });
  // Inicia sesión con Google
  buttonGoogle.addEventListener('click', () => {
    logInGoogle()
      .then(() => {
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/popup-closed-by-user') {
          errorHome.style.display = 'block';
          errorHome.textContent = 'Something went wrong.';
        }
      });
  });

  loginDiv.appendChild(titleIS);
  loginDiv.appendChild(inputEmail);
  loginDiv.appendChild(inputPassword);
  loginDiv.appendChild(errorHome);
  loginDiv.appendChild(formLogin);
  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(buttonGoogle);
  loginDiv.appendChild(buttonHome);
  loginDiv.appendChild(errorLogIn);

  return loginDiv;
};