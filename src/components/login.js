export const Login = (onNavigate) => {
  const loginDiv = document.createElement('div');
  const titleIS = document.createElement('h2');
  const parrafo = document.createElement('p');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const buttongoogle = document.createElement('button');
  const buttonHome = document.createElement('button');

  titleIS.textContent = ' Iniciar sesión ';
  parrafo.textContent = ' Ingresa los datos con los que te has registrado ';
  inputEmail.placeholder = 'Ingresa tu Email';
  inputPassword.placeholder = 'Ingresa tu contraseña';
  inputPassword.type = 'password';
  buttonLogin.textContent = 'Iniciar sesión';
  buttongoogle.textContent = 'Continuar con Google';
  buttonHome.textContent = 'Volver a Home';

  loginDiv.setAttribute('class', 'logindiv');
  inputEmail.setAttribute('class', 'input-correo');
  inputPassword.setAttribute('class', 'input-contraseña');

  
  buttonHome.addEventListener('click', () => onNavigate('/'));

  /*buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(inputCorreo.value, inputContraseña.value);
  });*/

  loginDiv.appendChild(titleIS);
  loginDiv.appendChild(parrafo);
  loginDiv.appendChild(inputEmail);
  loginDiv.appendChild(inputPassword);
  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(buttongoogle);
  loginDiv.appendChild(buttonHome);

  return loginDiv;
};
