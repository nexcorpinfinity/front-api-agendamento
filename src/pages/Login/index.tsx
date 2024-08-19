import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from './styled';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { RootState } from '../../store/modules/rootReducer';
import { AppDispatch } from '../../store';
import Loading from '../../components/Loading';

import { Decoded } from '../../Routers/RotaPrivada';
import { jwtDecode } from 'jwt-decode';
import NavbarHome from '../../components/NavbarHome';

const Login: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const user: string | null = useSelector((state: RootState) => state.auth.token);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const prevPath = get(location, 'state.prevPath', '/');

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // let formErrors = false;

        // if (login.length < 3 || login.length > 20) {
        //     formErrors = true;
        //     toast.error('Login inválido');
        // }

        // if (password.length < 6 || password.length > 50) {
        //     formErrors = true;
        //     toast.error('Senha inválida');
        // }

        // if (formErrors) return;

        dispatch(actions.loginRequest({ email, password, prevPath }));
    };

    useEffect(() => {
        // se o usuario estiverr logado, redireciona para a home
        if (user) {
            const decoded: Decoded = jwtDecode(user);
            const permission = decoded.permission;

            if (isLoggedIn) {
                if (permission === 'admin') {
                    navigate('/admin');
                } else if (permission === 'costumer') {
                    navigate('/comercio');
                } else if (permission === 'user') {
                    navigate('/');
                }
            }
        }

    }, [isLoggedIn, user, navigate]);

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <>
            <NavbarHome />
            <Container $active={theme}>
                <Loading isLoading={isLoading} />
                <div>

                    <form onSubmit={handleSubmit}>
                        <h1>faça login </h1>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite a sua Senha"
                        />
                        <a href="#">Esqueceu a senha?</a>
                        <button>Entrar</button>
                    </form>

                </div>
            </Container>
        </>
    );
};

export default Login;
