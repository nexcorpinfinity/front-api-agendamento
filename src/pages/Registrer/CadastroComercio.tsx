import React from 'react';

import { FaRegAddressCard } from 'react-icons/fa';

import { Container, Form } from './styled';

interface ThemeProps {
  theme: string | boolean;
  nomeDoComercio: string;
  cpfOuCpnj: string;
  endereco: string;
  setNomeDoComercio: (value: string) => void;
  setCpfOuCpnj: (value: string) => void;
  setEndereco: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CadastroComercio: React.FC<ThemeProps> = ({
  theme,
  nomeDoComercio,
  cpfOuCpnj,
  endereco,
  setNomeDoComercio,
  setCpfOuCpnj,
  setEndereco,
  onSubmit,
}) => {
  return (
    <Container $active={theme}>
      <Form className="form" onSubmit={onSubmit}>
        <h1>Cadastrar seu Comercio</h1>

        <div className="flex-column">
          <label>Nome do comercio</label>
        </div>
        <div className="inputForm">
          <FaRegAddressCard color="black" size={22} />
          <input
            type="text"
            className="input"
            placeholder="Digite seu nome"
            value={nomeDoComercio}
            onChange={(e) => setNomeDoComercio(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>CPF ou CPNJ</label>
        </div>
        <div className="inputForm">
          <FaRegAddressCard color="black" size={22} />
          <input
            type="text"
            className="input"
            placeholder="Digite seu CPF ou CPNJ"
            value={cpfOuCpnj}
            onChange={(e) => setCpfOuCpnj(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Endereço</label>
        </div>
        <div className="inputForm">
          <FaRegAddressCard color="black" size={22} />
          <input
            type="text"
            className="input"
            placeholder="Digite seu Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className="privacidae">
          <input type="checkbox" /> Aceitar termos de política de privacidade
        </div>

        <button className="button-submit">Cadastrar</button>
      </Form>
    </Container>
  );
};

export default CadastroComercio;
