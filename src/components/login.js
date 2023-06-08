export const Login = (onNavigate) => {
  const LogInDiv = document.createElement('div');
  const titleIS = document.createElement ('h2');
  const parrafo = document.createElement ('p');
  const inputEmail = document.createElement ('input');
  const inputPassword = document.createElement ('input');
  const buttonLogin = document.createElement ('button');
  const buttonHome = document.createElement('button');
  
  titleIS.textContent = ' Iniciar sesión ';
  parrafo.textContent = ' Ingresa los datos con los que te has registrado ';
  inputEmail.placeholder ='Ingresa tu Email';
  inputPassword.placeholder ='Ingresa tu contraseña';
  inputPassword.type = 'password';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonHome.textContent = 'Volver a Home';
  

  inputEmail.setAttribute('class','inputEmail');
  


  buttonHome.addEventListener('click', () => onNavigate('/'));


  LogInDiv.appendChild (titleIS);
  LogInDiv.appendChild (parrafo);
  LogInDiv.appendChild (inputEmail);
  LogInDiv.appendChild (inputPassword);
  LogInDiv.appendChild (buttonLogin);
  LogInDiv.appendChild (buttonHome);

  return LogInDiv;
};
