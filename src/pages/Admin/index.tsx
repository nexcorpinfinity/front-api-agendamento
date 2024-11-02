import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const Admin: React.FC = () => {
    return (
        <Container>
            <div>
                <h1>Pagina admin </h1>
                <h1>dashboard</h1>
            </div>
        </Container>
    );
};
export default Admin;
