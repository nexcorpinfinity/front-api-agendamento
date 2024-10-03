import { temaGlobal } from '../../../styles/theme';
import styled from 'styled-components';

export const Container = styled.div<{ $active: string | boolean }>`
    width: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    display: flex;
    flex-direction: row;
    padding: 1.5rem 2rem;
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    font-family: "Inter", sans-serif;
`;

export const Main = styled.div`
    width: 100%;
    margin: 0 auto;
    /* border: 1px solid black; */
`;

export const ContainerProdutos = styled.div`
    /* border: 1px solid black; */
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
    /* border: 1px solid #00000047; */
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
    margin-top: 10px;
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
    button:active {
        transform: scale(0.98);
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const SearchInput = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 65%;
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

.btns-delete{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px
}
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
    padding: 5px;
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
    background-color: #123bf3;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: 0.2s;
    border-radius: 5px 5px 8px 8px;

    &:active {

        transform: scale(0.95);
    }
`;

export const TitlePoup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    color: black;
    span {
        cursor: pointer;
    }
`;

export const PesquisaECadastro = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    align-items: center;
    button {
        border: none;
        padding: 15px 20px;
        font-size: 1rem;
        cursor: pointer;
        background-color: #007BFF;
        color: #fff;
        letter-spacing: 0.5px;
        transition: 0.2s;
        border-radius: 5px 5px 8px 8px;

        &:active {
            transform: scale(0.98);
        }
    }
`;

export const TituloPage = styled.div`
    /* padding: 15px 2.7rem; */
`;