import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #ffffff;
    font-weight: bold;
    font-family: 'ValorantFont', sans-serif;

    div {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: #05050571;
    }
    span {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        z-index: 2;
    }
`;
