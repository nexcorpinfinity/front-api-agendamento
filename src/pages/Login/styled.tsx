import styled from 'styled-components';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

