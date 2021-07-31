import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.backgroundTransparent};
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.text};
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  min-height: 64px;
  padding: 0 24px;
`;

const DrawerButton = styled.button`
  background-color: transparent;
  border: 0;
  border-radius: 100%;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: ${(props) => props.theme.backgroundTransparent};
  }
`;

const SearchWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundTransparent};
  border-radius: 8px;
  display: flex;
  margin-left: 32px;
  position: relative;
  width: 20ch;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Search = styled.input`
  background: none;
  border: 0;
  border-radius: inherit;
  color: ${(props) => props.theme.text};
  font-size: 0.9rem;
  padding: 8px 8px 8px 32px;
  outline: none;
  transition: background-color 0.25s;
  width: inherit;
  &:hover {
    background-color: ${(props) => props.theme.title};
  }
`;

const Message = styled.span`
  color: ${(props) => props.theme.textLight};
  font-size: 0.7rem;
  margin: 0 8px;
  text-align: center;
`;

const Options = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const Toggle = styled.input`
  cursor: pointer;
  height: 1.5em;
  margin-right: 8px;
  width: 1.5em;
`;

const LoginButton = styled.button`
  background-color: ${(props) => props.theme.backgroundTransparent};
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 24px;
`;

const Icon = styled.svg`
  fill: ${(props) => props.theme.text};
  font-size: 1.5rem;
  height: 1em;
  width: 1em;
`;

const InlineIcon = styled(Icon)`
  position: absolute;
  z-index: 1;
`;

export {
  StyledHeader,
  Wrapper,
  DrawerButton,
  SearchWrapper,
  Search,
  Message,
  Options,
  Toggle,
  LoginButton,
  Icon,
  InlineIcon,
};
