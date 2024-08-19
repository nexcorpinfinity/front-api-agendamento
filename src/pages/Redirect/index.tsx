import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store/modules/rootReducer';

const Title = styled.h1`
    margin-top: 50px;
    font-size: 50px;
    text-align: center;
`;

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    border: 1px solid #ccc;
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
