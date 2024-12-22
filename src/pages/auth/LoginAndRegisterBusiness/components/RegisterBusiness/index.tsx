import axios from 'axios';
import { get } from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as Styled from './styled';

import { AppDispatch } from '../../../../../store';
import * as actions from '../../../../../store/modules/auth/actions';
import { GoogleButton } from '../GoogleButton';

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

  const formatPhoneNumber = (value: string) => {
    // Remove caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');
    // Adiciona formatação
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      const [, ddd, firstPart, secondPart] = match;
      return `(${ddd}) ${firstPart}-${secondPart}`;
    }
    return value; // Retorna sem formatação se não combinar
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let formattedValue = value;

    // Formatação do número de telefone
    if (name === 'number_phone') {
      formattedValue = formatPhoneNumber(value);
    }

    setFormValues((prev) => ({ ...prev, [name]: formattedValue }));
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

    if (!isFormValid()) {
      toast.info('Por favor, preencha todos os campos.', {
        theme: 'colored',
        position: 'top-left',
      });
      return;
    }

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

  const registereWithGoogle = () => {
    window.location.href = 'http://localhost:3001/api/v1/auth/google?accountType=business';
  };

  return (
    <Styled.Container>
      <Styled.FormTitle>
        <h2>Criar sua conta</h2>
        <p>FALTA FAZER VALIDACAO DOS INPUTS</p>
      </Styled.FormTitle>
      <Styled.ContainerForm onSubmit={handleSubmitCreated}>
        <Styled.FormContainerInputs>
          <Styled.FormsContactGroup>
            <input
              type="text"
              name="name"
              placeholder=" "
              value={formValues.name}
              onChange={handleInputChange}
              maxLength={50}
            />
            <label>Seu nome</label>
          </Styled.FormsContactGroup>
          <Styled.FormsContactGroup>
            <input
              type="text"
              name="name_business"
              placeholder=" "
              value={formValues.name_business}
              onChange={handleInputChange}
              maxLength={30}
            />
            <label>Nome do seu Comércio</label>
          </Styled.FormsContactGroup>
          <Styled.FormsContactGroup>
            <input
              type="text"
              name="number_phone"
              placeholder=" "
              value={formValues.number_phone}
              onChange={handleInputChange}
              maxLength={15}
            />
            <label>Número de telefone / WhatsApp</label>
          </Styled.FormsContactGroup>
          <Styled.FormsContactGroup>
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formValues.email}
              onChange={handleInputChange}
              maxLength={255}
            />
            <label>Email</label>
          </Styled.FormsContactGroup>
          <Styled.FormsContactGroup>
            <input
              type="password"
              name="password"
              placeholder=" "
              value={formValues.password}
              onChange={handleInputChange}
              maxLength={255}
            />
            <label>Senha</label>
          </Styled.FormsContactGroup>
        </Styled.FormContainerInputs>

        <>
          <p>Selecionar o seu segmento: </p>
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
        </>
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
          <button type="submit">Cadastrar</button>
        </Styled.FormButtonSubmit>
      </Styled.ContainerForm>
      <Styled.AskNewRegister>
        <p>Já possui uma conta?</p>
        <p onClick={handleAuth}>Fazer Login</p>
      </Styled.AskNewRegister>
      <Styled.LoginWithGoogle>
        <GoogleButton text="Cadastrar com o Google" onClick={registereWithGoogle} />
      </Styled.LoginWithGoogle>
    </Styled.Container>
  );
};

export { RegisterBusiness };
