import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormTitle = styled.div``;

export const FormContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LabelAndInput = styled.label`
  display: flex;
  flex-direction: column;

  input {
    width: 400px;
    padding: 10px;
  }
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
  gap: 5px;
`;

export const FormButtonSubmit = styled.div`
  width: 100%;
  border: 1px solid black;
  button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
  }
`;

export const AskNewRegister = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;

  h1 {
    font-size: 14px;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;
