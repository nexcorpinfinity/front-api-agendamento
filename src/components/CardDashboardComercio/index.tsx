import React from 'react';
import styled from 'styled-components';

interface ICard {
    nome: string,
    quantidade?: string | number,
    valor?: string | number,
}

export const Container = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    padding: 10px;

`;

const CardDashboardComercio: React.FC<ICard> = ({ nome, valor, quantidade }) => {
    return (
        <Container>
            <h2>{nome}</h2>
            {valor && <h2>{'R$ ' + valor}</h2>}
            <h2>{quantidade}</h2>
        </Container>
    );
};

export default CardDashboardComercio;