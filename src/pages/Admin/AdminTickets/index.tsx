import React from 'react';
import NavbarAdmin from '../../../components/NavbarAdmin';
import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const AdminConfiguration: React.FC = () => {
    return (
        <Container>
            <NavbarAdmin />
            <div>
                <h1>Pagina AdminConfiguration </h1>
            </div>
        </Container>
    );
};
export default AdminConfiguration;