/* eslint-disable max-len */
import { iniciarSesionConUsuarioYContraseña, logInGoogle } from '../lib';

export const Login = (onNavigate) => {
  const homeSection = document.createElement('section');
  homeSection.id = 'homeSection';

  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.id = 'logo';
  logo.src = './img/floralogo.png';

  const errorHome = document.createElement('h5');
  errorHome.className = 'errorHome';
  errorHome.id = 'errorHome';
  errorHome.style.display = 'none';
  // Crea formulario de iniciar sesión
  const formLogin = document.createElement('form');
  formLogin.className = 'formLogin';
  formLogin.id = 'formLogin';
  const inpEmail = document.createElement('input');
  inpEmail.className = 'form';
  inpEmail.id = 'email';
  inpEmail.type = 'email';
  inpEmail.placeholder = 'Email';
  inpEmail.setAttribute('autocomplete', 'email');
  const inpPassword = document.createElement('input');
  inpPassword.className = 'form';
  inpPassword.id = 'password';
  inpPassword.placeholder = 'Password';
  inpPassword.type = 'password';
  inpPassword.setAttribute('autocomplete', 'current-password');

  const btnLogin = document.createElement('button');
  btnLogin.type = 'submit';
  btnLogin.className = 'btnLogin';
  btnLogin.id = 'btnLogin';
  btnLogin.textContent = 'LOGIN';

  formLogin.appendChild(inpEmail);
  formLogin.appendChild(inpPassword);
  formLogin.appendChild(btnLogin);

  const division = document.createElement('div');
  division.className = 'division';
  division.id = 'division';
  const line = document.createElement('hr');
  line.className = 'line';
  line.id = 'line';
  const or = document.createElement('p');
  or.textContent = 'or';
  or.className = 'or';
  const line2 = document.createElement('hr');
  line2.className = 'line2';
  line2.id = 'line2';

  division.appendChild(line);
  division.appendChild(or);
  division.appendChild(line2);

  const btnGoogle = document.createElement('img');
  btnGoogle.className = 'btnGoogle';
  btnGoogle.id = 'btnGoogle';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';
  buttonHome.setAttribute('class', 'button');

  homeSection.appendChild(logo);
  homeSection.appendChild(errorHome);
  homeSection.appendChild(formLogin);
  homeSection.appendChild(division);
  homeSection.appendChild(btnGoogle);
  homeSection.appendChild(buttonHome);

  // boton para volver a home--------------------------------------------------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // boton para iniciar sesion--------------------------------------------------------------------
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    iniciarSesionConUsuarioYContraseña(inpEmail.value, inpPassword.value)
      .then((credentials) => {
        const user = credentials.user.uid;
        localStorage.setItem('idUser', user);
        onNavigate('/timeline');
        alert('¡Has iniciado sesión correctamente!');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          errorHome.textContent = 'Contraseña incorrecta. Verifica tu contraseña e intenta nuevamente.';
          errorHome.style.display = 'block';
        } else if (error.code === 'auth/invalid-email') {
          errorHome.textContent = 'El correo electrónico proporcionado no es válido.';
          errorHome.style.display = 'block';
        } else if (error.code === 'auth/user-not-found') {
          errorHome.textContent = 'El usuario no fue encontrado. Verifica tu correo y contraseña.';
          errorHome.style.display = 'block';
        } else {
          errorHome.textContent = 'Ha ocurrido un error en el inicio de sesión. Por favor, intenta nuevamente.';
          errorHome.style.display = 'block';
        }
      });
  });

  // Inicia sesión con Google
  btnGoogle.addEventListener('click', () => {
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

  return homeSection;
};
