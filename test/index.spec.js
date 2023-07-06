// funciones/métodos firebase-firestore
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import {
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

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
import { auth } from '../src/firebase.js';

// mock a la dependencia de firebase
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// ------------------------------------------------------------------------------------------------
describe('crearUsuarioConCorreoYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof crearUsuarioConCorreoYContraseña).toBe('function');
  });

  it('Debería llamar a la función crearUsuarioConCorreoYContraseña  cuando es ejecutada', async () => {
    await crearUsuarioConCorreoYContraseña('arturovh@hotmail.com', '1234567');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Debería devolver un objeto', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'arturovh@hotmail.com' } });
    const response = await crearUsuarioConCorreoYContraseña('arturovh@hotmail.com', '1234567');
    // console.log(response);
    expect(response.user.email).toBe('arturovh@hotmail.com');
  });
});
// ------------------------------------------------------------------------------------------------
describe('iniciarSesionConUsuarioYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciarSesionConUsuarioYContraseña).toBe('function');
  });

  it('Debería llamar a la función signInWithEmailAndPassword cuando es ejecutada', async () => {
    await iniciarSesionConUsuarioYContraseña('arturovh@hotmail.com', '1234567');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Debería devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'arturovh@hotmail.com' } });
    const response = await iniciarSesionConUsuarioYContraseña('arturovh@hotmail.com', '1234567');
    // console.log(response);
    expect(response.user.email).toBe('arturovh@hotmail.com');
  });
});
// ------------------------------------------------------------------------------------------------
describe('iniciarSesionConGoogle', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciarSesionConGoogle).toBe('function');
  });

  it('Deberia llamar a singInWithPopUp cuando es ejecutada', async () => {
    await iniciarSesionConGoogle(GoogleAuthProvider);
    expect(signInWithPopup).toHaveBeenCalled();
  });
});
// -----------------------------------------------------------------------------------------------
describe('crearPost', () => {
  it('Debería ser una función', () => {
    expect(typeof crearPost).toBe('function');
  });
});
// ----------------------------------------------------------------------------------------------
describe('mostrarTodosLosPost', () => {
  it('Debería ser una función', () => {
    expect(typeof mostrarTodosLosPost).toBe('function');
  });
});
// ----------------------------------------------------------------------------------------------
describe('toEdit', () => {
  it('Debería ser una función', () => {
    expect(typeof toEdit).toBe('function');
  });
});
// ----------------------------------------------------------------------------------------------
describe('eliminarPost', () => {
  it('Debería ser una función', () => {
    expect(typeof eliminarPost).toBe('function');
  });
});
// ------------------------------------------------------------------------------------------------
describe('toLike', () => {
  it('Debería ser una función', () => {
    expect(typeof toLike).toBe('function');
  });

  it('Debería llamar a updateDoc cuando es ejecutada', async () => {
    // Crear una función mockc para auth.currentUser
    const currentUserMock = jest.fn();
    auth.currentUser = currentUserMock;
    console.log(auth.currentUser);

    await toLike('12345', 'newLike');
    expect(updateDoc).toHaveBeenCalled();
  });

  it('debería llamar a arrayUnion', async () => {
    const currentUserMock = jest.fn();
    auth.currentUser = currentUserMock;

    const arrayUnionMock = jest.fn();
    arrayUnion.mockImplementationOnce(arrayUnionMock);

    await toLike();
    expect(arrayUnionMock).toHaveBeenCalled();
  });
});
// ------------------------------------------------------------------------------------------------
describe('toDislike', () => {
  it('Debería ser una función', () => {
    expect(typeof toDislike).toBe('function');
  });
});
