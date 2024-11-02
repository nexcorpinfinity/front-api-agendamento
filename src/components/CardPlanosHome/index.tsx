import React from 'react';
import styled from 'styled-components';

export interface PlanosProps {
    plano: string;
    preco: string;
    tempo: string;
    descricao: string;
    onClick?: () => void;
}

// export const Container = styled.div`
//     background-color: white;
//     color: black;
//     border-radius: 10px;
//     padding: 20px;
//     width: 350px;
//     height: 370px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-evenly;
//     align-items: center;
//     span {
//         font-size: 12px;
//         font-weight: bold;
//         color: #473BF0;
//         background-color: #EDEBFE;
//         padding: 5px 10px;
//         margin: 5px 0;
//         border-radius: 15px;
//     }

//     h2 {
//         font-size: 30px;
//         font-weight: 700;
//         color: #473BF0
//     }

//     p {
//         padding: 5px 0px;
//         text-align: center;
//     }

//     button {
//         width: 100%;
//         border: none;
//         border-radius: 10px;
//         padding: 15px;
//         margin-top: 10px;
//         cursor: pointer;
//         transition: 0.5s;
//         color: white;
//         background-color: #473BF0;
//         font-weight: 600;
//     }
// `;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

// const CardPlanosHome: React.FC<PlanosProps> = ({ plano, preco, tempo, descricao, onClick }) => {
const CardPlanosHome: React.FC = () => {
    return (
        <Container>
            {/* <span>{plano}</span>
            <h2>{preco}</h2>
            <p>{tempo}</p>
            <p>{descricao}</p>
            <button onClick={onClick}>Comecar Gratuitamente</button> */}

            <div>
                <h1>14</h1>
                <h1>Dias gratis</h1>
            </div>
            <div className="cards">
                <div>
                    <h1>Experimente o plano Pro</h1>
                    <p>
                        Crie sua conta agora para utilizar gratuitamente o plano Pro por 14 dias.
                        Após o período de teste, você pode assinar um plano do Nex ou utilizar o
                        plano Grátis. Para testar o plano Premium, entre em contato conosco.
                    </p>
                </div>
                <div>
                    <div>
                        <h1>Teste sem compromisso</h1>
                        <p>Acesse o teste grátis sem precisar cadastrar o seu cartão de crédito.</p>
                    </div>
                    <div>
                        <h1>Controle total da assinatura</h1>
                        <p>Assinaturas no modelo pré-pago, sem burocracia e sem fidelidade.</p>
                    </div>
                </div>
                <div>
                    <button>Comece grátis</button>
                </div>
            </div>
        </Container>
    );
};

export default CardPlanosHome;
