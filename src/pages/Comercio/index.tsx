import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa';

import { GrMoney } from 'react-icons/gr';
import { TbChartInfographic } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import DashboardCompoent from './DashboardComponent';
import { Container, CardContainers, Content, Titulo, IntroductionAndButton } from './styled';
import CardDashboardComercio from '../../components/CardDashboardComercio';
import { Decoded } from '../../routers/RotaPrivada';
import AxiosRequest from '../../services/axios/AxiosRequest';
import { AppDispatch } from '../../store';
import * as actions from '../../store/modules/auth/actions';
import { RootState } from '../../store/modules/rootReducer';

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

    const nome = decoded.name;
    console.log(decoded);

    useEffect(() => {
        document.title = 'Comercio';

        const fetchProdutos = async () => {
            try {
                const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
                const produtosCadastrados = response.data.todosProdutos;
                setProdutosCadastrados(produtosCadastrados.length);
            } catch (error: any) {
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
            path: '/comercio/controle-de-estoque',
        },
        {
            id: 2,
            nome: 'Vendas Hoje',
            quantidade: 5,
            icon: FaShoppingCart,
            path: '',
        },
        {
            id: 3,
            nome: 'Total Hoje',
            valor: 500,
            icon: GrMoney,
            path: '',
        },
        {
            id: 4,
            nome: 'Faturamento Mensal ',
            valor: 3000,
            icon: TbChartInfographic,
            path: '',
        },
    ];

    return (
        <Container $active={theme}>
            <Content $active={theme}>
                <Titulo>
                    <IntroductionAndButton>
                        <h2>Bem vindo novamente, {nome} </h2>
                    </IntroductionAndButton>
                    <div>
                        <p>Veja todo resumo do seu painel aqui</p>
                    </div>
                </Titulo>

                <CardContainers>
                    {obj.map((obj) => (
                        <CardDashboardComercio
                            key={obj.id}
                            nome={obj.nome}
                            quantidade={obj.quantidade}
                            valor={obj.valor}
                            Icon={obj.icon}
                            theme={theme}
                            link={obj.path}
                        />
                    ))}
                </CardContainers>

                <DashboardCompoent theme={theme} />
            </Content>
        </Container>
    );
};
export default Comercio;
