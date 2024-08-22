import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';
import { Link } from 'react-router-dom';

export const Container = styled.div<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    /* border-right: 3px solid ${(props) => (props.$active ? temaGlobal.bordaNavbarDark : temaGlobal.bordaNavbarLight)}; */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 320px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
    padding: 10px;
`;

export const Links = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
`;

export const LogoSaas = styled.div`
    display: flex;
    justify-content: center;
    a {
        padding: 0;
        text-decoration: none;
        color: black;
        border: none;

    }
    img {
        width: 100px;
    }
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    gap: 10px;
    align-items: center;
    margin: 15px 0px;
    padding: 10px 0;
    border-radius: 5px;

`;

export const StyledLink = styled(Link) <{ $active?: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    gap: 10px;
    text-decoration: none;
    color: #000000;
    background-color: ${(props) => (props.$active ? '#4267ce' : 'white')};
    border: 1px solid ${(props) => (props.$active ? 'blue' : 'black')};
    font-size: 0.9rem;
    transition: background-color 0.3s ease, color 0.3s ease;

    .icon {
        font-size: 1.2rem;
    }

    span {
        transition: opacity 0.3s ease;
    }

    &:hover {
        background-color: ${(props) => (props.$active ? 'darkblue' : '#0083bf')};
        color: #000000;
    }

    &:hover span {
        display: block;
        color: #000000;

    }
    &:active {
            transform: scale(0.98);
        }
`;