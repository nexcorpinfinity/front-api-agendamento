import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminDashboard: React.FC = () => {
    return (
        <Container>
            <h1>Pagina AdminDashboard </h1>
        </Container>
    );
};
export default AdminDashboard;