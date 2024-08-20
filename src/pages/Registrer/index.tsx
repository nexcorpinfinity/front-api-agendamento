import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';
import { MdAlternateEmail } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { IoPersonSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
    height: 96vh;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

.form {

}

::placeholder {
    font-family: 'Roboto', sans-serif;
}


.flex-column > label {
  color: #151717;
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 85%;
  height: 100%;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row > div > label {
  font-size: 14px;
  color: black;
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #252727;
}

.p {
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 450px;
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
    border: 1px solid black;    
`;

const Register: React.FC = () => {

    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        document.title = 'Registrar';
    }, []);

    return (
        <Container $active={theme}>
            <Form className="form">
                <div className="flex-column">
                    <label>Nome </label>
                </div>
                <div className="inputForm">
                    <IoPersonSharp color='black' size={22} />
                    <input type="text" className="input" placeholder="Digite seu nome" />
                </div>
                <div className="flex-column">
                    <label>Email </label>
                </div>
                <div className="inputForm">
                    <MdAlternateEmail color='black' size={22} />
                    <input type="text" className="input" placeholder="Digite seu Email" />
                </div>

                <div className="flex-column">
                    <label>Senha</label>
                </div>
                <div className="inputForm">
                    <HiOutlineLockClosed color='black' size={22} />
                    <input type="password" className="input" placeholder="Digite Sua senha" />
                </div>

                <button className="button-submit">Cadastrar</button>
                <p className="p">Já possui conta ?<Link to={'/login'}><span className="span">Faça Login</span></Link></p>

            </Form>
        </Container>
    );
};
export default Register;