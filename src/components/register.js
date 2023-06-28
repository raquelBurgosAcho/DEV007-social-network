import { crearUsuarioConCorreoYContraseña, iniciarSesionConGoogle } from '../lib';

export const Register = (onNavigate) => {
  const registerDiv = document.createElement('div');
  registerDiv.className = 'login-register-div';

  const buttonHome = document.createElement('button');
  buttonHome.className = 'button';
  buttonHome.textContent = 'Regresar al Home';

  const titleR = document.createElement('h2');
  titleR.textContent = 'Registrarse';
  titleR.className = 'titles';

  const errorRegister = document.createElement('h4');
  errorRegister.className = 'error-message';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';
  // crea formulario de registro
  const formRegister = document.createElement('form');
  formRegister.id = 'formRegister';
  formRegister.className = 'login-register-div';

  const nameRegister = document.createElement('input');
  nameRegister.type = 'text';
  nameRegister.placeholder = 'Nombre de Usuario';
  nameRegister.id = 'name';
  nameRegister.className = 'input-data';

  const emailRegister = document.createElement('input');
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email';
  emailRegister.id = 'email';
  emailRegister.className = 'input-data';

  const claveRegister = document.createElement('input');
  claveRegister.type = 'password';
  claveRegister.placeholder = 'Contraseña';
  claveRegister.id = 'password';
  claveRegister.className = 'input-data';

  const buttonRegister = document.createElement('button');
  buttonRegister.type = 'submit';
  buttonRegister.textContent = 'Registrar';
  buttonRegister.className = 'button';

  const buttonGoogle = document.createElement('button');
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.className = 'button-google';

  // const registerName = HomeDiv.querySelector('#name');

  registerDiv.appendChild(titleR);
  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);
  registerDiv.appendChild(buttonHome);
  formRegister.appendChild(nameRegister);
  formRegister.appendChild(emailRegister);
  formRegister.appendChild(claveRegister);
  formRegister.appendChild(buttonRegister);
  formRegister.appendChild(buttonGoogle);

  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(emailRegister.value, claveRegister.value, nameRegister.value)
      .then(() => {
        onNavigate('/timeline');
        alert(`¡ Hola ${emailRegister.value} te has registrado con éxito!`);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'La contraseña debe ser de al menos 6 caracteres.';
        } else if (errorCode === 'auth/network-request-failed.') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Los campos no deben estar vacíos.';
        } else if (errorCode === 'auth/invalid-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Correo inválido.';
        } else if (errorCode === 'auth/missing-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Ingresa tu correo electrónico.';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Correo en uso.';
        } else if (errorCode === 'auth/invalid-argument') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Ingresa tu contraseña.';
        }
        return error;
      });
  });

  buttonGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await iniciarSesionConGoogle();
      onNavigate('/timeline');
    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  });

  return registerDiv;
};
