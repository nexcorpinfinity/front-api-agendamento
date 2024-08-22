import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminGestaoDePagamentos: React.FC = () => {
    return (
        <Container>
            <h1>Pagina AdminGestaoDePagamentos </h1>
        </Container>
    );
};
export default AdminGestaoDePagamentos;