import React from 'react';
import { Container } from './styled.tsx';

interface LoadingProps {
    isLoading?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading = false }) => {
    if (!isLoading) return <></>;

    return (
        <Container>
            <div />
            <span>Carregando...</span>
        </Container>
    );
};

export default Loading;
