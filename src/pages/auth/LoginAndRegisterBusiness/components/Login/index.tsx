import { get } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';

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

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const prevPath = get(location, 'state.prevPath', '/');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleRememberMe = () => {
    setFormData((prevState) => ({
      ...prevState,
      rememberMe: !prevState.rememberMe,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.info('Por favor, preencha todos os campos.', {
        theme: 'colored',
      });
      return;
    }

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
        <h2>Acessar Painel</h2>
      </Styled.FormTitle>
      <Styled.ContainerForm onSubmit={handleSubmit}>
        <Styled.FormContainerInputs>
          <Styled.FormsContactGroup>
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </Styled.FormsContactGroup>

          <Styled.FormsContactGroup>
            <input
              type="password"
              name="password"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
            />
            <label>Senha</label>
          </Styled.FormsContactGroup>
        </Styled.FormContainerInputs>

        <Styled.FormAsksContainer>
          <Styled.FormAskCheck>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <p onClick={toggleRememberMe}>Manter conectado</p>
          </Styled.FormAskCheck>
          <Styled.ForgotPassword>
            <p>Esqueceu a senha ?</p>
          </Styled.ForgotPassword>
        </Styled.FormAsksContainer>

        <Styled.FormButtonSubmit>
          <button type="submit">Entrar</button>
        </Styled.FormButtonSubmit>
      </Styled.ContainerForm>
      <Styled.AskNewRegister>
        <p>Não tem uma conta?</p>
        <p onClick={handleAuth}>Cadastre-se</p>
      </Styled.AskNewRegister>
    </Styled.Container>
  );
};

export { Login };
