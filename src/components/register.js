import { crearUsuarioConCorreoYContraseña } from '../lib';

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
  errorRegister.className = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';

  // Crea formulario de registro
  const formRegister = document.createElement('form');
  formRegister.id = 'formRegister';
  formRegister.className = 'login-register-div';

  const nameRegister = document.createElement('input');
  nameRegister.type = 'text';
  nameRegister.placeholder = 'Nombre de Usuario';
  nameRegister.id = 'name';
  nameRegister.className = 'form';
  nameRegister.required = true;

  const inpDate = document.createElement('input');
  inpDate.className = 'form';
  inpDate.id = 'inpDate';
  inpDate.type = 'date';
  inpDate.required = true;

  const emailRegister = document.createElement('input');
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email';
  emailRegister.id = 'email';
  emailRegister.className = 'form';
  emailRegister.required = true;

  const claveRegister = document.createElement('input');
  claveRegister.type = 'password';
  claveRegister.placeholder = 'Contraseña';
  claveRegister.id = 'password';
  claveRegister.className = 'form';
  claveRegister.required = true;

  const buttonRegister = document.createElement('button');
  buttonRegister.type = 'submit';
  buttonRegister.textContent = 'Registrar';
  buttonRegister.className = 'button';

  registerDiv.appendChild(titleR);
  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);
  registerDiv.appendChild(buttonHome);
  formRegister.appendChild(nameRegister);
  formRegister.appendChild(inpDate);
  formRegister.appendChild(emailRegister);
  formRegister.appendChild(claveRegister);
  formRegister.appendChild(buttonRegister);

  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    crearUsuarioConCorreoYContraseña(emailRegister.value, claveRegister.value, nameRegister.value, inpDate.value)
      .then(() => {
        onNavigate('/timeline');
        alert('¡Te has registrado correctamente!');
      })
      .catch((error) => {
        const errorCode = error.code;
        errorRegister.style.display = 'block';

        if (errorCode === 'auth/weak-password') {
          errorRegister.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (errorCode === 'auth/network-request-failed') {
          errorRegister.textContent = 'Los campos no deben estar vacíos.';
        } else if (errorCode === 'auth/invalid-email') {
          errorRegister.textContent = 'Correo inválido.';
        } else if (errorCode === 'auth/missing-email') {
          errorRegister.textContent = 'Ingresa tu correo electrónico.';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorRegister.textContent = 'Correo en uso.';
        } else if (errorCode === 'auth/invalid-argument') {
          console.log('Error interno:', error);
          errorRegister.textContent = 'Ingresa tu contraseña.';
        } else {
          console.error('Error:', error);
          errorRegister.textContent = 'Error desconocido. Inténtalo de nuevo más tarde.';
        }
      });
  });

  return registerDiv;
};
