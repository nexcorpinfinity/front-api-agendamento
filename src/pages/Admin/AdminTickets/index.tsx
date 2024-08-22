import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminTickets: React.FC = () => {
    return (
        <Container>
            <div>
                <h1>Pagina AdminTickets </h1>
            </div>
        </Container>
    );
};
export default AdminTickets;