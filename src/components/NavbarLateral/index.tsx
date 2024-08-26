import React, { useState } from 'react';

import { ComercioTitle, Container, LinksNavLateral, StyledLink } from './styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
// import { Decoded } from '../../Routers/RotaPrivada';
// import { jwtDecode } from 'jwt-decode';

type NavbarLateralProps = {
    setMenuLateral: (value: boolean) => void;
}

const NavbarLateral: React.FC<NavbarLateralProps> = ({ setMenuLateral }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    // const token = useSelector((state: RootState) => state.auth.token);

    const [perfilOptions, setPerfilOptions] = useState<boolean>(false);

    // const decoded: Decoded = jwtDecode(token);

    const permission: string = 'costumer';

    const handleOptionsProfile = () => {
        setPerfilOptions(!perfilOptions);
    };

    return (
        <Container $active={theme}>

            <ComercioTitle>
                <div>
                    <FaRegUserCircle size={32} />
                </div>
                <div>
                    <h4>Nome do comercio</h4>
                    <p>email@email.com</p>
                </div>
                <div onClick={handleOptionsProfile}>
                    <IoMdArrowDropdown size={25}/>
                </div>
            </ComercioTitle>
            {perfilOptions && (
                <>
                    {isLoggedIn === true && permission === 'costumer' ? (
                        <LinksNavLateral>
                            <StyledLink to="/comercio/configuracao" $active={location.pathname === '/comercio/configuracao'} onClick={() => setMenuLateral(false)}>
                                <span>Configuração</span>
                            </StyledLink>
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
                        <span>Relatórios</span>
                    </StyledLink>
                    <StyledLink to="/comercio/tickets" $active={location.pathname === '/comercio/tickets'} onClick={() => setMenuLateral(false)}>
                        <span>Ticket</span>
                    </StyledLink>
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

        </Container>
    );
};

export default NavbarLateral;
