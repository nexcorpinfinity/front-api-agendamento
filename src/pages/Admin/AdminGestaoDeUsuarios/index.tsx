import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminGestaoDeUsuarios: React.FC = () => {
    return (
        <Container>
            <div>
                <h1>Pagina AdminGestaoDeUsuarios </h1>
            </div>
        </Container>
    );
};
export default AdminGestaoDeUsuarios;