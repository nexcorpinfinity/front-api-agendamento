import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { MdAlternateEmail } from 'react-icons/md';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { IoPersonSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import * as actions from '../../store/modules/auth/actions';
import { Container, Form } from './styled';
import CadastroComercio from './CadastroComercio';
import { toast } from 'react-toastify';
import AxiosRequest from '../../services/axios/AxiosRequest';
import { AppDispatch } from '../../store';
import { get } from 'lodash';
import Loading from '../../components/Loading';

const Register: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const tokenMain = useSelector((state: RootState) => state.auth.token);

    const theme = useSelector((state: RootState) => state.theme.theme);
    const [preLogin, setPreLogin] = useState(false);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [nomeComercio, setNomeComercio] = useState('');
    const [cpfOuCnpj, setCpfOuCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [tokenTemporario, setTokenTemporario] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const prevPath = get(location, 'state.prevPath', '/');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Registrar';
    }, []);

    async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (nome === '' || sobrenome === '' || email === '' || senha === '') {
            toast.error('Preencha todos os campos');
            return;
        }

        try {
            setIsLoading(true);
            const cadastroUser = await cadastrarOUsuario(nome, sobrenome, email, senha);
            toast.success('Usuário cadastrado com sucesso');

            if (cadastroUser.status === 400) {
                return toast.error('Usuário já cadastrado');
            }

            const token = await fazerLogin(email, senha);

            if (token !== null && token !== undefined) {

                setTokenTemporario(token);
                setPreLogin(true);
                toast.success('Login realizado com sucesso');
                setIsLoading(false);
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.error[0].message);
            setIsLoading(false);
            console.error(error);
        }

    }

    async function cadastrarOUsuario(nome: string, sobrenome: string, email: string, senha: string) {
        console.log(nome, sobrenome, email, senha);

        const enviarDados = await AxiosRequest.post('/users/cadastrar-usuario', {
            first_name: nome,
            last_name: sobrenome,
            email: email,
            password: senha
        });

        console.log(enviarDados);

        return enviarDados;
    }

    async function fazerLogin(email: string, senha: string) {
        console.log(email, senha);

        const login = await AxiosRequest.post('/auth', {
            email: email,
            password: senha
        });

        return login.data.token;
    }

    async function cadastrarComercio(nomeDoComercio: string, cpfouCpnj: string, endereco: string) {
        console.log(nomeDoComercio, cpfouCpnj, endereco);

        const token = tokenTemporario || tokenMain;

        if (!token || token === undefined) {
            toast.error('Token não encontrado');
            return;
        }

        const cadastroComercio = await AxiosRequest.post(
            '/commerce/cadastrar',
            {
                comercio_name: nomeDoComercio,
                cpf_cnpj: cpfouCpnj,
                endereco: endereco
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return cadastroComercio;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('Dados enviados:', {
            nomeComercio,
            cpfOuCnpj,
            endereco
        });
        setIsLoading(true);

        try {
            const cadastrandocomercio = await cadastrarComercio(nomeComercio, cpfOuCnpj, endereco);
            toast.success('Comercio cadastrado com sucesso');

            if (isLoggedIn === true) {

                setIsLoading(false);
                toast.info('Por favor, Faça login novamente');
                dispatch(actions.loginFailure({ error: 'Faça login novamente' }));
                return navigate('/login');

            } else if (cadastrandocomercio?.status === 200) {
                setTimeout(() => {
                    dispatch(actions.loginRequest({ email: email, password: senha, prevPath }));
                    navigate('/login');
                    setIsLoading(false);
                }, 2000);
            };

        } catch (error) {
            setIsLoading(false);

            console.log(error);
        }
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            {preLogin === false && isLoggedIn === false ? (
                <Container $active={theme}>
                    <Form className="form" onSubmit={handleCadastro}>
                        <div className="flex-column">
                            <label>Nome </label>
                        </div>
                        <div className="inputForm">
                            <IoPersonSharp color='black' size={22} />
                            <input type="text" className="input" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="flex-column">
                            <label>Sobrenome </label>
                        </div>
                        <div className="inputForm">
                            <IoPersonSharp color='black' size={22} />
                            <input type="text" className="input" placeholder="Digite seu sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                        </div>
                        <div className="flex-column">
                            <label>Email </label>
                        </div>
                        <div className="inputForm">
                            <MdAlternateEmail color='black' size={22} />
                            <input type="email" className="input" placeholder="Digite seu Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex-column">
                            <label>Senha</label>
                        </div>
                        <div className="inputForm">
                            <HiOutlineLockClosed color='black' size={22} />
                            <input type="password" className="input" placeholder="Digite Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <button className="button-submit">Cadastrar</button>
                        <p className="p">Já possui conta ?<Link to={'/login'}><span className="span">Faça Login</span></Link></p>

                    </Form>
                </Container>
            ) : (
                <CadastroComercio
                    theme={theme}
                    nomeDoComercio={nomeComercio}
                    cpfOuCpnj={cpfOuCnpj}
                    endereco={endereco}
                    setNomeDoComercio={setNomeComercio}
                    setCpfOuCpnj={setCpfOuCnpj}
                    setEndereco={setEndereco}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};
export default Register;