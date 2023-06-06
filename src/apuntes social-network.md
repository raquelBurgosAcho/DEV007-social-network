# apuntes social-network

------------------------------------------------CODIGO MAIN.JS------------------------------------------------

// Este es el punto de entrada de tu aplicacion

import { Home } from './components/Home.js';

// myFunction();

const routes = {
    '/': home,
    '/register': contact,
    '/login': about
    
};



//'/contact': contact,
    //'/about': about


------------------------------------------------CODIGO HTML------------------------------------------------


    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <!-- todo el comportamiento de js se ve reflejado en este nodo root -->

  <script type="module" src="main.js"></script>
</body>
</html>



<!-- <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script type="module" src="main.js"></script>
</body>
</html> -->


------------------------------------------------HOME JS ------------------------------------------------

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const buttonRegister = document.createElement('button');
    const buttonLogin = document.createElement('button');

    buttonRegister.textContent = 'Registrarse';
    buttonLogin.textContent = 'Iniciar sesión';

    HomeDiv.appendChild(buttonRegister);
    HomeDiv.appendChild(buttonLogin);

    return HomeDiv;
};



------------------------------------------------LOGIN JS ------------------------------------------------

export const Login = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Bienvenida al login';
    const buttonHome = document.createElement('button');

    buttonHome.textContent = 'Regresar al Home';

    HomeDiv.appendChild(buttonHome);

    return HomeDiv;
};


------------------------------------------------REGISTER JS ------------------------------------------------


export const Register = () => {
        const HomeDiv = document.createElement('div');
        HomeDiv.textContent = 'Bienvenida al registro';
        const buttonHome = document.createElement('button');
    
        buttonHome.textContent = 'Regresar';
    
        HomeDiv.appendChild(buttonHome);
    
        return HomeDiv;
    };



