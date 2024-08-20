import React from 'react';
import styled from 'styled-components';
import { temaGlobal } from '../../styles/theme';
interface ButtonDarkThemeProps {
    theme: boolean;
    handleToggleTheme: () => void;
}

export const ButtonDarkThemeStyled = styled.div<{ $active: string | boolean }>`

display: flex;
flex-direction: row;
padding: 5px 20px ;
justify-content: space-between;
align-items: center;
h4 {
    color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};

}

.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 20px;
}



.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #014c85;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

`;

const ButtonDarkTheme: React.FC<ButtonDarkThemeProps> = ({ theme, handleToggleTheme }) => {
    return (
        <ButtonDarkThemeStyled $active={theme}>
            <h4>Tema {theme === false ? 'escuro' : 'claro'}</h4>
            <label className="switch">
                <input type="checkbox" checked={theme === true} onChange={handleToggleTheme} className="checkbox" />
                <span className="slider"></span>
            </label>
        </ButtonDarkThemeStyled>
    );
};

export default ButtonDarkTheme;