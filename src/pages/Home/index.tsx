import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { Container } from './styled';

const Home: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    // useEffect(() => {
    //     document.title = 'Home';
    // }, []);

    return (
        <Container $active={theme}>
            <h1>Home page</h1>

        </Container>
    );
};

export default Home;
