import React from 'react';
import styled from 'styled-components';
import NavbarComercio from '../../../components/NavbarComercio';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const ComercioRealizarVenda: React.FC = () => {
    return (
        <Container>
            <NavbarComercio />
            <h1>Pagina ComercioRealizarVenda </h1>
        </Container>
    );
};
export default ComercioRealizarVenda;