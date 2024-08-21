import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';
import { FaBell } from 'react-icons/fa';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    box-shadow: inset 7px 2px 13px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    padding: 2rem;
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    display: flex;
    flex-direction: column;
    gap: 1rem;
 `;

export const CardContainers = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    background-color: white;
    font-family: "Inter", sans-serif;
    border-radius: 10px;
    box-shadow: 7px 2px 13px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 5px;
    align-items: center;
    padding: 20px;
    border: 2px solid #afafaf7d;

    .container-carddash:nth-child(1),
    .container-carddash:nth-child(2),
    .container-carddash:nth-child(3) {
        border-right: 2px solid #ccc;
}
`;

export const ButtonsNotifications = styled.div`

`;

export const Content = styled.div`

background-color: #ffffff;
border-radius: 20px;
padding: 30px;

`;

export const NotificationContainer = styled.div`
position: relative;
display: inline-block;
cursor: pointer;
`;

export const BellIcon = styled(FaBell)`
font-size: 24px;
color: #333;
`;

export const Badge = styled.div`
position: absolute;
top: -5px;
right: -5px;
background-color: red;
color: white;
border-radius: 50%;
width: 20px;
height: 20px;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
`;