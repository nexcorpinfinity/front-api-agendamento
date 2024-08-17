import styled from 'styled-components';

export const ContainerNav = styled.nav`
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