import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const titleR = document.createElement('h2');
  const registerDiv = document.createElement('div');
  registerDiv.className = 'login-register-div';
  const buttonHome = document.createElement('button');
  buttonHome.className = 'button';
  const errorRegister = document.createElement('h4');

  titleR.textContent = 'Registrarse';
  titleR.className = 'titles';

  errorRegister.className = 'errorMessage';
  errorRegister.textContent = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';

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
  buttonRegister.textContent = 'Registrar';
  buttonRegister.className = 'button';

  buttonHome.textContent = 'Regresar al Home';

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.className = 'button-google';

  // const registerName = HomeDiv.querySelector('#name');

  registerDiv.appendChild(titleR);
  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);
  registerDiv.appendChild(nameRegister);
  registerDiv.appendChild(emailRegister);
  registerDiv.appendChild(claveRegister);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonGoogle);
  registerDiv.appendChild(buttonHome);

  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  buttonRegister.addEventListener('click', async (e) => {
    e.preventDefault();
    const registerEmail = registerDiv.querySelector('#email');
    const registerClave = registerDiv.querySelector('#password');
    // console.log(registerEmail.value, registerClave.value);
    // crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value);
    // onNavigate('/timeline');

    try {
      await crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value);
      onNavigate('/timeline');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/weak-password') {
        alert('La contraseña debe tener al menos 6 caracteres.');
      } else if (errorCode === 'auth/network-request-failed.') {
        alert('Los campos no pueden estar vacíos.');
      } else if (errorCode === 'auth/invalid-email') {
        alert('Email inválido.');
      } else if (errorCode === 'auth/missing-email') {
        alert('El campo de email no puede estar vacío.');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('Email ya está en uso.');
      } else if (errorCode === 'auth/internal-error') {
        alert('El campo de contraseña no puede estar vacío.');
      }
    }
  });

  return registerDiv;
};

//  try {
//   await crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value);
//   onNavigate('/timeline');
// } catch (error) {
//   const errorCode = error.code;
//   if (errorCode === 'auth/weak-password') {
//     errorRegister.style.display = 'block';
//     errorRegister.textContent = 'La contraseña debe tener al menos 6 caracteres.';
//   } else if (errorCode === 'auth/network-request-failed.') {
//     errorRegister.style.display = 'block';
//     errorRegister.textContent = 'Los campos no pueden estar vacíos.';
//   } else if (errorCode === 'auth/invalid-email') {
//     errorRegister.style.display = 'block';
//     errorRegister.textContent = 'Email inválido.';
//   } else if (errorCode === 'auth/missing-email') {
//     errorRegister.style.display = 'block';
//     errorRegister.textContent = 'El campo de email no puede estar vacío.';
//   } else if (errorCode === 'auth/email-already-in-use') {
//     errorRegister.style.display = 'block';
//     errorRegister.textContent = 'Email ya está en uso.';
//   } else if (errorCode === 'auth/internal-error') {
//     errorRegister.style.display = 'block';
//     errorRegister.textContent = 'El campo de contraseña no puede estar vacío.';
//   }
// }
// });

// return registerDiv;
// };
// correo invalido
// registerUser(email,password).then(() => {
//   onNavigate('/muro');
//   console.log('¡Bienvenido!');
// }).catch((error) => {
//   const errorCode = error.code;
//   if (errorCode) {
//     if (errorCode === 'auth/invalid-email') {
//       console.log('Correo inválido.');
