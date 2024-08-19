import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavbarComercio from '../../../components/NavbarComercio';
import AxiosRequest from '../../../services/axios/AxiosRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/modules/rootReducer';
import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    display: flex;
    flex-direction: row;
`;

export const Main = styled.div`
    width: 90%;
    margin: 0 auto;
    border: 1px solid black;
`;

export const ContainerProdutos = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Produto = styled.div`
    padding: 1rem 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    border: 1px solid #00000047;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`;

export const ProdutoFlag = styled.div`
    border: 1px solid #00000047;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const ProdutoButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    button:nth-child(1) {
        background-color: blue;
        color: white;
    }
    button:nth-child(2) {
        background-color: #ff0000;
        color: white;
    }

    button {
        padding: 0.7rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: #00000047;
        }

        &:active {
            transform: scale(0.78);
        }
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 10px;
    button {
        padding: 10px 20px;
        margin: 0 5px;
        border: none;
        background-color: #007BFF;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const SearchInput = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

export const BoxEdit = styled.div`
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BoxContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    outline: none;
    &:focus {
        border-color: #f39c12;
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    outline: none;
    &:focus {
        border-color: #f39c12;
    }
`;

export const Button = styled.button`
    border: none;
    padding: 8px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #f39c12;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: 0.2s;
    border-radius: 5px 5px 8px 8px;

    &:hover {
        background-color: #ffe3b3;
        color: #0000007c;
    }
    &:active {
        background-color: #f39c12;
        transform: scale(0.98);
    }
`;

export const TitlePoup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;

interface IEstoque {
    id: string;
    product_name: string;
    price: number;
    quantidade: number;
}

const ComercioControleDeEstoque: React.FC = () => {
    const [estoque, setEstoque] = useState<IEstoque[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isCadastro, setIsCadastro] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProducts() {
            const response = await AxiosRequest.get('/commerce/meus-produtos-cadastrados');
            setEstoque(response.data.todosProdutos);
        }
        fetchProducts();
    }, []);

    const filteredProducts = estoque.filter((item) => item.product_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEditTask = (): void => {
        setIsEdit(!isEdit);
    };
    const handleDeleteTask = (): void => {
        setIsDelete(!isDelete);
    };
    const handleCadastrarTask = (): void => {
        setIsCadastro(!isCadastro);
    };
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <Container $active={theme}>
            <NavbarComercio />

            <Main>
                <div>
                    <h3>Estoque</h3>
                </div>

                <ContainerProdutos>
                    <div>
                        <div>

                            <SearchInput
                                type="text"
                                placeholder="Digite o nome do produto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={handleCadastrarTask}>Cadastrar novo produto</button>
                        </div>
                    </div>

                    {currentProducts.map((item) => (
                        <Produto key={item.id}>
                            <div>
                                <h1>foto</h1>
                            </div>
                            <ProdutoFlag>
                                <h4>Produto</h4>
                                <p>{item.product_name}</p>
                            </ProdutoFlag>
                            <ProdutoFlag>
                                <h4>Preço do Produto</h4>
                                <p>R$ {item.price}</p>
                            </ProdutoFlag>
                            <ProdutoFlag>
                                <h4>Quantidade no estoque</h4>
                                <p>{item.quantidade}</p>
                            </ProdutoFlag>
                            <ProdutoButtons>
                                <button onClick={handleEditTask}>Editar</button>
                                <button onClick={handleDeleteTask}>Apagar</button>
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
                            <h3>Editar Produto </h3>

                            <button onClick={() => setIsEdit(false)}> fechar </button>
                        </TitlePoup>
                        <Input type="text" placeholder='Produto' />
                        <Input type="text" placeholder='preço' />
                        <Input type="text" placeholder='Quantidade' />
                        <Button>Salvar</Button>
                    </BoxContent>
                </BoxEdit>
            )}
            {isDelete && (
                <BoxEdit>
                    <BoxContent>
                        <TitlePoup>
                            <h3>Deseeja apagar o produto </h3>

                            <button onClick={() => setIsDelete(false)}> fechar </button>
                        </TitlePoup>
                        <Button>Sim</Button>
                        <Button>Não</Button>
                    </BoxContent>
                </BoxEdit>
            )}
            {isCadastro && (
                <BoxEdit>
                    <BoxContent>
                        <TitlePoup>
                            <h3>Cadastrar novo Produto </h3>

                            <button onClick={() => setIsCadastro(false)}> fechar </button>
                        </TitlePoup>
                        <Input type="text" placeholder='Produto' />
                        <Input type="text" placeholder='preço' />
                        <Input type="text" placeholder='Quantidade' />
                        <Button>Cadastrar</Button>
                    </BoxContent>
                </BoxEdit>
            )}
        </Container>
    );
};

export default ComercioControleDeEstoque;
