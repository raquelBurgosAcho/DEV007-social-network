// funciones/métodos firebase-firestore
import { signInWithEmailAndPassword } from 'firebase/auth';
// funciones index.js
import {
  crearPost,
  crearUsuarioConCorreoYContraseña,
  eliminarPost,
  iniciarSesionConGoogle,
  iniciarSesionConUsuarioYContraseña,
  mostrarTodosLosPost,
  toDislike,
  toEdit,
  toLike,
} from '../src/lib';

// import { auth } from '../src/app/firebase';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('iniciarSesionConUsuarioYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciarSesionConUsuarioYContraseña).toBe('function');
  });

  it('Debería llamar a la función signInWithEmailAndPassword cuando es ejecutada', async () => {
    await iniciarSesionConUsuarioYContraseña('arturovh@hotmail.com', '1234567');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  // este no nos pasa, porque no lee el objeto user de la línea 30 (y creemos que la 27 tampoco)
  it('Debería devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'arturovh@hotmail.com' } });
    const response = await iniciarSesionConUsuarioYContraseña('arturovh@hotmail.com', '1234567');
    // console.log(response)
    expect(response.user.email).toBe('arturovh@hotmail.com');
  });
});

describe('iniciarSesionConGoogle', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciarSesionConGoogle).toBe('function');
  });

  // investigar cómo hacer test a la función de inicio de sesion con google
  // it('Debería llamar a la función sign signInWithPopup y provider cuando son ejecutadas',
  // async () => {
  //   await iniciarSesionConGoogle('posadalcarolina@gmail.com');
  // });
});

describe('crearPost', () => {
  it('Debería ser una función', () => {
    expect(typeof crearPost).toBe('function');
  });
});

describe('mostrarTodosLosPost', () => {
  it('Debería ser una función', () => {
    expect(typeof mostrarTodosLosPost).toBe('function');
  });
});

describe('toEdit', () => {
  it('Debería ser una función', () => {
    expect(typeof toEdit).toBe('function');
  });
});

describe('eliminarPost', () => {
  it('Debería ser una función', () => {
    expect(typeof eliminarPost).toBe('function');
  });
});

describe('toLike', () => {
  it('Debería ser una función', () => {
    expect(typeof toLike).toBe('function');
  });
});

describe('toDislike', () => {
  it('Debería ser una función', () => {
    expect(typeof toDislike).toBe('function');
  });
});

// beforeEach(() => {
//   signInWithEmailAndPassword.mockClear();
// });

describe('crearUsuarioConCorreoYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof crearUsuarioConCorreoYContraseña).toBe('function');
  });
});
