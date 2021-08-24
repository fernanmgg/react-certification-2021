import styled, { css } from 'styled-components';

const Modal = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  left: 50%;
  padding: 0 16px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  z-index: 3;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.textLight};
`;

const ErrorMessage = styled.div`
  background-color: ${(props) => props.theme.accentTransparent};
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 4px;
  color: ${(props) => props.theme.accent};
  font-size: 0.9rem;
  margin: 0 0 16px 0;
  max-height: 4.8rem;
  overflow: hidden;
  padding: 4px 8px;
`;

const InputWrapper = styled.label`
  height: 72px;
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  background-color: transparent;
  border-bottom: 2px solid ${(props) => props.theme.textLight};
  border-left: none;
  border-right: none;
  border-top: none;
  box-sizing: border-box;
  color: ${(props) => props.theme.text};
  height: 2rem;
  outline: none;
  transition: border-bottom 0.25s;
  width: 100%;
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.accent};
  }
`;

const InputLabelMod = css`
  color: ${(props) => props.theme.accent};
  font-size: 0.75rem;
  transform: translateY(-16px);
`;

const InputLabel = styled.span`
  color: ${(props) => props.theme.textLight};
  left: 0;
  position: absolute;
  transition-duration: 0.25s;
  transition-property: color, font-size, transform;
  z-index: -1;
  ${Input}:focus ~ & {
    ${InputLabelMod}
  }
  ${(props) => props.active && InputLabelMod}
`;

const Checkbox = styled.label`
  color: ${(props) => props.theme.textLight};
  font-size: 0.9rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.accent};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 8px;
  padding: 8px;
  transition: background-color 0.25s;
  &:hover {
    background-color: ${(props) => props.theme.accentTransparent};
  }
`;

export {
  Modal,
  Title,
  ErrorMessage,
  InputWrapper,
  Input,
  InputLabel,
  Checkbox,
  ButtonWrapper,
  Button,
};
