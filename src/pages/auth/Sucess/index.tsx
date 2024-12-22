import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Sucess: React.FC = () => {
  const location = useLocation();

  const getQueryParam = (param: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const token = getQueryParam('token');

  const state = getQueryParam('state');

  console.log('Token:', token);
  console.log('Estado:', state);

  const decode = jwtDecode(String(token));

  console.log('Decoded Token:', decode);

  return (
    <div>
      <h1>Sucesso</h1>
      <p style={{ width: '1200px' }}>Token: {token}</p>
      <p>
        pegar esse token atual para poder atualizar os dados do usuario e depois fazer login com ele
        pegando a senha q ele digitou atualmente e apos isso fazer o login normalmente para setar os
        dados no localstorage, apenas no primeiro login
      </p>
    </div>
  );
};

export { Sucess };
