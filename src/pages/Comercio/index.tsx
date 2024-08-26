import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/modules/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../Routers/RotaPrivada';
import CardDashboardComercio from '../../components/CardDashboardComercio';
import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa';
import { Container, CardContainers, Content } from './styled';
import { TbChartInfographic } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr';
import AxiosRequest from '../../services/axios/AxiosRequest';
import styled from 'styled-components';
import DashboardCompoent from './DashboardComponent';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

import * as actions from '../../store/modules/auth/actions';
import { toast } from 'react-toastify';

const Titulo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    font-family: "Inter", sans-serif;
    padding: 20px 30px 0px 30px;
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
const DivEmbaixoDoDashboard = styled.div`
    border: 2px solid white;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px 20px;
    margin: 10px 20px;
`;

const Comercio: React.FC = () => {
    const [produtosCadastrados, setProdutosCadastrados] = useState<number>(0);

    const theme = useSelector((state: RootState) => state.theme.theme);
    const user = useSelector((state: RootState) => state.auth.token);

    if (user === null) {
        return null;
    }

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const decoded: Decoded = jwtDecode(user);

    const nome = decoded.nomeDoUsuario;

    useEffect(() => {
        document.title = 'Comercio';

        const fetchProdutos = async () => {
            try {
                const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
                const produtosCadastrados = response.data.todosProdutos;
                setProdutosCadastrados(produtosCadastrados.length);

            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch (error: any) {
                if (error.response.status === 401) {
                    dispatch(actions.loginFailure({ error: 'Você não está logado' }));
                    toast.error('Você não está logado', { theme: 'colored' });
                    navigate('/login');
                }
            }
        };

        fetchProdutos();
    }, []);

    const obj = [
        {
            id: 1,
            nome: 'Produtos cadastrados',
            quantidade: produtosCadastrados,
            icon: FaBoxOpen,
            path: '/comercio/controle-de-estoque'
        },
        {
            id: 2,
            nome: 'Vendas Hoje',
            quantidade: 5,
            icon: FaShoppingCart,
            path: ''
        },
        {
            id: 3,
            nome: 'Total Hoje',
            valor: 500,
            icon: GrMoney,
            path: ''
        },
        {
            id: 4,
            nome: 'Faturamento Mensal ',
            valor: 3000,
            icon: TbChartInfographic,
            path: ''
        }
    ];

    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    return (
        <Container $active={theme}>
            <Content $active={theme}>
                <Titulo>
                    <IntroductionAndButton>
                        <h2>Bem vindo novamente, {nomeFormatado} </h2>

                    </IntroductionAndButton>
                    <div>
                        <p>Veja todo resumo do seu painel aqui</p>
                    </div>
                </Titulo>

                <CardContainers >
                    {obj.map((obj) => (
                        <CardDashboardComercio key={obj.id} nome={obj.nome} quantidade={obj.quantidade} valor={obj.valor} Icon={obj.icon} theme={theme} link={obj.path} />
                    ))}
                </CardContainers>

                <DashboardCompoent theme={theme}/>
                <h1>Ultimos pedidos</h1>
                <DivEmbaixoDoDashboard>

                    <div>
                        <p>id do pedido</p>
                        <p>81y283y172y31</p>
                    </div>
                    <div>
                        <p>Data do pedido</p>
                        <p>26/09/2023</p>
                    </div>
                    <div>
                        <p>Total</p>
                        <p>R$ 550,00</p>
                    </div>
                    <div>
                        <p>Produtos</p>
                        <p>[array, araay, array]</p>
                    </div>
                    <div>
                        <p>Status</p>
                        <p>Finalizada </p>
                    </div>

                </DivEmbaixoDoDashboard>

            </Content>
        </Container>
    );
};
export default Comercio;