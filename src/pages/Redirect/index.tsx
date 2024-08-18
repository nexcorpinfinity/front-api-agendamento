import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
    margin-top: 50px;
    font-size: 50px;
    text-align: center;
`;

const Container = styled.div`
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
        <Container>
            <Title>
                Você não está logado! <br /> Será redirecionado em: {time}
            </Title>
        </Container>
    );
};

export default Redirect;
