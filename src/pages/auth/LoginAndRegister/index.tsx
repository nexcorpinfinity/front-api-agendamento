// import { jwtDecode } from 'jwt-decode';
// import { get } from 'lodash';
import React, { useState } from 'react';
// import { HiOutlineLockClosed } from 'react-icons/hi';
// import { MdAlternateEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BlueBox, Container, Form, GreenBox, SwapButton } from './styled';

// import Loading from '../../components/Loading';
// import { Decoded } from '../../routers/PrivateRouter';
// import { AppDispatch } from '../../store';
// import * as actions from '../../store/modules/auth/actions';
import { RootState } from '../../../store/modules/rootReducer';

const LoginAndRegister: React.FC = () => {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  // const user: string | null = useSelector((state: RootState) => state.auth.token);

  // const navigate = useNavigate();
  // const location = useLocation();
  // const dispatch = useDispatch<AppDispatch>();

  // const prevPath = get(location, 'state.prevPath', '/');

  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  // const handleSubmit = (e: FormEvent) => {
  //     e.preventDefault();
  //     // let formErrors = false;

  // if (login.length < 3 || login.length > 20) {
  //     formErrors = true;
  //     toast.error('Login inválido');
  // }

  // if (password.length < 6 || password.length > 50) {
  //     formErrors = true;
  //     toast.error('Senha inválida');
  // }

  // if (formErrors) return;

  //     dispatch(actions.loginRequest({ email, password, prevPath }));
  // };

  // useEffect(() => {
  // se o usuario estiverr logado, redireciona para a home

  document.title = 'Login';

  //     if (user) {
  //         const decoded: Decoded = jwtDecode(user);
  //         const permission = decoded.permission;

  //         if (isLoggedIn) {
  //             if (permission === 'admin') {
  //                 navigate('/admin');
  //             } else if (permission === 'costumer') {
  //                 navigate('/comercio');
  //             } else if (permission === 'user') {
  //                 // corrigir aqui quando o usuario apenas criar a conta e nao fazer login
  //                 navigate('/criar-conta');
  //             }
  //         }
  //     }
  // }, [isLoggedIn, user, navigate]);

  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isSwapped, setIsSwapped] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Estado para alternar entre Login e Registro

  const handleSwap = () => {
    setIsSwapped(!isSwapped);

    setTimeout(() => {
      setShowRegisterForm(!showRegisterForm);
    }, 300);
  };

  return (
    <Container>
      <BlueBox isSwapped={isSwapped} color="blue">
        <h1>{showRegisterForm ? 'Cadastrar' : 'Login'}</h1>
        <h3>{showRegisterForm ? '' : 'Acessar o seu painel'}</h3>

        <button onClick={handleSwap}>
          {showRegisterForm ? 'Ir para Login' : 'Ir para Registro'}
        </button>
      </BlueBox>

      <GreenBox isSwapped={isSwapped}>
        <h1>{showRegisterForm ? 'Registro' : 'Login'}</h1>

        {showRegisterForm ? (
          <Form>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <button type="submit">Registrar</button>
          </Form>
        ) : (
          <Form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />

            <a href="#">Esqueceu a senha?</a>
            <button type="submit">Entrar</button>
          </Form>
        )}
      </GreenBox>
    </Container>
  );
};

export { LoginAndRegister };
