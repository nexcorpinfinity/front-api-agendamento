import React from 'react';
import NavbarAdmin from '../../../components/NavbarAdmin';
import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
 `;

const AdminGestaoDeUsuarios: React.FC = () => {
    return (
        <Container>
            <NavbarAdmin />
            <div>
                <h1>Pagina AdminGestaoDeUsuarios </h1>
            </div>
        </Container>
    );
};
export default AdminGestaoDeUsuarios;