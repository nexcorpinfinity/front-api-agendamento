import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import styled from 'styled-components';
import { RootState } from '../../store/modules/rootReducer';
import { useSelector } from 'react-redux';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
`;
const Error404: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <NavbarHome />
            <h1>Error404</h1>
        </Container>
    );
};
export default Error404;