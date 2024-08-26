import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';

interface ICard {
    nome: string,
    quantidade?: string | number,
    valor?: string | number,
    Icon: IconType;
    theme: boolean | string
    link: string
}

export const Container = styled.div<{ $active: boolean | string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    padding: 5px 20px;
    .dados-valores{
        padding: 10px 0px;
        color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};

    }
    h1{
        color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
        font-size: 2rem;
    }
`;

export const Titulo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    gap: 2rem;


`;

export const LinkStyled = styled(Link)`
    box-shadow: 1px 1px 10px #00000030;
    padding: 8px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #1184d1;
    &:active {
        transform: scale(0.95);
    }
`;

const CardDashboardComercio: React.FC<ICard> = ({ nome, valor, quantidade, Icon, theme, link }) => {
    return (
        <Container $active={theme} className={'container-carddash'}>
            <Titulo>
                {valor ? <h1>{'R$ ' + valor}</h1> : <h1>{quantidade}</h1>}
                <LinkStyled to={link}><Icon size={27} /></LinkStyled>
            </Titulo>
            <div className='dados-valores'>
                <h4>{nome}</h4>
            </div>
        </Container>
    );
};

export default CardDashboardComercio;