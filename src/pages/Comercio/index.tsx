import React, { useEffect, useState } from 'react';

import { RootState } from '../../store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../Routers/RotaPrivada';
import CardDashboardComercio from '../../components/CardDashboardComercio';
import { FaBell, FaBoxOpen, FaShoppingCart } from 'react-icons/fa';
import { Container, CardContainers, EstoqueBaixoCard } from './styled';
import { TbChartInfographic } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import AxiosRequest from '../../services/axios/AxiosRequest';
import styled from 'styled-components';
import DashboardCompoent from './DashboardCompoent';

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

    // console.log(decoded);

    const nome = decoded.nomeDoUsuario;

    useEffect(() => {
        document.title = 'Comercio';

        const fetchProdutos = async () => {
            const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
            const produtosCadastrados = response.data.todosProdutos;
            setProdutosCadastrados(produtosCadastrados.length);
        };

        fetchProdutos();
        // const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
        // setEstoque(response.data.todosProdutos);
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

    `;

    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    const Content = styled.div`

        background-color: #ffffff;
        border-radius: 20px;
        padding: 30px;

    `;

    const NotificationContainer = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
`;

    const BellIcon = styled(FaBell)`
    font-size: 24px;
    color: #333;
`;

    const Badge = styled.div`
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
    const handleNotificationClick = () => {

        setToggleNotification(!toggleNotification);
        alert('Notificações clicadas!' + toggleNotification);
    };

    const cores = [
        { corHexadecimal: '#BAE2FF' },
        { corHexadecimal: '#B9FFDD' },
        { corHexadecimal: '#FFE8AC' },
        { corHexadecimal: '#FFCAB9' },
        { corHexadecimal: '#F99494' },
        { corHexadecimal: '#9DD6FF' },
        { corHexadecimal: '#ECA1FF' },
        { corHexadecimal: '#DAFF8B' },
        { corHexadecimal: '#FFA285' },
        { corHexadecimal: '#CDCDCD' },
        { corHexadecimal: '#979797' },
        { corHexadecimal: '#A99A7C' },
    ];

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

                <EstoqueBaixoCard>
                    <h3>Links Uteis</h3>
                    <p>estoque baixo, ultima venda, produtos mais vendidos</p>
                    <div>
                        <h3>Estoque baixo</h3>
                        <p>produto 1</p>
                        <p>produto 2</p>
                        <p>produto 3</p>
                    </div>
                </EstoqueBaixoCard>
            </Content>
        </Container>
    );
};
export default Comercio;