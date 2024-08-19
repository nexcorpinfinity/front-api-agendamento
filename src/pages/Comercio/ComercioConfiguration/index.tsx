import React from 'react';
import styled from 'styled-components';
import NavbarComercio from '../../../components/NavbarComercio';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/modules/rootReducer';
import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
width: 100%;
transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    display: flex;
    flex-direction: row;
 `;

const ComercioConfiguration: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <NavbarComercio />
            <h1>Pagina ComercioConfiguration </h1>
        </Container>
    );
};
export default ComercioConfiguration;