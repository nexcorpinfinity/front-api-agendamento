/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/5074297.png';
import AxiosRequest from '../../services/axios/AxiosRequest';
import { RootState } from '../../store/modules/rootReducer';
import { toggleTheme } from '../../store/modules/theme/actions';
import { temaGlobal } from '../../styles/theme';

import { FaHome, FaBox, FaShoppingCart, FaFileAlt, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import ButtonDarkTheme from '../ButtonDarkTheme';

export const Container = styled.div<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    border: 1px solid #000;
    width: 300px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
    padding: 10px;
`;

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    gap: 10px;
    align-items: center;
    margin: 15px 0px;
    padding: 10px 0;
    border-radius: 5px;

`;

export const StyledLink = styled(Link) <{ $active?: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    gap: 10px;
    text-decoration: none;
    color: #000000;
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    border: 1px solid ${(props) => (props.$active ? 'blue' : 'black')};
    font-size: 0.9rem;
    transition: background-color 0.3s ease, color 0.3s ease;

    .icon {
        font-size: 1.2rem;
    }

    span {
        transition: opacity 0.3s ease;
    }

    &:hover {
        background-color: ${(props) => (props.$active ? 'darkblue' : '#0083bf')};
        color: #000000;
    }

    &:hover span {
        display: block;
        color: #000000;

    }
`;
const NavbarComercio: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [comercioName, setComercioName] = useState<string | null>(null);
    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        async function loadComercio() {
            try {
                const response = await AxiosRequest.get('/commerce/usuario');
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
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    dispatch(actions.loginFailure({ error: 'Unauthorized' }));
                    navigate('/login');
                }
                toast.error('Erro ao carregar o comércio', { theme: 'colored' });
            }
        }

        loadComercio();
    }, [dispatch, navigate]);

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
        navigate('/');
        toast.info('Você fez Logout no Sistema', { theme: 'colored' });
    };

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <Container $active={theme}>
            <Links>
                <LogoSaas>
                    <img src={logo} alt="logo" />
                </LogoSaas>
                <Profile className='perfil'>
                    <div className='foto'></div>
                    <h4>{comercioName}</h4>
                </Profile>
                <br />
                <StyledLink to="/comercio" $active={location.pathname === '/comercio'}>
                    <FaHome className="icon" />
                    <span>Dashboard</span>
                </StyledLink>
                <StyledLink to="/comercio/controle-de-estoque" $active={location.pathname === '/comercio/controle-de-estoque'}>
                    <FaBox className="icon" />
                    <span>Estoque</span>
                </StyledLink>
                <StyledLink to="/comercio/realizar-venda" $active={location.pathname === '/comercio/realizar-venda'}>
                    <FaShoppingCart className="icon" />
                    <span>Realizar Venda</span>
                </StyledLink>
                <StyledLink to="/comercio/relatorios" $active={location.pathname === '/comercio/relatorios'}>
                    <FaFileAlt className="icon" />
                    <span>Relatórios</span>
                </StyledLink>
                <StyledLink to="/comercio/relatorios" $active={location.pathname === '/comercio/relatorios'}>
                    <FaFileAlt className="icon" />
                    <span>Relatórios</span>
                </StyledLink>
            </Links>

            <Links>

                <ButtonDarkTheme theme={theme === true} handleToggleTheme={handleToggleTheme}/>

                <StyledLink to="/comercio/configuracao" $active={location.pathname === '/comercio/configuracao'}>
                    <FaCog className="icon" />
                    <span>Configurações</span>
                </StyledLink>
                <StyledLink to="/comercio/perfil" $active={location.pathname === '/comercio/perfil'}>
                    <FaUser className="icon" />
                    <span>Perfil</span>
                </StyledLink>
                <StyledLink to="/comercio/perfil" onClick={handleLogout} $active={false}>
                    <FaSignOutAlt className="icon" />
                    <span>Sair</span>
                </StyledLink>
            </Links>
        </Container>
    );
};

export default NavbarComercio;