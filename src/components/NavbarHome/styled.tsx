import styled from 'styled-components';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .links {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
    .auth {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
`;