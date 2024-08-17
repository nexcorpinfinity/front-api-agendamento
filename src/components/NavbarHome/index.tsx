import React from 'react';

import { ContainerNav } from './styled';

const NavbarHome: React.FC = () => {
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
                <a href="/criar-conta">Registre-se</a>
                <a href="/login">Login</a>
            </div>
        </ContainerNav>
    );
};
export default NavbarHome;