import React from 'react';
import { ContainerHome } from './styled';
import NavbarHome from '../../components/NavbarHome';

const Home: React.FC = () => {

    return (
        <ContainerHome>
            <NavbarHome />
            <h1>Home page</h1>
            <br />

        </ContainerHome>
    );
};

export default Home;
