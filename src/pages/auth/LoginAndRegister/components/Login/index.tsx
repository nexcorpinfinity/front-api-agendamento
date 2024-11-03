import { get } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import * as Styled from './styled';
import { AppDispatch } from '../../../../../store';
import * as actions from '../../../../../store/modules/auth/actions';

interface ILogin {
  handleAuth(): void;
}

const Login: React.FC<ILogin> = ({ handleAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const prevPath = get(location, 'state.prevPath', '/');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      dispatch(
        actions.loginRequest({
          email: formData.email,
          password: formData.password,
          stay_connected: formData.rememberMe,
          prevPath,
        }),
      );

      setFormData({
        email: '',
        password: '',
        rememberMe: false,
      });
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <Styled.Container>
      <Styled.FormTitle>
        <h1>Login</h1>
      </Styled.FormTitle>
      <Styled.ContainerForm onSubmit={handleSubmit}>
        <Styled.FormContainerInputs>
          <Styled.LabelAndInput htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Digite seu Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Styled.LabelAndInput>
          <Styled.LabelAndInput htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              placeholder="Digite sua Senha"
              value={formData.password}
              onChange={handleChange}
            />
          </Styled.LabelAndInput>
        </Styled.FormContainerInputs>

        <Styled.FormAsksContainer>
          <Styled.FormAskCheck>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <p>Manter conectado</p>
          </Styled.FormAskCheck>
          <div>
            <a href="#">Esqueceu a senha?</a>
          </div>
        </Styled.FormAsksContainer>

        <Styled.FormButtonSubmit>
          <button type="submit">Entrar</button>
        </Styled.FormButtonSubmit>
      </Styled.ContainerForm>
      <Styled.AskNewRegister>
        <p>Não tem uma conta?</p>
        <h1 onClick={handleAuth}>Cadastre-se</h1>
      </Styled.AskNewRegister>
    </Styled.Container>
  );
};

export { Login };
