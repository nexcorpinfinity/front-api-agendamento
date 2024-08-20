import React from 'react';
import styled from 'styled-components';

interface ICard {
    nome: string,
    quantidade?: string | number,
    valor?: string | number,
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 30px 10px;
    box-shadow: 1px 1px 20px #00000032;
    border-radius: 15px;
`;

const CardDashboardComercio: React.FC<ICard> = ({ nome, valor, quantidade }) => {
    return (
        <Container>
            <h4>{nome}</h4>
            {valor && <h2>{'R$ ' + valor}</h2>}
            <h2>{quantidade}</h2>
        </Container>
    );
};

export default CardDashboardComercio;