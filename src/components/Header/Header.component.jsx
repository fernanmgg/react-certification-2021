import React, { useState } from 'react';

import { drawerIcon, searchIcon, loginIcon } from './Header.icon';
import {
  StyledHeader,
  Overlay,
  DrawerMenu,
  DrawerItem,
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
} from './Header.style';

function Header({ setSearch, setVideo }) {
  const [showError, setShowError] = useState(false);
  const [drawer, setDrawer] = useState(false);

  function handleSearchEnter(event) {
    if (event.key === 'Enter') {
      if (event.target.value.length > 3) {
        setSearch(event.target.value);
        setVideo(null);
        setShowError(false);
      } else {
        setShowError(true);
      }
    }
  }

  function handleDrawerClick() {
    setDrawer(true);
  }

  function handleHomeClick() {
    setVideo(null);
    setDrawer(false);
  }

  function handleOverlayClick() {
    setDrawer(false);
  }

  return (
    <StyledHeader>
      {drawer && <Overlay onClick={handleOverlayClick} data-testid="overlay" />}
      <DrawerMenu DrawerMenu drawer={drawer}>
        <DrawerItem onClick={handleHomeClick} aria-label="home">
          Home
        </DrawerItem>
      </DrawerMenu>
      <Wrapper>
        <DrawerButton onClick={handleDrawerClick} aria-label="drawer">
          <Icon viewBox="0 0 24 24">
            <path d={drawerIcon} />
          </Icon>
        </DrawerButton>
        <SearchWrapper>
          <InlineIcon viewBox="0 0 24 24">
            <path d={searchIcon} />
          </InlineIcon>
          <Search
            aria-label="search"
            defaultValue="wizeline"
            onKeyPress={handleSearchEnter}
          />
        </SearchWrapper>
        {showError && <Message>Search must be more than 3 characters</Message>}
        <div style={{ flexGrow: 1 }} />
        <Options>
          <Toggle aria-label="theme" type="checkbox" />
          <span style={{ fontSize: '0.8em' }}>Dark Mode</span>
          <LoginButton aria-label="login">
            <Icon viewBox="0 0 24 24">
              <path d={loginIcon} />
            </Icon>
          </LoginButton>
        </Options>
      </Wrapper>
    </StyledHeader>
  );
}

export default Header;
