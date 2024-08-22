import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminConfiguration: React.FC = () => {
    return (
        <Container>
            <h1>Pagina AdminConfiguration </h1>
        </Container>
    );
};
export default AdminConfiguration;