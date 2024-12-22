import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #00000057;
  width: 500px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  margin-bottom: 4rem;
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormTitle = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

export const FormContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormAsksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5px;
`;

export const FormAskCheck = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  input {
    width: 13px;
    height: 13px;
    cursor: pointer;
    color: blue;

    border: 1px solid #000000;
  }

  p {
    color: #000000b7;
    cursor: pointer;
  }
`;

export const FormButtonSubmit = styled.div`
  width: 100%;

  button {
    background-color: #043873dd;
    color: white;
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    font-size: 1.05rem;
    font-weight: bold;
    transition: 0.3s;
    &:hover {
      background-color: #104f96dd;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const AskNewRegister = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  p:nth-child(2) {
    color: #0084ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const FormsContactGroup = styled.div`
  width: 100%;
  position: relative;

  input {
    font-size: 1.05rem;
    display: flex;
    flex: 1 1 100%;
    width: 100%;
    height: 50px;
    padding: 10px 19px;
    background-color: white;
    color: #000000;
    border: 1px solid #0000005f;
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 1px solid #0084ff;
      ~ label {
        top: -10px;
        font-size: 1rem;
        background: white;
      }
    }

    &:not(:placeholder-shown) ~ label,
    &:focus ~ label {
      top: -10px;
      font-size: 0.9rem;

      background: white;
    }

    &:placeholder-shown ~ label {
      top: 15px;
      font-size: 1rem;
      background: none;
    }
  }

  label {
    color: #000000b7;
    font-size: 1rem;
    position: absolute;
    pointer-events: none;
    left: 15px;
    top: 15px;
    padding: 0 5px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
`;

export const ForgotPassword = styled.div`
  p {
    color: #0084ff;
    cursor: pointer;

    text-decoration: underline;
  }
`;

export const LoginWithGoogle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
