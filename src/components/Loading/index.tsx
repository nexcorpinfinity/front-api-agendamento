import React from 'react';
import { Container } from './styled.tsx';
import { ScaleLoader } from 'react-spinners';

interface LoadingProps {
    isLoading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading = false }) => {
    if (!isLoading) return <></>;

    return (
        <Container>
            <div />
            <span>Carregando...</span>
            <ScaleLoader
                color="#ffffff"
                radius={5}
                width={6}
            />
        </Container>
    );
};

export default Loading;
