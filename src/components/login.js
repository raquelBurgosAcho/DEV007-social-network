import { iniciarSesionConUsuarioYContraseña, iniciarSesionConGoogle } from '../lib';

export const Login = (onNavigate) => {
  const loginDiv = document.createElement('div');
  loginDiv.setAttribute('class', 'login-register-div');

  const titleIS = document.createElement('h2');
  titleIS.textContent = ' Iniciar sesión ';
  titleIS.setAttribute('class', 'titles');

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

  const buttongoogle = document.createElement('button');
  buttongoogle.textContent = 'Continuar con Google';
  buttongoogle.setAttribute('class', 'button-google');

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Volver a Home';
  buttonHome.setAttribute('class', 'button');

  const errorLogIn = document.createElement('h4');
  errorLogIn.textContent = '';
  errorLogIn.setAttribute('class', 'error-message');

  // boton para volver a home--------------------------------------------------------------------
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // boton para iniciar sesion--------------------------------------------------------------------
  buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const inputCorreo = loginDiv.querySelector('#input-email');
    const inputContraseña = loginDiv.querySelector('#input-password');

    try {
      if (inputCorreo.value === '' || inputContraseña.value === '') {
        errorLogIn.textContent = ('Por favor ingresa tu correo y contraseña');
        errorLogIn.style.display = 'block';
      } else {
        await iniciarSesionConUsuarioYContraseña(inputCorreo.value, inputContraseña.value);
        onNavigate('/timeline');
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        errorLogIn.textContent = ('Contraseña incorrecta. Verifica tu contraseña e intenta nuevamente.');
        errorLogIn.style.display = 'block';
      } else if (error.code === 'auth/invalid-email') {
        errorLogIn.textContent = ('El correo electrónico proporcionado no es válido');
        errorLogIn.style.display = 'block';
      } else if (error.code === 'auth/user-not-found') {
        errorLogIn.textContent = ('El usuario no fue encontrado. Verifica tu correo y contraseña.');
        errorLogIn.style.display = 'block';
      } else {
        errorLogIn.textContent = ('Ha ocurrido un error en el inicio de sesión. Por favor, intenta nuevamente.');
        errorLogIn.style.display = 'block';
      }
    }
  });
  // boton para iniciar sesion con GOOGLE---------------------------------------------------------
  buttongoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await iniciarSesionConGoogle();
      onNavigate('/timeline');
    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  });

  loginDiv.appendChild(titleIS);
  loginDiv.appendChild(inputEmail);
  loginDiv.appendChild(inputPassword);
  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(buttongoogle);
  loginDiv.appendChild(buttonHome);
  loginDiv.appendChild(errorLogIn);

  return loginDiv;
};