import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import React, { useState } from 'react';
import { AppDispatch } from '../../store';
import { toggleTheme } from '../../store/modules/theme/actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import { Badge, Container, ContentRight, IntroductionAndButton, Links, LinksHomeNotLogin, Logo, MenuLateral, Nav, NotificationContainer, NotificationDiv, ProfileDiv } from './styled';
import { IoMenuSharp } from 'react-icons/io5';
import RotasRegistradas from '../../Routers/RotasRegistradas';
import NavbarLateral from '../NavbarLateral';
import ButtonDarkTheme from '../ButtonDarkTheme';
import { FaBell, FaRegUserCircle } from 'react-icons/fa';

const NavbarPrincipal: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const theme = useSelector((state: RootState) => state.theme.theme);

    const [menuLateral, setMenuLateral] = useState<boolean>(false);
    const [notifications] = useState<number>(10);
    const [toggleNotification, setToggleNotification] = useState<boolean>(false);

    const [perfilOptions, setPerfilOptions] = useState<boolean>(false);

    const toggleMenuLateral = () => {
        setMenuLateral(!menuLateral);
    };

    const dispatch = useDispatch<AppDispatch>();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(actions.loginFailure({ error: 'Unauthorized' }));
        setMenuLateral(false);
        navigate('/');
        toast.info('Você fez Logout no Sistema', { theme: 'colored' });
    };

    const handleNotificationClick = () => {
        setToggleNotification(!toggleNotification);
    };

    return (
        <Container>
            <Nav>
                <Logo>
                    {isLoggedIn && (
                        <span>
                            <IoMenuSharp onClick={toggleMenuLateral} size={30} />
                        </span>
                    )}
                    <h2>Saas</h2>
                </Logo>
                {isLoggedIn === false && (
                    <LinksHomeNotLogin>
                        <Links to='/'>Home</Links>
                        <Links to="/sobre">Sobre</Links>
                    </LinksHomeNotLogin>
                )}
                <ContentRight>
                    {isLoggedIn === true && (
                        <IntroductionAndButton>
                            <NotificationContainer onClick={handleNotificationClick}>
                                <NotificationDiv>
                                    <FaBell size={20} />
                                </NotificationDiv>
                                {notifications > 0 && (
                                    <Badge>{notifications}</Badge>
                                )}
                            </NotificationContainer>
                            {toggleNotification && (
                                <div className='noti-poupap'>
                                    <p>Notificações</p>
                                    <button onClick={() => setToggleNotification(false)}>X</button>
                                </div>
                            )}
                        </IntroductionAndButton>
                    )}

                    <ButtonDarkTheme theme={theme} handleToggleTheme={handleToggleTheme} />

                    {isLoggedIn === true && (
                        <>
                            <ProfileDiv onClick={() => setPerfilOptions(!perfilOptions)}>
                                <FaRegUserCircle size={25} />

                            </ProfileDiv>
                            {perfilOptions && (
                                <>
                                    <Links to="" onClick={(e) => {
                                        handleLogout(e);
                                        setPerfilOptions(false);
                                    }}>Sair</Links>
                                </>
                            )}
                        </>
                    )}

                    {isLoggedIn === false && (
                        <Links to="/login">Login</Links>
                    )}

                </ContentRight>
            </Nav>
            <MenuLateral>
                {menuLateral && <NavbarLateral setMenuLateral={setMenuLateral}/>}
                <RotasRegistradas />
            </MenuLateral>
        </Container>
    );
};

export default NavbarPrincipal;