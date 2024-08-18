import React from 'react';

import { ContainerNav } from './styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';

const NavbarHome: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <ContainerNav>

            <div>
                <h1>SaasLogo</h1>
            </div>

            <div className='links'>
                <a href="/">Home</a>
                <a href="/sobre">Sobre</a>
                <a href="/planos">Planos</a>
                <a href="/contato">Contato</a>
            </div>

            <div className='auth'>

                {isLoggedIn ? (
                    <a href="/login">Dashboard</a>
                ) : (
                    <>
                        <a href="/login">Login</a>
                        <a href="/criar-conta">Registre-se</a>
                    </>
                )}
            </div>
        </ContainerNav>
    );
};
export default NavbarHome;