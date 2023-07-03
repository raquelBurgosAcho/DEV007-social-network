// importamos la funcion que vamos a testear
import { signInWithEmailAndPassword } from 'firebase/auth';
import { iniciarSesionConUsuarioYContraseña } from '../src/lib';

jest.mock('firebase/auth', () => (
  { signInWithEmailAndPassword: () => { } }
));

describe('iniciarSesionConUsuarioYContraseña', () => {
  it('debería ser una función', () => {
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
