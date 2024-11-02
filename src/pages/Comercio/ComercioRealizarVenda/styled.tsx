import styled from 'styled-components';

import { temaGlobal } from '../../../styles/theme';

export const Container = styled.div<{ $active: string | boolean }>`
    display: flex;
    padding: 20px;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
    background-color: ${(props) =>
        props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight};
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
    width: 100%;

    .esquerda {
        flex: 1;
        padding: 10px;
        h1 {
            margin-bottom: 20px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        div {
            max-height: 720px;
            overflow-y: auto;

            & > div {
                padding: 10px;
                border-bottom: 1px solid #ccc;

                p {
                    margin: 0 0 10px 0;
                }

                button {
                    background-color: #28a745;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 4px;
                    cursor: pointer;

                    &:hover {
                        background-color: #218838;
                    }
                }
            }
        }
    }

    .direita {
        flex: 1;
        padding: 10px;
        border-left: 1px solid #ccc;

        h1 {
            margin-bottom: 20px;
        }

        .item-carrinho {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 4px;
        }

        .btn-remover {
            background-color: #dc3545;
            color: #fff;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background-color: #c82333;
            }
        }

        div {
            margin-bottom: 20px;

            p {
                font-size: 18px;
                font-weight: bold;
            }

            button {
                width: 100px;
                padding: 10px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;

                &:hover {
                    background-color: #0069d9;
                }
            }
        }
    }
`;
