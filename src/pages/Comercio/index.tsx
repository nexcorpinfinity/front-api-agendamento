import React, { useEffect, useState } from 'react';

import { RootState } from '../../store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../Routers/RotaPrivada';
import CardDashboardComercio from '../../components/CardDashboardComercio';
import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa';
import { Container, CardContainers, Content, NotificationContainer, Badge, BellIcon } from './styled';
import { TbChartInfographic } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import AxiosRequest from '../../services/axios/AxiosRequest';
import styled from 'styled-components';
import DashboardCompoent from './DashboardComponent';

const Comercio: React.FC = () => {
    const [prdutosCadastrados, setProdutosCadastrados] = useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notifications, setNotifications] = useState<number>(10);

    const [toggleNotification, setToggleNotification ] = useState<boolean>(false);

    const theme = useSelector((state: RootState) => state.theme.theme);
    const user = useSelector((state: RootState) => state.auth.token);

    if (user === null) {
        return null;
    }

    const decoded: Decoded = jwtDecode(user);

    const nome = decoded.nomeDoUsuario;

    useEffect(() => {
        document.title = 'Comercio';

        const fetchProdutos = async () => {
            const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
            const produtosCadastrados = response.data.todosProdutos;
            setProdutosCadastrados(produtosCadastrados.length);
        };

        fetchProdutos();
    }, []);

    const obj = [
        {
            id: 1,
            nome: 'Produtos cadastrados',
            quantidade: prdutosCadastrados,
            icon: FaBoxOpen,
        },
        {
            id: 2,
            nome: 'Vendas Hoje',
            quantidade: 5,
            icon: FaShoppingCart,

        },
        {
            id: 3,
            nome: 'Total Hoje',
            valor: 500,
            icon: GrMoney,

        },
        {
            id: 4,
            nome: 'Faturamento Mensal ',
            valor: 3000,
            icon: TbChartInfographic,
        }
    ];

    const Titulo = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        font-family: "Inter", sans-serif;
        padding: 20px 40px 0px 40px;
        p {
            padding-left: 5px;
        }
    `;
    const IntroductionAndButton = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .noti-poupap{
            position: absolute;
            top: 110px;
            right: 115px;
            width: 300px;
            height: 200px;
            border: 1px solid black;
            background-color: white;
            border-radius: 10px;
        }
    `;

    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    const handleNotificationClick = () => {

        setToggleNotification(!toggleNotification);

    };
    const fecharpop = () => {
        setToggleNotification(!toggleNotification);
    };

    return (
        <Container $active={theme}>
            <Content>
                <Titulo>
                    <IntroductionAndButton>
                        <h2>Bem vindo novamente, {nomeFormatado} </h2>
                        <NotificationContainer onClick={handleNotificationClick}>
                            <BellIcon />
                            {notifications > 0 && (
                                <Badge>{notifications}</Badge>
                            )}
                        </NotificationContainer>
                        {toggleNotification && (
                            <div className='noti-poupap'>
                                <p>Notificações</p>
                                <button onClick={fecharpop}>X</button>
                            </div>
                        )}
                    </IntroductionAndButton>
                    <div>

                        <p>Veja todo resumo do seu painel aqui</p>

                    </div>
                </Titulo>

                <CardContainers>
                    {obj.map((obj) => (
                        <CardDashboardComercio key={obj.id} nome={obj.nome} quantidade={obj.quantidade} valor={obj.valor} Icon={obj.icon} theme={theme} />
                    ))}
                </CardContainers>

                <DashboardCompoent />

            </Content>
        </Container>
    );
};
export default Comercio;