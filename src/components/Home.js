import { onNavigate } from "../main.js";

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const buttonRegister = document.createElement('button');
    const buttonLogin = document.createElement('button');

    buttonRegister.textContent = 'Registrarse';
    buttonLogin.textContent = 'Iniciar sesión';

    buttonRegister.addEventListener('click', () => onNavigate('/register'));
    buttonRegister.addEventListener('click', () => onNavigate('/login'));

    HomeDiv.appendChild(buttonRegister);
    HomeDiv.appendChild(buttonLogin);

    return HomeDiv;
};

//onNavigate, la función, es para enrutar el enlace