export const Login = (onNavigate) => {
  const loginDiv = document.createElement('div');
  const titleIS = document.createElement('h2');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const buttongoogle = document.createElement('button');
  const buttonHome = document.createElement('button');

  titleIS.textContent = ' Iniciar sesión ';
  inputEmail.placeholder = 'Ingresa tu Email';
  inputPassword.placeholder = 'Ingresa tu contraseña';
  inputPassword.type = 'password';
  buttonLogin.textContent = 'Iniciar sesión';
  buttongoogle.textContent = 'Continuar con Google';
  buttonHome.textContent = 'Volver a Home';

  loginDiv.setAttribute('class', 'login-register-div');
  inputEmail.setAttribute('class', 'input-data');
  inputPassword.setAttribute('class', 'input-data');
  titleIS.setAttribute('class', 'titles');
  buttonLogin.setAttribute('class', 'button');
  buttonHome.setAttribute('class', 'button');
  buttongoogle.setAttribute('class', 'button-google');

  // inputEmail.setAttribute('id', 'input-email');
  // inputPassword.setAttribute('id', 'input-password');

  // const inputCorreo = loginDiv.querySelector('#input-email');
  // const inputContraseña = loginDiv.querySelector('#input-password');*/

  buttonHome.addEventListener('click', () => onNavigate('/'));

  // buttonLogin.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   crearUsuarioConCorreoYContraseña(inputCorreo.value, inputContraseña.value);
  // });

  loginDiv.appendChild(titleIS);
  loginDiv.appendChild(inputEmail);
  loginDiv.appendChild(inputPassword);
  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(buttongoogle);
  loginDiv.appendChild(buttonHome);

  return loginDiv;
};
