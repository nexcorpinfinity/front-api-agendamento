import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/5074297.png';

import AxiosRequest from '../../services/axios/AxiosRequest';

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
    border-radius: 5px;
    .foto {
        margin-left: 10px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        border: 1px solid black;

    }

`;

const StyledLink = styled(Link) <{ $active: boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    border: 1px solid ${(props) => (props.$active ? 'blue' : 'black')};
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: ${(props) => (props.$active ? 'darkblue' : '#0083bf')};
        color: #ffffff;
    }
    &:focus {
        outline: none;
    }
    &:active {
        transform: scale(0.95);
    }
`;

const NavbarComercio: React.FC = () => {

    // const token = useSelector((state: any) => state.auth.token);

    // if (token === null) {
    //     return <Navigate to="/unauthorized" />;
    // }

    // const decoded: Decoded = jwtDecode(token);

    // console.log(decoded.idUser);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    const [comercioName, setComercioName] = useState<string | null>(null);

    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
        navigate('/');
        toast.info('Você fez Logout no Sistema', { theme: 'colored' });
    };

    useEffect(() => {
        async function loadComercio() {
            // setComercioName(decoded.nomeDoUsuario);
            try {
                const response = await AxiosRequest.get(
                    '/commerce/usuario'
                );

                const comercioData = Array.isArray(response.data)
                    ? response.data.map((item) => ({
                        id: item.id,
                        nomeDoComercio: item.Comercio.comercio_name,
                    }))
                    : [
                        {
                            id: response.data.id,
                            nomeDoComercio: response.data.Comercio.comercio_name,
                        },
                    ];
                setComercioName(comercioData[0]?.nomeDoComercio || 'Nome não disponível');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(error);
                if (error.response && error.response.status === 403) {
                    dispatch(actions.loginFailure({ error: 'Unauthorized' }));
                    navigate('/login');
                }
                toast.error('Erro ao carregar o comércio', { theme: 'colored' });
            }

        }

        loadComercio();
    }, []);

    return (
        <Container>
            <Links>
                <LogoSaas>
                    <a href="/"><img src={logo} alt="logo" /></a>
                </LogoSaas>

                <Profile>
                    <div className='foto'></div>
                    <h4>{comercioName}</h4>
                </Profile>
                <br />
                <StyledLink
                    to="/comercio"
                    $active={location.pathname === '/comercio'}
                >
                    Dashboard
                </StyledLink>
                <StyledLink
                    to="/comercio/cadastrar-produtos"
                    $active={location.pathname === '/comercio/cadastrar-produtos'}
                >
                    Cadastrar Produto
                </StyledLink>
                <StyledLink
                    to="/comercio/controle-de-estoque"
                    $active={location.pathname === '/comercio/controle-de-estoque'}
                >
                    Estoque
                </StyledLink>
                <StyledLink
                    to="/comercio/realizar-venda"
                    $active={location.pathname === '/comercio/realizar-venda'}
                >
                    Realizar venda
                </StyledLink>
                <StyledLink
                    to="/comercio/relatorios"
                    $active={location.pathname === '/comercio/relatorios'}
                >
                    Relatorio Mensal
                </StyledLink>
                {/* <a href="/comercio/controle-de-produtos">Controle de produtos</a> */}
                {/* Entradas de produtos seria a venda realizada, teria q ter a qnt de venda e qnt de valor em R$ */}
                {/* saida de faturamento, seria despesas mensais que vc vai poder cadastrar */}
                {/* <a href="/comercio/relatorios">Entrada </a> */}
                {/* <a href="/comercio/notifications">Pedidos Online</a> */}
                {/* <a href="/comercio/gestao-comercio">Pedidos Historico</a> */}
                {/* <a href="/comercio/gestao-ticket">Clientes</a> */}
            </Links>
            <Links>
                <div>
                    <p>
                        Modo Dark
                    </p>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <StyledLink
                    to="/comercio/configuracao"
                    $active={location.pathname === '/comercio/configuracao'}
                >
                    Configurações
                </StyledLink>
                <StyledLink
                    to="/comercio/perfil"
                    $active={location.pathname === '/comercio/perfil'}
                >
                    Perfil
                </StyledLink>
                <StyledLink
                    to="/comercio/perfil"
                    onClick={handleLogout}
                    $active={false}
                >
                    Sair
                </StyledLink>
            </Links>
        </Container>
    );
};
export default NavbarComercio;