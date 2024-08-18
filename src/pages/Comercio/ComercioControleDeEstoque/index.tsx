import React from 'react';
import styled from 'styled-components';
import NavbarComercio from '../../../components/NavbarComercio';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const ComercioControleDeProdutos: React.FC = () => {
    return (
        <Container>
            <NavbarComercio />
            <h1>Pagina ComercioControleDeProdutos </h1>
            <p>cadastro de produtos </p>
            <p>editar protps </p>
        </Container>
    );
};
export default ComercioControleDeProdutos;