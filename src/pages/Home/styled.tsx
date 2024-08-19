import styled from 'styled-components';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
`;