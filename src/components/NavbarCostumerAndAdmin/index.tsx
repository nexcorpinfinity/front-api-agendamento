/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/5074297.png';
import AxiosRequest from '../../services/axios/AxiosRequest';
import { RootState } from '../../store/modules/rootReducer';
import { toggleTheme } from '../../store/modules/theme/actions';

import { FaHome, FaBox, FaShoppingCart, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import ButtonDarkTheme from '../ButtonDarkTheme';

import { Container, LogoSaas, Profile, StyledLink, Links } from './styled';
import { Decoded } from '../../Routers/RotaPrivada';
import { jwtDecode } from 'jwt-decode';

const NavbarCostumerAndAdmin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [comercioName, setComercioName] = useState<string | null>(null);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const token = useSelector((state: RootState) => state.auth.token);

    if (token === null) {
        return <Navigate to="/redirect" />;
    }

    const decoded: Decoded = jwtDecode(token);

    const permission = decoded.permission;

    useEffect(() => {

        if (permission === 'costumer') {
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
        }

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
                    <div>
                        <div className='foto'></div>
                        {permission === 'costumer' ? <h4>{comercioName}</h4> : <h4>{decoded.nomeDoUsuario}</h4>}
                    </div>
                    <div>
                        {permission === 'costumer' ? <p>Assinatura Ativa</p> : <p>Admin</p>}
                    </div>

                    {permission === 'costumer' ? <Link to={'/comercio/perfil'}>Ver Perfil</Link> : <Link to={'/admin/perfil'}>Ver Perfil</Link>}

                </Profile>
                <br />
                {permission === 'costumer' ? (
                    <>
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
                        <StyledLink to="/comercio/tickets" $active={location.pathname === '/comercio/tickets'}>
                            <FaFileAlt className="icon" />
                            <span>Ticket</span>
                        </StyledLink>
                    </>

                ) : (
                    <>
                        <StyledLink
                            to="/admin/dashboard"
                            $active={location.pathname === '/admin/dashboard'}
                        >
                            Dashboard
                        </StyledLink>
                        <StyledLink
                            to="/admin/notifications"
                            $active={location.pathname === '/admin/notifications'}
                        >
                            Notificacao
                        </StyledLink>
                        <StyledLink
                            to="/admin/gestao-comercio"
                            $active={location.pathname === '/admin/gestao-comercio'}
                        >
                            Gestão de Comercios
                        </StyledLink>
                        <StyledLink
                            to="/admin/gestao-pagamentos"
                            $active={location.pathname === '/admin/gestao-pagamentos'}
                        >
                            Gestão de Pagamentos
                        </StyledLink>
                        <StyledLink
                            to="/admin/gestao-usuarios"
                            $active={location.pathname === '/admin/gestao-usuarios'}
                        >
                            Gerenciar de Usuarios
                        </StyledLink>
                        <StyledLink
                            to="/admin/gestao-ticket"
                            $active={location.pathname === '/admin/gestao-ticket'}
                        >
                            Tickets
                        </StyledLink>
                    </>
                )}
            </Links>
            <Links>
                <ButtonDarkTheme theme={theme === true} handleToggleTheme={handleToggleTheme} />

                {permission === 'costumer' ? (
                    <StyledLink to="/comercio/configuracao" $active={location.pathname === '/comercio/configuracao'}>
                        <FaCog className="icon" />
                        <span>Configurações</span>
                    </StyledLink>
                ) : (
                    <StyledLink to="/admin/configuracao" $active={location.pathname === '/admin/configuracao'}>
                        <FaCog className="icon" />
                        <span>Configurações</span>
                    </StyledLink>
                )}

                <StyledLink to="" onClick={handleLogout} $active={false}>
                    <FaSignOutAlt className="icon" />
                    <span>Sair</span>
                </StyledLink>
            </Links>
        </Container>
    );
};

export default NavbarCostumerAndAdmin;