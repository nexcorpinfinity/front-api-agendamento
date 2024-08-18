import React from 'react';
import NavbarAdmin from '../../../components/NavbarAdmin';
import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const AdminDashboard: React.FC = () => {
    return (
        <Container>
            <NavbarAdmin />
            <h1>Pagina AdminDashboard </h1>
        </Container>
    );
};
export default AdminDashboard;