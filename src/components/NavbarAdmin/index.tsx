/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import logo from '../../assets/5074297.png';
import { Decoded } from '../../Routers/RotaPrivada';
import { jwtDecode } from 'jwt-decode';

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

const NavbarAdmin: React.FC = () => {

    const token = useSelector((state: any) => state.auth.token);

    if (token === null) {
        return <Navigate to="/redirect" />;
    }

    const decoded: Decoded = jwtDecode(token);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    const handleLogout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
        navigate('/');
        toast.info('Você fez Logout no Sistema', { theme: 'colored' });
    };

    useEffect(() => {

    }, []);

    return (
        <Container>

            <Links>
                <LogoSaas>
                    <a href="/"><img src={logo} alt="logo" /></a>
                </LogoSaas>

                <Profile>
                    <div className='foto'></div>
                    <h4>{decoded.nomeDoUsuario}</h4>
                </Profile>
                <br />
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
                    to="/admin/configuracao"
                    $active={location.pathname === '/admin/configuracao'}
                >
                    Configurações
                </StyledLink>
                <StyledLink
                    to="/admin/perfil"
                    $active={location.pathname === '/admin/perfil'}
                >
                    Perfil
                </StyledLink>
                <StyledLink
                    to=""
                    onClick={handleLogout}
                    $active={false}
                >
                    Sair
                </StyledLink>
            </Links>
        </Container>
    );
};
export default NavbarAdmin;