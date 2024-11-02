import styled from 'styled-components';

import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
    background-color: ${(props) =>
        props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`;

export const BasicInfo = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto;
    background-color: #2a2e33;
`;

export const PrincipalInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const PlanoDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto;
    background-color: #2a2e33;
`;

export const CardPrincipalInfo = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;

    label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.7px;
    }

    input {
        width: 100%;
        background-color: #ccc;
        cursor: not-allowed;
        color: '#808080';
        outline: none;
        caret-color: transparent;
        padding: 12px 13px;
        border-radius: 4px;
        border: none;
        font-size: 0.9rem;
    }

    a {
        color: #26c1d0;
        font-size: 0.85rem;
        text-decoration: none;
    }
`;

export const Title = styled.div`
    padding: 5px 20px 0px 20px;
    h2 {
        font-size: 1.4rem;
        font-weight: 500;
    }
    .buttons-planos {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`;
