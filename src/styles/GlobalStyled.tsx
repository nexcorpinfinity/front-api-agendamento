import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import { temaGlobal } from './theme';

export const GlobalStyled = createGlobalStyle<{ $active: string | boolean }>`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
  background-color: ${(props) => (props.$active ? temaGlobal.backgroundDark : temaGlobal.backgroundLight)};
  color: ${(props) => (props.$active ? temaGlobal.colorDark : temaGlobal.colorLight)};
  transition: background-color 0.3s ease, color 0.3s ease;

  .Toastify {
    font-family: 'Roboto', sans-serif;

    .toast-container {
      width: auto;
      margin-top: 4%;
    }
  }
}
`;
