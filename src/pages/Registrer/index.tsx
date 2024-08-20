import React from 'react';
import { Helmet } from 'react-helmet';
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
`;
const Register: React.FC = () => {

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <Helmet>
                <title>Registre-se</title>
            </Helmet>
            <h1>Pagina Register </h1>
            <h1>dashboard</h1>
        </Container>
    );
};
export default Register;