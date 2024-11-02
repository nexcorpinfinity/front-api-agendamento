import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../store/modules/rootReducer';
import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
    background-color: ${(props) =>
        props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: #007bff;
    color: #ffffff;
    border-radius: 5px;
    &:hover {
        background-color: #0056b3;
    }
`;

export const Input = styled.input`
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 100%;
`;

export const DespesaContainer = styled.div`
    margin-top: 20px;
`;

export const VendaContainer = styled.div`
    margin-top: 20px;
`;

export const VendaItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #cccccc;
    cursor: pointer;
`;

export const VendaDetails = styled.div`
    padding-left: 20px;
    margin-top: 10px;
`;

const mockDespesas = [
    { nome: 'Aluguel', valor: 1500, data: '2024-09-01' },
    { nome: 'Internet', valor: 200, data: '2024-09-05' },
    { nome: 'Luz', valor: 300, data: '2024-09-10' },
];

const mockVendas = [
    { id: 1, quantidade: 10, valor: 100, data: '2024-09-01', produtos: ['Produto A', 'Produto B'] },
    { id: 2, quantidade: 5, valor: 200, data: '2024-09-02', produtos: ['Produto C'] },
    { id: 3, quantidade: 7, valor: 150, data: '2024-09-03', produtos: ['Produto D', 'Produto E'] },
];

const ComercioRelatorioMensal: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [despesas, setDespesas] = useState(mockDespesas);
    const [novaDespesa, setNovaDespesa] = useState({ nome: '', valor: 0, data: '' });
    const [vendas] = useState(mockVendas);
    const [vendaSelecionada, setVendaSelecionada] = useState<number | null>(null);

    const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
    const totalVendas = vendas.reduce((acc, venda) => acc + venda.valor, 0);
    const faturamentoMensal = totalVendas - totalDespesas;

    const handleAdicionarDespesa = () => {
        setDespesas([...despesas, novaDespesa]);
        setNovaDespesa({ nome: '', valor: 0, data: '' });
    };

    return (
        <Container $active={theme}>
            <h2>Relatório Mensal de Comércio</h2>

            <Button onClick={() => alert(`Faturamento Mensal: R$ ${faturamentoMensal}`)}>
                Faturamento Mensal
            </Button>

            <Button onClick={() => alert(`Faturamento Diário: R$ ${totalVendas}`)}>
                Faturamento Diário
            </Button>

            <DespesaContainer>
                <h3>Adicionar Despesa</h3>
                <Input
                    type="text"
                    placeholder="Nome da Despesa"
                    value={novaDespesa.nome}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                />
                <Input
                    type="number"
                    placeholder="Valor"
                    value={novaDespesa.valor}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: +e.target.value })}
                />
                <Input
                    type="date"
                    placeholder="Data"
                    value={novaDespesa.data}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })}
                />
                <Button onClick={handleAdicionarDespesa}>Adicionar Despesa</Button>
            </DespesaContainer>

            <VendaContainer>
                <h3>Vendas Realizadas</h3>
                {vendas.map((venda) => (
                    <div key={venda.id}>
                        <VendaItem
                            onClick={() =>
                                setVendaSelecionada(vendaSelecionada === venda.id ? null : venda.id)
                            }
                        >
                            {`Venda de R$ ${venda.valor} - ${venda.quantidade} produtos`}
                        </VendaItem>
                        {vendaSelecionada === venda.id && (
                            <VendaDetails>
                                <p>Data: {venda.data}</p>
                                <p>Produtos: {venda.produtos.join(', ')}</p>
                                <p>Total: R$ {venda.valor}</p>
                            </VendaDetails>
                        )}
                    </div>
                ))}
            </VendaContainer>
        </Container>
    );
};

export default ComercioRelatorioMensal;
