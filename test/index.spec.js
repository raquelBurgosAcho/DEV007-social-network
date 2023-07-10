// funciones o métodos Firebase Firestore
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { db, auth } from '../src/firebase.js';

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

// Mock de los métodos de Firebase Firestore
jest.mock('firebase/auth');
// jest.mock('firebase/firestore', () => ({
//   addDoc: jest.fn(),
//   collection: jest.fn(),
// }));
jest.mock('firebase/firestore');

jest.mock('../src/firebase.js', () => ({
  auth: {
    currentUser: {
    },

    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn(),
  },
}));

// -------- Función crear post -------- CAROLINA
describe('crearPost', () => {
  it('Debería ser una función', () => {
    expect(typeof crearPost).toBe('function');
  });

  it('Debería crear un nuevo post', async () => {
    // Mock de los métodos collection y addDoc
    const mockCollection = jest.fn();
    const mockAddDoc = jest.fn();
    collection.mockReturnValue(mockCollection);
    addDoc.mockReturnValue(mockAddDoc);

    // Mock de la data del usuario, del objeto
    const mockCurrentUser = {
      email: 'user@example.com',
    };
    const mockAuth = {
      currentUser: mockCurrentUser,
    };
    const mockFirebase = {
      auth: mockAuth,
    };

    // Llamar a la función crearPost
    const texto = 'Este es un post';
    await crearPost(texto, mockFirebase);

    // Comprobar que los métodos collection y addDoc han sido invocados con los argumentos correctos
    expect(collection).toHaveBeenCalled(db, 'posts');
    expect(addDoc).toHaveBeenCalled(mockCollection, {
      contenido: texto,
      // likes: [],
      usuario: mockCurrentUser.email,
      // nombreUsuario: mockCurrentUser.displayName,
      // fotoUsuario: mockCurrentUser.photoURL,
      // fecha: expect.any(Date),
    });
  });
});

// -------- Función crear usuario con correo y contraseña --------
describe('crearUsuarioConCorreoYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof crearUsuarioConCorreoYContraseña).toBe('function');
  });

  it('Debería devolver un objeto', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'arturovh@hotmail.com' } });
    const response = await crearUsuarioConCorreoYContraseña('arturovh@hotmail.com', '1234567');
    // console.log(response)
    expect(response.user.email).toBe('arturovh@hotmail.com');
  });
});

// -------- Función iniciar sesión con usuario y contraseña --------
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
    // console.log(response)
    expect(response.user.email).toBe('arturovh@hotmail.com');
  });
});

// -------- Función iniciar sesión con Google --------

describe('iniciarSesionConGoogle', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciarSesionConGoogle).toBe('function');
  });
  it('debería llamar a la función signInWithPopup con el provider correcto', async () => {
    const mockGoogleAuthProvider = new GoogleAuthProvider();
    auth.GoogleAuthProvider.mockReturnValueOnce(mockGoogleAuthProvider);

    await iniciarSesionConGoogle();

    expect(signInWithPopup).toHaveBeenCalledWith(auth, mockGoogleAuthProvider);
  });
});

// -------- Función crear post -------- CAROLINA

// -------- Función mostrar todos los posts --------
describe('mostrarTodosLosPost', () => {
  it('Debería ser una función', () => {
    expect(typeof mostrarTodosLosPost).toBe('function');
  });
});

// -------- Función editar posts -------- RAQUEL
describe('toEdit', () => {
  it('Debería ser una función', () => {
    expect(typeof toEdit).toBe('function');
  });
});

// -------- Función eliminar posts -------- CAROLINA
describe('eliminarPost', () => {
  it('Debería ser una función', () => {
    expect(typeof eliminarPost).toBe('function');
  });
});

// -------- Función like posts -------- CAROLINA
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

// -------- Función dislike posts --------
describe('toDislike', () => {
  it('Debería ser una función', () => {
    expect(typeof toDislike).toBe('function');
  });
});
