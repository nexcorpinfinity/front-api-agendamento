import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminPerfil: React.FC = () => {
    return (
        <Container>
            <div>
                <h1>Pagina AdminPerfil </h1>
            </div>
        </Container>
    );
};
export default AdminPerfil;