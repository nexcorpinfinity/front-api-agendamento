import React, { useEffect, useState } from 'react';
import AxiosRequest from '../../../services/axios/AxiosRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules/rootReducer';
import Loading from '../../../components/Loading';
import { toast } from 'react-toastify';

import * as actions from '../../../store/modules/auth/actions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { IoClose } from 'react-icons/io5';

import { Container, ContainerProdutos, Main, PesquisaECadastro, TituloPage, SearchInput, Produto, ProdutoFlag, ProdutoButtons, Pagination, BoxEdit, BoxContent, TitlePoup, Input, Button } from './styled';

interface IEstoque {
    id: string;
    name: string;
    price: number;
    stock: number;

}

const ComercioControleDeEstoque: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [estoque, setEstoque] = useState<IEstoque[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isCadastro, setIsCadastro] = useState<boolean>(false);

    const [nomeDoProduto, setNomeDoProduto] = useState('');
    const [precoDoProduto, setPrecoDoProduto] = useState('');
    const [quantidadeDoProduto, setQuantidadeDoProduto] = useState<number>(0);

    const [newNomeDoProduto, setNewNomeDoProduto] = useState('');
    const [newPrecoDoProduto, setNewPrecoDoProduto] = useState('');
    const [newQuantidadeDoProduto, setNewQuantidadeDoProduto] = useState<number>(0);

    const [produtoEditando, setProdutoEditando] = useState<IEstoque | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');

                // console.log(response.data.todosProdutos)

                setEstoque(response.data.todosProdutos);
                setIsLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.response.status === 401) {
                    dispatch(actions.loginFailure({ error: 'Você não está logado' }));
                    toast.error('Você não está logado', { theme: 'colored' });
                    navigate('/login');
                }
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = estoque.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteTask = (product: IEstoque) => {
        setProdutoEditando(product);
        setIsDelete(true);
    };

    const handleCadastrarTask = (): void => {
        setIsCadastro(!isCadastro);
    };
    const theme = useSelector((state: RootState) => state.theme.theme);

    const cadastrarProduto = () => {

        const errorMessages = [];

        if (newNomeDoProduto === '') {
            errorMessages.push('Preencha o nome do produto');
        }

        if (newPrecoDoProduto === '') {
            errorMessages.push('Preencha o preço do produto');
        }

        if (errorMessages.length > 0) {
            errorMessages.forEach(message => toast.error(message, { theme: 'colored' }));
            return;
        }

        if (newQuantidadeDoProduto === 0) {
            toast.info('Produto está sendo cadastrado sem estoque', { theme: 'colored' });
        }

        console.log(newNomeDoProduto, newPrecoDoProduto, newQuantidadeDoProduto);

        try {
            AxiosRequest.post('/commerce/cadastrar-produtos', {
                name: newNomeDoProduto,
                price: newPrecoDoProduto,
                stock: newQuantidadeDoProduto
            });

            toast.success('Produto cadastrado com sucesso', { theme: 'colored' });

            setIsCadastro(false);

            setNewNomeDoProduto('');
            setNewPrecoDoProduto('');
            setNewQuantidadeDoProduto(0);

            window.location.reload();

        } catch (error) {
            console.log(error);
            if (error) {
                toast.error('Erro ao cadastrar produto', { theme: 'colored' });
            }
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setNewQuantidadeDoProduto(value);
        }
    };

    const handleEditTask = (product: IEstoque) => {
        setProdutoEditando(product);
        setNomeDoProduto(product.name);
        setPrecoDoProduto(product.price.toString());
        setQuantidadeDoProduto(product.stock);
        setIsEdit(true);
    };

    const handleUpdateProduto = () => {
        if (!produtoEditando) return;

        const errorMessages = [];

        if (nomeDoProduto === '') {
            errorMessages.push('Preencha o nome do produto');
        }

        if (precoDoProduto === '') {
            errorMessages.push('Preencha o preço do produto');
        }

        if (errorMessages.length > 0) {
            errorMessages.forEach(message => toast.error(message, { theme: 'colored' }));
            return;
        }

        if (quantidadeDoProduto === 0) {
            toast.info('Produto está sendo atualizado sem estoque', { theme: 'colored' });
        }

        try {
            AxiosRequest.put(`/commerce/atualizar-produto/${produtoEditando.id}`, {
                name: nomeDoProduto,
                price: precoDoProduto,
                stock: quantidadeDoProduto
            });

            toast.success('Produto atualizado com sucesso', { theme: 'colored' });

            setIsEdit(false);
            setProdutoEditando(null);

            setNomeDoProduto(nomeDoProduto);
            setPrecoDoProduto(precoDoProduto);
            setQuantidadeDoProduto(quantidadeDoProduto);

            setTimeout(() => {
                window.location.reload();
            }, 1500);

            // correçao de atualizar o produto
        } catch (error) {
            console.log(error);
            toast.error('Erro ao atualizar produto', { theme: 'colored' });
        }
    };

    const handleDeleteProduto = async (product: IEstoque) => {
        try {
            await AxiosRequest.delete(`/commerce/deletar-produto/${product.id}`);
            toast.success('Produto excluído com sucesso', { theme: 'colored' });
            setIsDelete(false);
            setEstoque(estoque.filter(item => item.id !== product.id));
        } catch (error) {
            console.log(error);
            toast.error('Erro ao excluir produto', { theme: 'colored' });
        }
    };

    return (
        <Container $active={theme}>
            <Loading isLoading={isLoading} />
            <Main>
                <TituloPage>
                    <h2>Estoque</h2>
                </TituloPage>
                <ContainerProdutos>
                    <PesquisaECadastro>
                        <SearchInput
                            type="text"
                            placeholder="Digite o nome do produto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleCadastrarTask}>Cadastrar novo produto</button>
                    </PesquisaECadastro>

                    {currentProducts.map((item, index) => (
                        <Produto key={index}>
                            <ProdutoFlag>
                                <h4>Produto</h4>
                                <p>{item.name}</p>
                            </ProdutoFlag>
                            <ProdutoFlag>
                                <h4>Preço do Produto</h4>
                                <p>R$ {item.price}</p>
                            </ProdutoFlag>
                            <ProdutoFlag>
                                <h4>Quantidade no estoque</h4>
                                <p>{item.stock}</p>
                            </ProdutoFlag>
                            <ProdutoButtons>
                                <button onClick={() => {
                                    handleEditTask(item);
                                }}>Editar</button>
                                <button onClick={() => handleDeleteTask(item)}>Apagar</button>
                            </ProdutoButtons>
                        </Produto>
                    ))}

                    <Pagination>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        {[...Array(totalPages).keys()].map((page) => (
                            <button
                                key={page + 1}
                                onClick={() => handlePageChange(page + 1)}
                                disabled={currentPage === page + 1}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Próxima
                        </button>
                    </Pagination>
                </ContainerProdutos>
            </Main>
            {isEdit && (
                <BoxEdit>
                    <BoxContent>
                        <TitlePoup>
                            <h3>Editar Produto</h3>
                            <span onClick={() => setIsEdit(false)}>
                                <IoClose size={25} />
                            </span>
                        </TitlePoup>
                        <Input
                            type="text"
                            placeholder='Produto'
                            value={nomeDoProduto}
                            onChange={(e) => setNomeDoProduto(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder='0.00'
                            value={precoDoProduto}
                            onChange={(e) => setPrecoDoProduto(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder='Quantidade'
                            value={quantidadeDoProduto}
                            onChange={(e) => setQuantidadeDoProduto(Number(e.target.value))}
                            min="0"
                        />
                        <Button onClick={handleUpdateProduto}>Salvar</Button>
                    </BoxContent>
                </BoxEdit>
            )}
            {isDelete && produtoEditando && (
                <BoxEdit>
                    <BoxContent>
                        <TitlePoup>
                            <h3>Deseja apagar o produto?</h3>
                            <span onClick={() => setIsDelete(false)}>
                                <IoClose size={25} />
                            </span>
                        </TitlePoup>
                        <div className='btns-delete'>
                            <Button onClick={() => handleDeleteProduto(produtoEditando)}>Sim</Button>
                            <Button onClick={() => setIsDelete(false)}>Não</Button>
                        </div>
                    </BoxContent>
                </BoxEdit>
            )}
            {isCadastro && (
                <BoxEdit>
                    <BoxContent>
                        <TitlePoup>
                            <h3>Cadastrar novo Produto </h3>

                            <span onClick={() => setIsCadastro(false)}>
                                <IoClose size={25} />
                            </span>
                        </TitlePoup>
                        <Input type="text" placeholder='Produto' onChange={(e) => setNewNomeDoProduto(e.target.value)} />
                        <Input type="text" placeholder='0.00' onChange={(e) => setNewPrecoDoProduto(e.target.value)} />
                        <Input type="number" placeholder='Quantidade' value={newQuantidadeDoProduto} onChange={handleChange} min="0" />
                        <Button onClick={cadastrarProduto}>Cadastrar</Button>
                    </BoxContent>
                </BoxEdit>
            )}
        </Container>
    );
};

export default ComercioControleDeEstoque;