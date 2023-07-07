import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import
{
  addDoc,
  collection,
  orderBy, query,
  onSnapshot,
} from 'firebase/firestore';
import { auth } from '../src/firebase';
// import { auth } from '../src/firebase';

// import { auth } from '../src/app/firebase';
import
{
  iniciarSesionConUsuarioYContraseña,
  crearUsuarioConCorreoYContraseña,
  iniciarSesionConGoogle,
  crearPost,
  mostrarTodosLosPost,
} from '../src/lib';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/firebase.js', () => ({
  auth: {
    currentUser: {
    },

    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn(),
  },
  db: {
    collection: jest.fn(),
    addDoc: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    onSnapshot: jest.fn(),
  },
}));

describe('crearUsuarioConCorreoYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof crearUsuarioConCorreoYContraseña).toBe('function');
  });
});

describe('iniciarSesionConUsuarioYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciarSesionConUsuarioYContraseña).toBe('function');
  });
  it('Debe devolver un objeto', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({});
    const response = await iniciarSesionConUsuarioYContraseña('email@example.com', '123456');
    expect(typeof response).toBe('object');
  });

  it('Debería llamar a la función signInWithEmailAndPassword cuando es ejecutada', async () => {
    await iniciarSesionConUsuarioYContraseña('email@example.com', '123456');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  // este no nos pasa, porque no lee el objeto user de la línea 30 (y creemos que la 27 tampoco)
  it('Debería devolver un objeto con el correo electrónico del usuario', async () => {
    const user = { email: 'email@example.com' };
    signInWithEmailAndPassword.mockResolvedValueOnce({ user });
    const response = await iniciarSesionConUsuarioYContraseña('email@example.com', '123456');
    expect(response.user.email).toBe('email@example.com');
  });
});
describe('iniciarSesionConGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof iniciarSesionConGoogle).toBe('function');
  });

  it('debería llamar a la función signInWithPopup con el provider correcto', async () => {
    const mockGoogleAuthProvider = new GoogleAuthProvider();
    auth.GoogleAuthProvider.mockReturnValueOnce(mockGoogleAuthProvider);

    await iniciarSesionConGoogle();

    expect(signInWithPopup).toHaveBeenCalledWith(auth, mockGoogleAuthProvider);
  });
});

describe('crearPost', () => {
  it('Es una función', () => {
    expect(typeof crearPost).toBe('function');
  });
  it('Deberia llamar a la funcion addDoc', async () => {
    await crearPost();
    expect(addDoc).toHaveBeenCalled();
  });
  it('debería crear un nuevo post en la base de datos', async () => {
    const texto = 'Este es un nuevo post';
    await expect(crearPost(texto)).resolves.toBeUndefined();
  });
});
describe('mostrarTodosLosPost', () => {
  it('debería llamar a la función callback con el querySnapshot', () => {
    const collectionMock = jest.fn();
    collection.mockImplementationOnce(collectionMock);

    const orderByMock = jest.fn();
    orderBy.mockImplementationOnce(orderByMock);

    const queryMock = jest.fn();
    query.mockImplementationOnce(queryMock);

    const onSnapshotMock = jest.fn();
    onSnapshot.mockImplementationOnce(onSnapshotMock);

    const callback = jest.fn();
    mostrarTodosLosPost(callback);
    expect(collectionMock).toHaveBeenCalled();
    expect(orderByMock).toBeCalled();
    expect(queryMock).toHaveBeenCalled();
    expect(onSnapshotMock).toHaveBeenCalled();
  });
});
