import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const AdminGestaoDeComercios: React.FC = () => {
    return (
        <Container>
            <h1>Pagina AdminGestaoDeComercios </h1>
        </Container>
    );
};
export default AdminGestaoDeComercios;
