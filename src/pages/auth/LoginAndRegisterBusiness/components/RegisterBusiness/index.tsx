import axios from 'axios';
import { get } from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Styled from './styled';

import { AppDispatch } from '../../../../../store';
import * as actions from '../../../../../store/modules/auth/actions';

interface Segment {
  id: string;
  name: string;
}

interface IRegisterBusiness {
  handleAuth(): void;
}

const RegisterBusiness: React.FC<IRegisterBusiness> = ({ handleAuth }) => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [segmentsTypes, setSegmentsTypes] = useState<Segment[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('');
  const [selectedSegmentTypeId, setSelectedSegmentTypeId] = useState<string>('');
  const [formValues, setFormValues] = useState({
    name: '',
    name_business: '',
    number_phone: '',
    email: '',
    password: '',
    segment_type_id: '',
  });

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/segments');
        const data = response.data;

        if (data.status === 200) {
          setSegments(data.resource);
        } else {
          console.error('Erro ao obter segmentos:', data.message);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchSegments();
  }, []);

  useEffect(() => {
    const fetchSegmentsType = async () => {
      if (selectedSegmentId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/v1/segments/types?segment_id=${selectedSegmentId}`,
          );
          const data = response.data;
          setSegmentsTypes(data.resource);
          setSelectedSegmentTypeId('');
        } catch (error) {
          console.error('Erro na requisição dos segments type:', error);
        }
      }
    };

    fetchSegmentsType();
  }, [selectedSegmentId]);

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, segment_type_id: selectedSegmentTypeId }));
  }, [selectedSegmentTypeId]);

  const handleSegmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSegmentId(event.target.value);
  };

  const handleSegmentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSegmentTypeId(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const isValid =
      Object.values(formValues).every((value) => value.trim() !== '') &&
      selectedSegmentId !== '' &&
      selectedSegmentTypeId !== '';
    // console.log('Form Valid:', isValid, { formValues });
    return isValid;
  };

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const prevPath = get(location, 'state.prevPath', '/');

  const handleSubmitCreated = async (e: FormEvent) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const { data } = await axios.post('http://localhost:3001/api/v1/users/business', {
          name: formValues.name,
          name_business: formValues.name_business,
          number_phone: formValues.number_phone,
          email: formValues.email,
          password: formValues.password,
          segment_type_id: selectedSegmentTypeId,
        });

        console.log(data);

        // precisa fazer validacao de campos ainda
        //

        dispatch(
          actions.loginRequest({
            email: formValues.email,
            password: formValues.password,
            stay_connected: false,
            prevPath,
          }),
        );

        toast.success('Usuário criado com sucesso!');
      } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
          const errors = error.response.data.errors;
          if (errors && errors.length > 0) {
            errors.forEach((err: { message: string }) => {
              toast.error(err.message);
            });
          } else {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error('Erro na requisição. Tente novamente.');
        }
      }
    }
  };
  return (
    <Styled.Container>
      <Styled.FormTitle>
        <h1>Register</h1>
      </Styled.FormTitle>
      <Styled.ContainerForm onSubmit={handleSubmitCreated}>
        <Styled.FormContainerInputs>
          <Styled.LabelAndInput htmlFor="name">
            Seu nome
            <input
              type="text"
              name="name"
              placeholder="Digite seu Nome"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Styled.LabelAndInput>
          <Styled.LabelAndInput htmlFor="name_business">
            Nome do seu Comércio
            <input
              type="text"
              name="name_business"
              placeholder="Digite o nome do seu Comércio"
              value={formValues.name_business}
              onChange={handleInputChange}
            />
          </Styled.LabelAndInput>
          <Styled.LabelAndInput htmlFor="number_phone">
            Número de telefone / WhatsApp
            <input
              type="text"
              name="number_phone"
              placeholder="Digite o Número de telefone / WhatsApp"
              value={formValues.number_phone}
              onChange={handleInputChange}
            />
          </Styled.LabelAndInput>
          <Styled.LabelAndInput htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Digite seu Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Styled.LabelAndInput>
          <Styled.LabelAndInput htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              placeholder="Digite sua Senha"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </Styled.LabelAndInput>
        </Styled.FormContainerInputs>

        <div>
          Selecionar o seu segmento
          <select
            name="segment"
            id="segment"
            value={selectedSegmentId}
            onChange={handleSegmentChange}
          >
            <option value="" disabled>
              Selecione um segmento
            </option>
            {segments.map((segment) => (
              <option key={segment.id} value={segment.id}>
                {segment.name}
              </option>
            ))}
          </select>
        </div>
        {selectedSegmentId && (
          <div>
            <select
              name="segmentType"
              id="segmentType"
              value={selectedSegmentTypeId}
              onChange={handleSegmentTypeChange}
            >
              <option value="" disabled>
                Selecione um tipo de segmento
              </option>
              {segmentsTypes.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Styled.FormButtonSubmit>
          <button type="submit" disabled={!isFormValid()}>
            Cadastrar
          </button>
        </Styled.FormButtonSubmit>
      </Styled.ContainerForm>
      <Styled.AskNewRegister>
        <p>Já possui uma conta?</p>
        <h1 onClick={handleAuth}>Fazer Login</h1>
      </Styled.AskNewRegister>
    </Styled.Container>
  );
};

export { RegisterBusiness };
