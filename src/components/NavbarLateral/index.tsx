/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { ComercioTitle, Container, LinksNavLateral, StyledLink } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import AxiosRequest from '../../services/axios/AxiosRequest';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Decoded } from '../../Routers/RotaPrivada';
import { AppDispatch } from '../../store';
import * as actions from '../../store/modules/auth/actions';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import ButtonDarkTheme from '../ButtonDarkTheme';
import { toggleTheme } from '../../store/modules/theme/actions';

type NavbarLateralProps = {
    setMenuLateral: (value: boolean) => void;
}

const NavbarLateral: React.FC<NavbarLateralProps> = ({ setMenuLateral }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [perfilOptions, setPerfilOptions] = useState<boolean>(false);
    const [comercioName, setComercioName] = useState<string | null>(null);
    const [comercioEmail, setComercioEmail] = useState<string | null>(null);

    const handleOptionsProfile = () => {
        setPerfilOptions(!perfilOptions);
    };

    // ta com bug qnd o token é invalido

    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

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

                    if (response.status !== 200) {
                        return <Navigate to="/redirect" />;
                    }

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

                    setComercioEmail(response.data.email || 'Email não disponível');
                    setComercioName(comercioData[0]?.nomeDoComercio || 'Nome não disponível');
                } catch (error: any) {
                    if (error.response && error.response.status === 403) {
                        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
                        navigate('/redirect');
                        window.location.reload();
                    }

                    toast.error('Erro ao carregar o comércio', { theme: 'colored' });
                }
            }
            loadComercio();
        }
    }, [dispatch, navigate, permission]);

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
        setMenuLateral(false);
        navigate('/');
        toast.info('Você fez Logout no Sistema', { theme: 'colored' });
    };

    return (
        <Container $active={theme}>

            <ComercioTitle>
                <div>
                    <FaRegUserCircle size={32} />
                </div>
                <div>
                    <h4>{comercioName}</h4>
                    <p>{comercioEmail}</p>
                </div>
                <div onClick={handleOptionsProfile}>
                    <IoMdArrowDropdown size={25} />
                </div>
            </ComercioTitle>
            {perfilOptions && (
                <>
                    {isLoggedIn === true && permission === 'costumer' ? (
                        <LinksNavLateral>
                            {/* <StyledLink to="/comercio/configuracao" $active={location.pathname === '/comercio/configuracao'} onClick={() => setMenuLateral(false)}>
                                <span>Configuração</span>
                            </StyledLink> */}
                            <StyledLink to="/comercio/perfil" $active={location.pathname === '/comercio/perfil'} onClick={() => setMenuLateral(false)}>
                                <span>Perfil</span>
                            </StyledLink>
                        </LinksNavLateral>

                    ) : (
                        isLoggedIn === true && permission === 'admin' && (
                            <LinksNavLateral>
                                <StyledLink to="/admin/configuracao" $active={location.pathname === '/admin/configuracao'} onClick={() => setMenuLateral(false)}>
                                    <span>Configuração</span>
                                </StyledLink>
                                <StyledLink to="/admin/perfil" $active={location.pathname === '/admin/perfil'} onClick={() => setMenuLateral(false)}>
                                    <span>Perfil</span>
                                </StyledLink>
                            </LinksNavLateral>
                        )
                    )}
                </>
            )}
            {isLoggedIn === true && permission === 'costumer' ? (
                <LinksNavLateral>
                    <small>Menu</small>
                    <StyledLink to="/comercio" $active={location.pathname === '/comercio'} onClick={() => setMenuLateral(false)}>
                        <span>Dashboard</span>
                    </StyledLink>
                    <StyledLink to="/comercio/controle-de-estoque" $active={location.pathname === '/comercio/controle-de-estoque'} onClick={() => setMenuLateral(false)}>
                        <span>Estoque</span>
                    </StyledLink>
                    <StyledLink to="/comercio/realizar-venda" $active={location.pathname === '/comercio/realizar-venda'} onClick={() => setMenuLateral(false)}>
                        <span>Realizar Venda</span>
                    </StyledLink>
                    <StyledLink to="/comercio/relatorios" $active={location.pathname === '/comercio/relatorios'} onClick={() => setMenuLateral(false)}>
                        <span>Entradas / Saidas </span>
                    </StyledLink>
                    {/* <StyledLink to="/comercio/tickets" $active={location.pathname === '/comercio/tickets'} onClick={() => setMenuLateral(false)}>
                        <span>Ticket</span>
                    </StyledLink> */}
                </LinksNavLateral>

            ) : (
                isLoggedIn === true && permission === 'admin' && (
                    <LinksNavLateral>
                        <small>Menu</small>
                        <StyledLink to="/admin" $active={location.pathname === '/admin'} onClick={() => setMenuLateral(false)}>
                            <span>Dashboard</span>
                        </StyledLink>
                        <StyledLink to="/admin/notifications" $active={location.pathname === '/admin/notifications'} onClick={() => setMenuLateral(false)}>
                            <span>Notificação</span>
                        </StyledLink>
                        <StyledLink to="/admin/gestao-comercio" $active={location.pathname === '/admin/gestao-comercio'} onClick={() => setMenuLateral(false)}>
                            <span>AdminGestaoDeComercios</span>
                        </StyledLink>
                        <StyledLink to="/admin/gestao-pagamentos" $active={location.pathname === '/admin/gestao-pagamentos'} onClick={() => setMenuLateral(false)}>
                            <span>Gestão de Pagamentos</span>
                        </StyledLink>
                        <StyledLink to="/admin/gestao-ticket" $active={location.pathname === '/admin/gestao-ticket'} onClick={() => setMenuLateral(false)}>
                            <span>Gestão de ticket</span>
                        </StyledLink>
                    </LinksNavLateral>
                )
            )}

            <div>
                <div>
                    trocar tema
                    <ButtonDarkTheme theme={theme} handleToggleTheme={handleToggleTheme} />

                </div>

                <LinksNavLateral>
                    <StyledLink to="" onClick={(e) => {
                        handleLogout(e);
                        setPerfilOptions(false);
                    }}>Sair</StyledLink>
                </LinksNavLateral>
            </div>
        </Container>
    );
};

export default NavbarLateral;
