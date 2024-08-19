import React from 'react';
import styled from 'styled-components';
import NavbarComercio from '../../../components/NavbarComercio';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/modules/rootReducer';

export const Container = styled.div<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    display: flex;
    flex-direction: row;
 `;

const ComercioPerfil: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <NavbarComercio />
            <h1>Pagina ComercioPerfil</h1>
        </Container>
    );
};
export default ComercioPerfil;