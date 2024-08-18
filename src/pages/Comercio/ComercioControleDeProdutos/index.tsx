import React from 'react';
import styled from 'styled-components';
import NavbarComercio from '../../../components/NavbarComercio';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const ComercioControleDeEstoque: React.FC = () => {
    return (
        <Container>
            <NavbarComercio />
            <h1>Pagina ComercioControleDeEstoque </h1>
        </Container>
    );
};
export default ComercioControleDeEstoque;