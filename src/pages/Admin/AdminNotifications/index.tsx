import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
 `;

const AdminNotifications: React.FC = () => {
    return (
        <Container>
            <div>
                <h1>Pagina AdminNotifications </h1>
            </div>
        </Container>
    );
};
export default AdminNotifications;