import styled, { css } from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.backgroundTransparent};
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.text};
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 2;
`;

const DrawerMenu = styled.div`
  background-color: ${(props) => props.theme.background};
  position: fixed;
  height: 100%;
  transition: left 0.15s linear;
  width: 240px;
  z-index: 3;
  ${(props) => (props.drawer ? 'left: 0px;' : 'left: -240px;')}
`;

const DrawerItem = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.textLight};
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  color: ${(props) => props.theme.textLight};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  height: 64px;
  padding-left: 16px;
  text-align: left;
  transition: background-color 1s ease;
  width: inherit;
  &:hover {
    background-color: ${(props) => props.theme.backgroundFocus};
  }
  ${(props) =>
    props.hiddenItem &&
    css`
      @media (min-width: 600px) {
        display: none;
      },
    `}
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
  align-items: center;
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
  padding: 8px 8px 8px 36px;
  outline: none;
  transition: background-color 0.25s;
  width: inherit;
  &:hover {
    background-color: ${(props) => props.theme.backgroundTransparent};
  }
`;

const Options = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 600px) {
    display: none;
  }
`;

const ToggleText = styled.span`
  color: ${(props) => props.theme.textLight};
  font-size: 0.8rem;
  margin-right: 8px;
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
  margin-left: 8px;
  position: absolute;
  z-index: 1;
`;

const GapFill = styled.div`
  flex-grow: 1;
`;

export {
  StyledHeader,
  Overlay,
  DrawerMenu,
  DrawerItem,
  Wrapper,
  DrawerButton,
  SearchWrapper,
  Search,
  Options,
  ToggleText,
  LoginButton,
  Icon,
  InlineIcon,
  GapFill,
};
