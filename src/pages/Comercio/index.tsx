import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RootState } from '../../store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { temaGlobal } from '../../styles/theme';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from '../../Routers/RotaPrivada';
import CardDashboardComercio from '../../components/CardDashboardComercio';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    padding: 2rem;
 `;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1 1 30%;
  min-width: 300px;
  text-align: center;
  border: 1px solid #ddd;
`;

export const CardContainers = styled.div`
    background-color: white;
    /* border: 2px solid #afafaf; */
    border-radius: 20px;
    box-shadow: 0px 0px 0px #000;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
`;

export const EstoqueBaixoCard = styled.div`
    border: 1px solid white;
`;

const Comercio: React.FC = () => {
    const dataAtual: Date = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const theme = useSelector((state: RootState) => state.theme.theme);
    const user = useSelector((state: RootState) => state.auth.token);

    if (user === null) {
        return null;
    }

    const decoded: Decoded = jwtDecode(user);

    // console.log(decoded);

    const nome = decoded.nomeDoUsuario;

    const obj = [
        {
            id: 1,
            nome: 'Produtos cadastrados',
            quantidade: 20,
        },
        {
            id: 2,
            nome: 'Vendas realizadas hoje',
            quantidade: 5,

        },
        {
            id: 3,
            nome: 'Total de faturamento hoje',
            valor: 500,

        },
        {
            id: 4,
            nome: 'Faturamento Mensal ',
            valor: 3000,

        }
    ];

    useEffect(() => {
        document.title = 'Comercio';
    }, []);

    return (
        <Container $active={theme}>
            <div>

                <h1>Bem vindo {nome}</h1>

                <div>
                    <div>
                        <h3>Dashboard</h3>
                        <h3>Notificacoes</h3>
                    </div>
                    <CardContainers>
                        {obj.map((obj) => (
                            <CardDashboardComercio key={obj.id} nome={obj.nome} quantidade={obj.quantidade} valor={obj.valor} />
                        ))}
                    </CardContainers>

                    <p>alertas e notificacoes</p>
                    <p>tipo de plano</p>
                    <h3>resumo e alertas </h3>
                    <p>estoque baixo, ultima venda, produtos mais vendidos</p>

                    <EstoqueBaixoCard>
                        <div>
                            <h3>Produtos com estoque baixo de 10 produtos</h3>
                            <p>produto 1</p>
                            <p>produto 2</p>
                            <p>produto 3</p>
                        </div>
                    </EstoqueBaixoCard>
                </div>
            </div>
        </Container>
    );
};
export default Comercio;