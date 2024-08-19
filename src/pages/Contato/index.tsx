import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
`;
const Contato: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <Helmet>
                <title>Contato</title>
            </Helmet>
            <NavbarHome />
            <h1>Pagina Contato </h1>
            <h1>dashboard</h1>
        </Container>
    );
};
export default Contato;