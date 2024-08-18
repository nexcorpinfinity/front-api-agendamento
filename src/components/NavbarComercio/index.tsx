import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/5074297.png';

export const Container = styled.div`
    border: 1px solid #000;
    width: 230px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;


    a {
        text-decoration: none;
        color: black;
        border: 1px solid black;
        padding: 10px;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #9d9b9b;
        }
    }
`;

export const LogoSaas = styled.div`
    display: flex;
    justify-content: center;
    a {
        padding: 0;
        text-decoration: none;
        color: black;
        border: none;
    }
    img {
        width: 100px;
    }
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    border: 1px solid black;
    margin: 15px 0px;
    padding: 10px 0;
    .foto {
        margin-left: 10px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        border: 1px solid black;

    }

`;

const NavbarComercio: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
        navigate('/');
        toast.info('Você fez Logout no Sistema', { theme: 'colored' });
    };

    return (
        <Container>

            <Links>
                <LogoSaas>
                    <a href="/"><img src={logo} alt="logo" /></a>
                </LogoSaas>

                <Profile>
                    <div className='foto'></div>
                    <h3>Mercado teste</h3>
                </Profile>
                <br />
                <a href="/comercio">Dashboard</a>
                <a href="/comercio/controle-de-estoque">Cadastro de produtos</a>
                <a href="/comercio/controle-de-estoque">Estoque de produtos</a>
                {/* <a href="/comercio/controle-de-produtos">Controle de produtos</a> */}
                <a href="/comercio/venda-de-produtos"> Realizar venda</a>
                <a href="/comercio/relatorios">Relatorio Mensal</a>
                {/* Entradas de produtos seria a venda realizada, teria q ter a qnt de venda e qnt de valor em R$ */}
                {/* saida de faturamento, seria despesas mensais que vc vai poder cadastrar */}
                {/* <a href="/comercio/relatorios">Entrada </a> */}
                {/* <a href="/comercio/notifications">Pedidos Online</a> */}
                {/* <a href="/comercio/gestao-comercio">Pedidos Historico</a> */}
                {/* <a href="/comercio/gestao-ticket">Clientes</a> */}
            </Links>
            <Links>
                <p>Trocar modo</p>
                <a href="/comercio/configuracao">Configurações</a>
                <a href="/comercio/perfil">Perfil</a>
                <a href="#" onClick={handleLogout}>Sair</a>
            </Links>
        </Container>
    );
};
export default NavbarComercio;