import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    border: 1px solid black;
    margin: 0 auto;
    width: 100%;
    height: 95vh;
    transition: background-color 0.3s ease, color 0.3s ease;

`;