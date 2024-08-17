import React, { useContext, useState } from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Container } from './styled';
import { AuthContext } from '../../contexts/AuthProvider/modules/context';
import { efetuarLogin } from '../../contexts/AuthProvider/modules/actions';
import { Helmet } from 'react-helmet';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const ctx = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const resultado = await efetuarLogin(ctx?.setUserDispatch, email, password);
        console.log(resultado);
    };

    console.log(ctx);
    return (

        <Container>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <NavbarHome />
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </Container>
    );
};

export default Login;