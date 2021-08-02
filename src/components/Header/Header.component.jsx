import React, { useState, useCallback } from 'react';
import _ from 'lodash';

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
  Options,
  Toggle,
  LoginButton,
  Icon,
  InlineIcon,
} from './Header.style';

function Header({ search, setSearch, setVideo }) {
  const [drawer, setDrawer] = useState(false);

  function fetchVideos(_search) {
    setSearch(_search);
    setVideo(null);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(_.debounce(fetchVideos, 500), []);

  function handleChange(event) {
    debounce(event.target.value);
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
          <Search aria-label="search" defaultValue={search} onChange={handleChange} />
        </SearchWrapper>
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
