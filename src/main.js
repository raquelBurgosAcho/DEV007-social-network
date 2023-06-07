// Este es el punto de entrada de tu aplicacion

import { home } from './components/home.js';
import { register} from './components/resgister.js';
import { login} from './components/login.js';

const rootDiv = document.getElementById ('root');

const routes = {
    '/': home,
    '/': login,
    '/': register,
}