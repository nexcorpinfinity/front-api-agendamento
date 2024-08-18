import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';

export const Container = styled.div`
    border: 1px solid #000;
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Links = styled.div`
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
        color: black;
        border: 1px solid black;
        padding: 10px;

        &:hover {
            background-color: #9d9b9b;
        }
    }
`;

export const LogoSaas = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0px;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    margin: 15px 0px;

`;

const NavbarAdmin: React.FC = () => {

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
                    <h1><a href="/">logo</a></h1>
                </LogoSaas>

                <Profile>
                    <h1>foto</h1>
                    <h1>perfil</h1>
                </Profile>
                <br />
                <a href="/admin/dashboard">Dashboard</a>
                <a href="/admin/notifications">Notificacoes</a>
                <a href="/admin/gestao-comercio">Gestao de comercios</a>
                <a href="/admin/gestao-pagamentos">Gestao de Pagamentos</a>
                <a href="/admin/gestao-usuarios">Gerenciar de Usuarios</a>
                <a href="/admin/gestao-ticket">Tickets</a>
            </Links>
            <Links>
                <a href="/admin/configuracao">Configurações</a>
                <a href="#">Perfil</a>
                <a href="#" onClick={handleLogout}>Sair</a>
            </Links>
        </Container>
    );
};
export default NavbarAdmin;