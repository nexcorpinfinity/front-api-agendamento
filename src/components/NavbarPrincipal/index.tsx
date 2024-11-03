import React, { useState } from 'react';

import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { Container, ContentRight, Logo, MenuLateral, Nav } from './styled';
import { RegistredRouters } from '../../routers/RegistredRouters';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/modules/rootReducer';
import { toggleTheme } from '../../store/modules/theme/actions';
import ButtonDarkTheme from '../ButtonDarkTheme';
import NavbarLateral from '../NavbarLateral';

const NavbarPrincipal: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const theme = useSelector((state: RootState) => state.theme.theme);

  const [menuLateral, setMenuLateral] = useState<boolean>(false);

  const toggleMenuLateral = () => {
    setMenuLateral(!menuLateral);
  };

  // const handleNotificationClick = () => {
  //     setToggleNotification(!toggleNotification);
  // };
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Container $active={theme}>
      {isLoggedIn === true ? (
        <MenuLateral>
          <NavbarLateral setMenuLateral={setMenuLateral} />
          <RegistredRouters />
        </MenuLateral>
      ) : (
        <>
          {/* fazer a verificacao se  a permissao dele é igual a user para, se for oculta o meunu lateral */}
          <Nav>
            <Logo>
              {isLoggedIn && (
                <span>
                  <IoMenuSharp onClick={toggleMenuLateral} size={30} />
                </span>
              )}
              <h2>Ejnex</h2>
            </Logo>

            <ContentRight>
              <ButtonDarkTheme theme={theme} handleToggleTheme={handleToggleTheme} />
            </ContentRight>
          </Nav>
          <RegistredRouters />
        </>
      )}
    </Container>
  );
};

export default NavbarPrincipal;
