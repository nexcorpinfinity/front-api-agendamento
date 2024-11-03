import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as Components from './components';
import * as Styled from './styled';

import { Permissions } from '../../../routers/Permissions';
import { Decoded } from '../../../routers/PrivateRouter';
import { RootState } from '../../../store/modules/rootReducer';

const LoginAndRegisterBusiness: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user: string | null = useSelector((state: RootState) => state.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const decoded: Decoded = jwtDecode(user);
      const permission = decoded.permission;

      console.log(permission);

      if (isLoggedIn) {
        if (permission === Permissions.Admin) {
          navigate('/admin');
        } else if (permission === Permissions.Costumer) {
          navigate('/comercio');
        } else if (permission === Permissions.Client) {
          navigate('/painel');
        }
      }
    }
  }, [isLoggedIn, user, navigate]);

  const [isSwapped, setIsSwapped] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);

    setTimeout(() => {
      setShowRegisterForm(!showRegisterForm);
    }, 300);
  };

  return (
    <Styled.Container>
      <Styled.BlueBox isSwapped={isSwapped} color="blue">
        <h1>{showRegisterForm ? 'Cadastrar' : 'Login'}</h1>
        <h3>{showRegisterForm ? '' : 'Acessar o seu painel'}</h3>

        <button onClick={handleSwap}>
          {showRegisterForm ? 'Ir para Login' : 'Ir para Registro'}
        </button>
      </Styled.BlueBox>

      <Styled.ContentForms isSwapped={isSwapped}>
        {showRegisterForm ? (
          <Components.RegisterBusiness handleAuth={handleSwap} />
        ) : (
          <Components.Login handleAuth={handleSwap} />
        )}
      </Styled.ContentForms>
    </Styled.Container>
  );
};

export { LoginAndRegisterBusiness };
