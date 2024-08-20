import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store/modules/rootReducer';
import { temaGlobal } from '../../styles/theme';

const Title = styled.h1`
    margin-top: 50px;
    font-size: 50px;
    text-align: center;
`;

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    border: 1px solid #ccc;
    width: 100%;
    height: 96vh;
    transition: background-color 0.3s ease, color 0.3s ease;


    img {
        width: 500px;
        height: 500px;
        border-radius: 10px;
        box-shadow: 4px 5px 24px #000000e1;
    }
`;

const Redirect: React.FC = () => {
    const [time, setTime] = useState<number>(3);
    const navigate = useNavigate();
    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        document.title = 'Redirect';

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        if (time <= 0) {
            clearInterval(timer);
            navigate('/login');
            window.location.reload();
        }

        return () => clearInterval(timer);
    }, [time, navigate]);

    return (
        <Container $active={theme}>
            <Title>
                Você não está logado! <br /> Será redirecionado em: {time}
            </Title>
        </Container>
    );
};

export default Redirect;
