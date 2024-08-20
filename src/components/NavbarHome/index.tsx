import React from 'react';

import { Container } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { AppDispatch } from '../../store';
import { toggleTheme } from '../../store/modules/theme/actions';

const NavbarHome: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch<AppDispatch>();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <Container $active={theme}>

            <div>
                <h1>SaasLogo</h1>
            </div>

            <div className='links'>
                <a href="/">Home</a>
                <a href="/sobre">Sobre</a>
                <a href="/planos">Planos</a>
                <a href="/contato">Contato</a>
            </div>

            <div>
                <p>Modo {theme === true ? 'escuro ativo' : 'escuro desativado' }</p>
                <label className="switch">
                    <input type="checkbox" checked={theme === true} onChange={handleToggleTheme} />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className='auth'>

                {isLoggedIn ? (
                    <a href="/login">Dashboard</a>
                ) : (
                    <>
                        <a href="/login">Login</a>
                    </>
                )}
            </div>
        </Container>
    );
};
export default NavbarHome;