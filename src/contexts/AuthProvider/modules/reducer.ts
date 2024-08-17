/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { LOGIN_SUCCESS } from './types';
import Cookies from 'js-cookie';

function salvarToken(token: string) {

    //remover do local storage antes
    // criar uma funcao de loggout para definir o estado como padrao

    Cookies.set('auth', `${token}`, { expires: 1 });

    // localStorage.clear();
    console.log('token recebido na fucao', token);
    // localStorage.setItem('state4', JSON.stringify(action));
}

export const reducer = (state: any, action: any) => {

    switch (action.type) {
        case LOGIN_SUCCESS: {
            console.log('recebendo da pagina de login', action.payload);

            const token = action.payload;

            console.log('token', token);

            salvarToken(token);

            return {
                ...state,
                isLogged: true,
                themeDark: true
            };
        }
    }
    console.log('SEM ACTION');

    return { ...state };
};