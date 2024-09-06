import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, FormLogin } from './styled';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { RootState } from '../../store/modules/rootReducer';
import { AppDispatch } from '../../store';
import Loading from '../../components/Loading';

import { Decoded } from '../../Routers/RotaPrivada';
import { jwtDecode } from 'jwt-decode';
import { MdAlternateEmail } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi';

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

        document.title = 'Login';

        if (user) {
            const decoded: Decoded = jwtDecode(user);
            const permission = decoded.permission;

            if (isLoggedIn) {
                if (permission === 'admin') {
                    navigate('/admin');
                } else if (permission === 'costumer') {
                    navigate('/comercio');
                } else if (permission === 'user') {
                    // corrigir aqui quando o usuario apenas criar a conta e nao fazer login
                    navigate('/criar-conta');
                }
            }
        }

    }, [isLoggedIn, user, navigate]);

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <>
            <Container $active={theme}>
                <Loading isLoading={isLoading} />

                <FormLogin className="form" onSubmit={handleSubmit}>
                    <h1 className='fazer-login'>Faça login </h1>
                    <div className="flex-column">
                        <label>Email </label>
                    </div>
                    <div className="inputForm">
                        <MdAlternateEmail color='black' size={22} />
                        <input type="text" className="input" placeholder="Digite seu Email" value={email}
                            onChange={(e) => setEmail(e.target.value)} autoComplete='email'/>
                    </div>

                    <div className="flex-column">
                        <label>Senha</label>
                    </div>
                    <div className="inputForm">
                        <HiOutlineLockClosed color='black' size={22} />
                        <input type="password" className="input" placeholder="Digite Sua senha"  value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="button-submit">Entrar</button>
                    <a href="#">Esqueceu a senha?</a>
                    <p className="p">Não possui conta ?<Link to={'/criar-conta'}><span className="span">Criar Conta</span></Link></p>

                </FormLogin>
            </Container>
        </>
    );
};

export default Login;
