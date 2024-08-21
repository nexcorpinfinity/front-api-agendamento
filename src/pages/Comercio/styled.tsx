import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';

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

export const EstoqueBaixoCard = styled.div`
    border: 1px solid white;
`;

export const ButtonsNotifications = styled.div`

`;