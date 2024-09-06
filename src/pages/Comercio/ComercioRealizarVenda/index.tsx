import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules/rootReducer';
import { Container } from './styled';
import * as actions from '../../../store/modules/auth/actions';
import AxiosRequest from '../../../services/axios/AxiosRequest';
import { AppDispatch } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IEstoque {
    id: string;
    product_name: string;
    price: number;
    quantidade: number;
}

interface ICarrinho {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
}

const ComercioRealizarVenda: React.FC = () => {
    const [pesquisa, setPesquisa] = useState('');
    const [carrinho, setCarrinho] = useState<ICarrinho[]>([]);
    const [estoque, setEstoque] = useState<IEstoque[]>([]);

    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const produtosFiltrados = estoque.filter((produto) =>
        produto.product_name.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const adicionarAoCarrinho = (produto: IEstoque) => {
        const produtoExistente = carrinho.find((item) => item.id === produto.id);
        if (produtoExistente) {
            setCarrinho(
                carrinho.map((item) =>
                    item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                )
            );
        } else {
            setCarrinho([...carrinho, { id: produto.id, nome: produto.product_name, preco: produto.price, quantidade: 1 }]);
        }
    };

    const removerDoCarrinho = (produtoId: string) => {
        setCarrinho(carrinho.filter(item => item.id !== produtoId));
    };

    const aumentarQuantidade = (produtoId: string) => {
        setCarrinho(
            carrinho.map((item) =>
                item.id === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        );
    };

    const diminuirQuantidade = (produtoId: string) => {
        setCarrinho(
            carrinho.map((item) =>
                item.id === produtoId && item.quantidade > 1
                    ? { ...item, quantidade: item.quantidade - 1 }
                    : item
            )
        );
    };

    const calcularTotal = (): number => {
        return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    };

    useEffect(() => {
        document.title = 'Realizar Venda';
        async function fetchProducts() {
            try {
                const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
                setEstoque(response.data.todosProdutos);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    dispatch(actions.loginFailure({ error: 'Você não está logado' }));
                    toast.error('Você não está logado', { theme: 'colored' });
                    navigate('/login');
                }
            }
        }
        fetchProducts();
    }, [dispatch, navigate]);

    console.log(carrinho);

    return (
        <Container $active={theme}>
            <div className="esquerda">
                <h1>Produtos</h1>
                <input
                    type="text"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="Pesquisar produto"
                />
                <div>
                    {produtosFiltrados.map((produto) => (
                        <div key={produto.id}>
                            <p>{produto.product_name} - R${produto.price}</p>
                            <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao carrinho</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="direita">
                <h1>Carrinho</h1>
                <div>
                    {carrinho.map((item) => (
                        <div key={item.id}>
                            <p>
                                {item.nome} - R${item.preco} x {item.quantidade}
                            </p>
                            <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                            <button onClick={() => aumentarQuantidade(item.id)}>+</button>
                            <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                        </div>
                    ))}
                </div>
                <div>
                    <h1>Total</h1>
                    <p>R$ {calcularTotal()}</p>
                    <button
                        onClick={() => alert('Venda finalizada!')}
                        disabled={carrinho.length === 0}
                        style={{
                            backgroundColor: carrinho.length === 0 ? '#ccc' : '#4CAF50',
                            color: carrinho.length === 0 ? '#666' : '#fff',
                            cursor: carrinho.length === 0 ? 'not-allowed' : 'pointer',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px'
                        }}
                    >
                        Finalizar Venda
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default ComercioRealizarVenda;
