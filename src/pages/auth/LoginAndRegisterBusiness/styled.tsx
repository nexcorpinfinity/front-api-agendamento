import styled, { css } from 'styled-components';

interface BoxProps {
  isSwapped: boolean;
  color?: 'blue';
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 2.6rem - 13px);
  position: relative;
  overflow: hidden;
`;

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSwapped',
})<BoxProps>`
  width: 50%;
  height: 100vh;
  transition: transform 0.8s ease-out;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 20px;

  ${(props) =>
    props.isSwapped
      ? css`
          transform: translateX(${props.color === 'blue' ? '100%' : '-100%'});
        `
      : css`
          transform: translateX(0);
        `}
`;

export const BlueBox = styled(Box)`
  background-color: #043873;
  left: 0;
  z-index: 2;
`;

export const GreenBox = styled(Box)`
  right: 0;
  z-index: 1;
  color: #000;
`;
