import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/modules/rootReducer';
import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
width: 100%;
transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.colorDark)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    display: flex;
    flex-direction: row;
 `;

const ComercioRealizarVenda: React.FC = () => {

    const theme = useSelector((state: RootState) => state.theme.theme);
    return (
        <Container $active={theme}>
            <h1>Pagina ComercioRealizarVenda </h1>
        </Container>
    );
};
export default ComercioRealizarVenda;