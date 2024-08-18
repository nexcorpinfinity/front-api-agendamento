import React from 'react';
import NavbarComercio from '../../components/NavbarComercio';
import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const Comercio: React.FC = () => {
    return (
        <Container>
            <NavbarComercio />
            <h1>Cadastre o seu comercio</h1>
            <h1>veja nossos produtos etc</h1>
        </Container>
    );
};
export default Comercio;