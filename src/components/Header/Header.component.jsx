import React from 'react';

import { drawerIcon, searchIcon, loginIcon } from './Header.icon';
import {
  StyledHeader,
  HeaderWrapper,
  DrawerButton,
  SearchWrapper,
  Search,
  OptionsMenu,
  Toggle,
  LoginButton,
  Icon,
  InlineIcon,
} from './Header.style';

function Header() {
  return (
    <StyledHeader>
      <HeaderWrapper>
        <DrawerButton aria-label="drawer">
          <Icon viewBox="0 0 24 24">
            <path d={drawerIcon} />
          </Icon>
        </DrawerButton>
        <SearchWrapper>
          <InlineIcon viewBox="0 0 24 24">
            <path d={searchIcon} />
          </InlineIcon>
          <Search aria-label="search" defaultValue="wizeline" />
        </SearchWrapper>
        <div style={{ flexGrow: 1 }} />
        <OptionsMenu>
          <Toggle aria-label="theme" type="checkbox" />
          <span style={{ fontSize: '0.8em' }}>Dark Mode</span>
          <LoginButton aria-label="login">
            <Icon viewBox="0 0 24 24">
              <path d={loginIcon} />
            </Icon>
          </LoginButton>
        </OptionsMenu>
      </HeaderWrapper>
    </StyledHeader>
  );
}

export default Header;
