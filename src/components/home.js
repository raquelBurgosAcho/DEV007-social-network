export const Home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  const titleFlora = document.createElement('h1');
  const logoFlora = document.createElement('p');
  const imgFlora = document.createElement('img');
  imgFlora.src = './images/Floralogo.png';
  const buttonRegister = document.createElement('button');
  const buttonLogin = document.createElement('button');

  titleFlora.textContent = 'Flora';
  logoFlora.textContent = 'Aprende. Cultiva. Publica.';
  buttonRegister.textContent = 'Registrarse';
  buttonLogin.textContent = 'Iniciar sesión';

  HomeDiv.setAttribute('class', 'HomeDiv');
  titleFlora.setAttribute('class', 'titleFlora');
  logoFlora.setAttribute('class', 'logoFlora');
  imgFlora.setAttribute('class', 'containerImgHome');
  buttonRegister.setAttribute('class', 'button');
  buttonLogin.setAttribute('class', 'button');

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  HomeDiv.appendChild(titleFlora);
  HomeDiv.appendChild(logoFlora);
  HomeDiv.appendChild(imgFlora);
  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
