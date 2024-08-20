import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
    height: 96vh;
    transition: background-color 0.3s ease, color 0.3s ease;


`;
const Sobre: React.FC = () => {

    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        document.title = 'Sobre';
    }, []);

    return (
        <Container $active={theme}>

            <h1>Pagina Sobre </h1>
            <h1>dashboard</h1>
        </Container>
    );
};
export default Sobre;