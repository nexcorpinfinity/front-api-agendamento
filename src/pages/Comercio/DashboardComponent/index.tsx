import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import AxiosRequest from '../../../services/axios/AxiosRequest';
import { TooltipProps } from 'recharts';
import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    padding: 10px;
    width: 100%;
    max-width: 1250px;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 25px;
`;

const EstoqueBaixoCard = styled.div`
    border: 1px solid #ccc;
    padding: 10px 20px;
    width: 300px;
    text-align: center;
    border-radius: 10px;

    h3{
    font-size: 1rem;
    }

    .baixo-stoque{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .title-baixo-estoque {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:  5px 10px;
        font-size: 0.8rem;
    }
`;

const Produtos = styled.div`
    width: 300px;
`;

const TitleProdutos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 20px;
    margin: 0 10px;


    div:nth-child(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
    }
    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
    }
`;

const PaginationButtons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;

    button {
        padding: 5px 10px;
        background-color: #8884d8;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

interface IEstoque {
    id: string;
    product_name: string;
    price: number;
    quantidade: number;
}

type ThemeProps = {
    theme: boolean | string;
}

type ICustomTooltipProps = TooltipProps<number, string>;

const DashboardComponent: React.FC<ThemeProps> = ({ theme }) => {
    const [produtosComEstoqueBaixo, setProdutosComEstoqueBaixo] = useState<IEstoque[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 9;

    const dadosVendas = [
        { dia: 'Segunda', vendas: 150, saldoTotal: 1500 },
        { dia: 'Terça', vendas: 200, saldoTotal: 2000 },
        { dia: 'Quarta', vendas: 170, saldoTotal: 700 },
        { dia: 'Quinta', vendas: 210, saldoTotal: 1500 },
        { dia: 'Sexta', vendas: 20, saldoTotal: 200 },
        { dia: 'Sábado', vendas: 90, saldoTotal: 900 },
        { dia: 'Domingo', vendas: 120, saldoTotal: 1200 },
    ];

    const CustomTooltip: React.FC<ICustomTooltipProps> = ({ payload, label }) => {
        if (payload && payload.length) {
            const { vendas, saldoTotal } = payload[0].payload;
            return (
                <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '5px' }}>
                    <p>{label}</p>
                    <p>Vendas: {vendas} unidades</p>
                    <p>Saldo Total: R$ {saldoTotal.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        document.title = 'Comercio';

        const fetchProdutos = async () => {
            const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
            const produtosCadastrados = response.data.todosProdutos;

            const produtosBaixoEstoque = produtosCadastrados.filter(
                (produto: IEstoque) => parseInt(produto.quantidade.toString(), 10) < 10
            );
            setProdutosComEstoqueBaixo(produtosBaixoEstoque);
        };

        fetchProdutos();
    }, []);

    const indexUltimoProduto = paginaAtual * produtosPorPagina;
    const indexPrimeiroProduto = indexUltimoProduto - produtosPorPagina;
    const produtosExibidos = produtosComEstoqueBaixo.slice(indexPrimeiroProduto, indexUltimoProduto);

    const totalPaginas = Math.ceil(produtosComEstoqueBaixo.length / produtosPorPagina);

    const handleProximaPagina = () => {
        setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas));
    };

    const handlePaginaAnterior = () => {
        setPaginaAtual((prev) => Math.max(prev - 1, 1));
    };

    return (
        <Container $active={theme}>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dadosVendas} margin={{ top: 50, right: 35, bottom: 20, left: 20 }}>
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="vendas" stroke="#8884d8" dot={false} name="Vendas" />
                    <Line type="monotone" dataKey="saldoTotal" stroke="#82ca9d" dot={false} name="Saldo Total" />
                </LineChart>
            </ResponsiveContainer>

            <EstoqueBaixoCard>
                <h3>Produtos com Estoque baixo: {produtosComEstoqueBaixo.length}</h3>
                <div className='title-baixo-estoque'>
                    <p>Nome</p>
                    <p>Quantidade</p>
                </div>
                <div className='baixo-stoque'>
                    {produtosExibidos.map((produto) => (
                        <Produtos key={produto.id}>
                            <TitleProdutos>
                                <div>

                                    <p>{produto.product_name}</p>
                                </div>
                                <div>

                                    <p>{produto.quantidade}</p>
                                </div>
                            </TitleProdutos>
                        </Produtos>
                    ))}
                </div>

                <PaginationButtons>
                    <button onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>
                        Anterior
                    </button>
                    <button onClick={handleProximaPagina} disabled={paginaAtual === totalPaginas}>
                        Próximo
                    </button>
                </PaginationButtons>
            </EstoqueBaixoCard>
        </Container>
    );
};

export default DashboardComponent;
