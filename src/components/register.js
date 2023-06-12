import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Register = (onNavigate) => {
  const registerDiv = document.createElement('div');
  registerDiv.textContent = 'Bienvenida al registro';
  const buttonHome = document.createElement('button');

  const errorRegister = document.createElement('h4');
  errorRegister.className = 'errorMessage';
  errorRegister.textContent = 'errorMessage';
  errorRegister.style.display = 'none';
  errorRegister.id = 'errorRegister';

  const formRegister = document.createElement('form');
  formRegister.textContent = 'Ingresa los datos con los que deseas iniciar sesión';
  formRegister.id = 'formRegister';

  const nameRegister = document.createElement('input');
  nameRegister.type = 'text';
  nameRegister.placeholder = 'Nombre de Usuario';
  nameRegister.id = 'name';

  const emailRegister = document.createElement('input');
  emailRegister.type = 'email';
  emailRegister.placeholder = 'Email';
  emailRegister.id = 'email';

  const claveRegister = document.createElement('input');
  claveRegister.type = 'password';
  claveRegister.placeholder = 'Contraseña';
  claveRegister.id = 'password';

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrar';

  buttonHome.textContent = 'Regresar al Home';
  registerDiv.setAttribute('class', 'logindiv');
  formRegister.appendChild(buttonHome);
  formRegister.appendChild(nameRegister);
  formRegister.appendChild(emailRegister);
  formRegister.appendChild(claveRegister);
  formRegister.appendChild(buttonRegister);

  registerDiv.appendChild(errorRegister);
  registerDiv.appendChild(formRegister);

  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const registerEmail = registerDiv.querySelector('#email');
    const registerClave = registerDiv.querySelector('#password');

    crearUsuarioConCorreoYContraseña(registerEmail.value, registerClave.value)
      .then(() => {
        onNavigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (errorCode === 'auth/network-request-failed') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Los campos no pueden estar vacíos.';
        } else if (errorCode === 'auth/invalid-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email inválido.';
        } else if (errorCode === 'auth/missing-email') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'El campo de email no puede estar vacío.';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'Email ya está en uso.';
        } else if (errorCode === 'auth/internal-error') {
          errorRegister.style.display = 'block';
          errorRegister.textContent = 'El campo de contraseña no puede estar vacío.';
        }
        return error;
      });
  });

  return registerDiv;
};
