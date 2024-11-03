import React from 'react';

import * as Styled from './styled';

const Login: React.FC = () => {
  return (
    <Styled.Container>
      <Styled.FormTitle>
        <h1>Login</h1>
      </Styled.FormTitle>
      <Styled.ContainerForm>
        <Styled.FormContainerInputs>
          <Styled.LabelAndInput htmlFor="email">
            Email
            <input type="email" placeholder="Digite seu Email" />
          </Styled.LabelAndInput>
          <Styled.LabelAndInput htmlFor="password">
            Senha
            <input type="password" placeholder="Digite sua Senha" />
          </Styled.LabelAndInput>
        </Styled.FormContainerInputs>

        <Styled.FormAsksContainer>
          <Styled.FormAskCheck>
            <input type="checkbox" />
            <p>Manter contectado</p>
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
        <a href="#">Cadastre-se</a>
      </Styled.AskNewRegister>
    </Styled.Container>
  );
};
export { Login };
