import React, { useContext } from 'react';
import NavbarHome from '../../components/NavbarHome';
import { ContainerHome } from './styled';
import { AuthContext } from '../../contexts/AuthProvider/modules/context';

const Home: React.FC = () => {
    const ctx = useContext(AuthContext);
    console.log(ctx);
    // const { userState, setUserDispatch } = ctx;

    // console.log(userState);

    return (
        <ContainerHome>
            <NavbarHome />
            <h1>Home page</h1>
            <br />

        </ContainerHome>
    );
};

export default Home;
