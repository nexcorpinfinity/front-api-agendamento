import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    padding: 1.5rem;
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    font-family: "Inter", sans-serif;
    width: 100%;
 `;

export const CardContainers = styled.div`
    width: 1000px;
    margin: 20px auto;
    transition: background-color 0.3s ease, color 0.3s ease;
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

    border-radius: 10px;
    box-shadow: 7px 2px 13px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;

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

export const Content = styled.div<{ $active: string | boolean }>`
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};

`;

