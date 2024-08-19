import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';

export const Container = styled.nav<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
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