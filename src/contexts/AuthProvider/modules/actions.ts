/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosRequest from '../../../services/axios/AxiosRequest';
import { LOGIN_SUCCESS } from './types';

// funcao q vai ser chamada no componente

export const efetuarLogin = async (dispatch: any, email: string, password: string) => {

    try {
        const fazerLogin = await AxiosRequest.post('/auth', {
            email: email,
            password: password
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: fazerLogin.data.token
        });

        return fazerLogin;

    } catch (error) {
        console.log(error);
    }

};