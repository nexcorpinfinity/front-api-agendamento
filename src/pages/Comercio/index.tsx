import React from 'react';
import NavbarComercio from '../../components/NavbarComercio';
import styled from 'styled-components';
import { RootState } from '../../store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { temaGlobal } from '../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    position: absolute;
    display: flex;
    flex-direction: row;
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

const Comercio: React.FC = () => {
    const dataAtual: Date = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <NavbarComercio />
            <div>

                <h1>Cadastre o seu comercio</h1>
                <h1>veja nossos produtos etc</h1>

                <div>
                    <div>
                        <h1>Produtos Cadastrados</h1>
                        <p>20</p>
                    </div>
                    <div>
                        <h1>Vendas Realizadas</h1>
                        <p>20</p>
                    </div>
                    <div>
                        <h1>ultimo login</h1>
                        <p>{dataFormatada}</p>
                    </div>

                    <Card>
                        <h2>Visão Geral</h2>
                        <p>Métricas Principais: Exibição de KPIs importantes, como vendas totais, usuários ativos, conversões, entre outros.</p>
                        <p>Gráficos Resumidos: Resumo visual das principais métricas com gráficos de barras, linhas ou pizza.</p>
                    </Card>

                    <Card>
                        <h2>Estatísticas Detalhadas</h2>
                        <p>Vendas ou Receita: Total de vendas, receita acumulada, crescimento comparado ao mês anterior.</p>
                        <p>Produtos Mais Vendidos ou Populares: Lista dos produtos mais vendidos ou acessados.</p>
                        <p>Tendências: Análise de tendências e comportamento dos usuários.</p>
                    </Card>

                    <Card>
                        <h2>Filtros e Segmentação</h2>
                        <p>Filtros de Data: Visualizar dados de hoje, semana, mês ou período personalizado.</p>
                        <p>Segmentação por Categoria: Filtrar por categorias específicas de produtos ou serviços.</p>
                    </Card>

                    <Card>
                        <h2>Gerenciamento de Atividades</h2>
                        <p>Alertas e Notificações: Avisos sobre eventos importantes, como produtos esgotando ou novos pedidos.</p>
                        <p>Tarefas ou Ações Pendentes: Lista de tarefas ou ações que precisam ser realizadas.</p>
                    </Card>

                    <Card>
                        <h2>Listas e Detalhes</h2>
                        <p>Listagem de Produtos ou Pedidos: Exibir produtos cadastrados ou pedidos recentes.</p>
                        <p>Últimos Eventos ou Logs: Histórico de eventos, como últimas vendas, logins ou alterações feitas.</p>
                    </Card>

                    <Card>
                        <h2>Gerenciamento de Usuários e Acessos</h2>
                        <p>Perfil do Usuário: Informações do perfil, como foto, nome e dados de contato.</p>
                        <p>Permissões e Acessos: Controle de permissões para diferentes usuários.</p>
                    </Card>

                    <Card>
                        <h2>Relatórios e Exportações</h2>
                        <p>Geração de Relatórios: Gerar relatórios customizados com base nos dados disponíveis.</p>
                        <p>Exportação de Dados: Exportar dados em formatos como CSV, Excel ou PDF.</p>
                    </Card>

                    <Card>
                        <h2>Visualizações Customizáveis</h2>
                        <p>Temas de Cores: Alternar entre temas claro e escuro, ou personalizar o visual.</p>
                    </Card>

                    <Card>
                        <h2>Integrações e Conectividade</h2>
                        <p>Integrações com Outros Serviços: Conectar com APIs, sistemas de pagamento ou plataformas de análise para informações consolidadas.</p>
                    </Card>
                    <Card>
                        <h2>entrada de faturamento seria as vendas realizadas </h2>
                        <h2>teria q ter o total de vendas realizadas no mes,  </h2>
                        <h2>teria que ter as despesas do mes </h2>
                        <p>entao a soma seria as vendas - as despesas que daria = lucro mensal/diario no valor de x </p>
                        <p>mais um campo no navbar para sujestao de funcionalidade, feedback, relatar um problema </p>
                        <p>ter um painel para ver as atualizacoes com a data </p>
                        <p>ter um painel de notificacao</p>
                        <p>ter um painel chat em tempoo real ou por tempo</p>

                        <h2>Painel do Cliente</h2>
                        <ul>
                            <li><strong>Dashboard Principal:</strong>
                                <ul>
                                    <li>Resumo dos serviços contratados (número de usuários, uso de recursos, etc.).</li>
                                    <li>Métricas ou estatísticas relevantes (gráficos, comparações).</li>
                                    <li>Status das assinaturas (ativa, pendente, expirada) e notificações de renovação.</li>
                                </ul>
                            </li>
                            <li><strong>Gerenciamento de Assinaturas:</strong>
                                <ul>
                                    <li>Detalhes do plano ativo (tipo de plano, ciclo de pagamento, próximos vencimentos).</li>
                                    <li>Opções para upgrade, downgrade ou cancelamento de planos.</li>
                                    <li>Histórico de pagamentos e faturas (com opção de download).</li>
                                </ul>
                            </li>
                            <li><strong>Configurações de Conta:</strong>
                                <ul>
                                    <li>Gerenciamento de informações de perfil (nome, email, número de telefone).</li>
                                    <li>Opção para alterar senha e email de login.</li>
                                    <li>Configurações de notificações (email, SMS, etc.).</li>
                                </ul>
                            </li>
                            <li><strong>Suporte e Ajuda:</strong>
                                <ul>
                                    <li>Acesso ao suporte (chat, abertura de tickets, histórico de tickets).</li>
                                    <li>Base de conhecimento, FAQs e tutoriais em vídeo.</li>
                                    <li>Feedback do cliente sobre o serviço.</li>
                                </ul>
                            </li>
                            <li><strong>Integrações e API:</strong>
                                <ul>
                                    <li>Configuração de integrações com ferramentas externas (CRM, ERP, etc.).</li>
                                    <li>Gerenciamento de chaves de API e permissões.</li>
                                    <li>Documentação de API para desenvolvedores.</li>
                                </ul>
                            </li>
                            <li><strong>Relatórios e Logs:</strong>
                                <ul>
                                    <li>Histórico de atividades (ações realizadas no sistema, login, alterações).</li>
                                    <li>Relatórios personalizáveis baseados em dados do serviço.</li>
                                </ul>
                            </li>
                        </ul>

                        <h2>Painel do Administrador</h2>
                        <ul>
                            <li><strong>Dashboard de Controle:</strong>
                                <ul>
                                    <li>Visão geral das operações (número de clientes ativos, receita, métricas-chave).</li>
                                    <li>Alertas ou indicadores de problemas (suporte pendente, falhas em cobranças).</li>
                                    <li>Gráficos de crescimento, retenção e conversão.</li>
                                </ul>
                            </li>
                            <li><strong>Gerenciamento de Usuários:</strong>
                                <ul>
                                    <li>Lista de todos os usuários com filtros (ativos, inativos, banidos).</li>
                                    <li>Controle de permissões e papéis (admin, cliente, moderador).</li>
                                    <li>Ferramentas para editar, suspender ou remover contas.</li>
                                    <li>Verificação de documentos ou identidade, se aplicável.</li>
                                </ul>
                            </li>
                            <li><strong>Gerenciamento de Planos e Faturamento:</strong>
                                <ul>
                                    <li>Criação e edição de planos e preços (mensal, anual, customizado).</li>
                                    <li>Controle de cobranças e integração com gateways de pagamento (PayPal, Stripe).</li>
                                    <li>Emissão e envio automático de faturas por email.</li>
                                    <li>Gestão de assinaturas em massa e campanhas promocionais.</li>
                                </ul>
                            </li>
                            <li><strong>Suporte e Atendimento:</strong>
                                <ul>
                                    <li>Gerenciamento de tickets de suporte (prioridade, status, atribuição a agentes).</li>
                                    <li>Respostas automáticas ou baseadas em templates.</li>
                                    <li>Monitoramento de SLA (tempo de resposta, tempo de resolução).</li>
                                </ul>
                            </li>
                            <li><strong>Relatórios e Análises:</strong>
                                <ul>
                                    <li>Relatórios financeiros (receita, despesas, lucro líquido).</li>
                                    <li>Análise de comportamento de clientes (tempo de uso, recorrência, churn).</li>
                                    <li>Relatórios de retenção e crescimento de usuários.</li>
                                    <li>Ferramentas para exportar dados e gerar gráficos.</li>
                                </ul>
                            </li>
                            <li><strong>Configurações do Sistema:</strong>
                                <ul>
                                    <li>Configurações gerais (domínio, segurança, política de privacidade).</li>
                                    <li>Controle de integrações globais (API, plugins, serviços externos).</li>
                                    <li>Logs de sistema e monitoramento de erros.</li>
                                </ul>
                            </li>
                            <li><strong>Ferramentas de Marketing:</strong>
                                <ul>
                                    <li>Configuração de campanhas de email marketing e automação.</li>
                                    <li>Gestão de cupons de desconto, promoções e campanhas sazonais.</li>
                                    <li>Monitoramento de métricas de campanhas (taxa de abertura, conversão).</li>
                                </ul>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </Container>
    );
};
export default Comercio;