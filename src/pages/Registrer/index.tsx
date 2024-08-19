import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import styled from 'styled-components';
export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
`;
const Register: React.FC = () => {

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <Helmet>
                <title>Registre-se</title>
            </Helmet>
            <NavbarHome />
            <h1>Pagina Register </h1>
            <h1>dashboard</h1>
        </Container>
    );
};
export default Register;