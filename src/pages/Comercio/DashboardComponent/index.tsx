import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

export const Container = styled.div`
    background-color: white;
    padding: 10px;
    width: 100%;
    max-width: 1200px;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const DashboardCompoent: React.FC = () => {

    const dadosVendas = [
        { dia: 'Segunda', vendas: 150, saldoTotal: 1500 },
        { dia: 'Terça', vendas: 200, saldoTotal: 200 },
        { dia: 'Quarta', vendas: 170, saldoTotal: 700 },
        { dia: 'Quinta', vendas: 210, saldoTotal: 1500 },
        { dia: 'Sexta', vendas: 20, saldoTotal: 200 },
        { dia: 'Sábado', vendas: 90, saldoTotal: 900 },
        { dia: 'Domingo', vendas: 120, saldoTotal: 1200 },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = (payload: any, label: any) => {
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

    const EstoqueBaixoCard = styled.div`
        border: 1px solid white;
        width: 200px;
`;

    return (
        <Container>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={dadosVendas}
                    margin={{ top: 50, right: 30, bottom: 20, left: 20 }}
                >
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="vendas" stroke="#8884d8" dot={false} name="Vendas" />
                    <Line type="monotone" dataKey="saldoTotal" stroke="#82ca9d" dot={false} name="Saldo Total" />
                </LineChart>
            </ResponsiveContainer>

            <EstoqueBaixoCard>
                <h3>Estoque baixo</h3>
                <p>produto 1</p>
                <p>produto 2</p>
                <p>produto 3</p>
                <p>produto 4</p>
                <p>produto 5</p>
                <p>produto 6</p>
            </EstoqueBaixoCard>
        </Container>
    );
};

export default DashboardCompoent;