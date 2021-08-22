import React, { useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  ToggleText,
  AuthButton,
  PopupMenu,
  PopupItem,
  Icon,
  InlineIcon,
  GapFill,
} from './Header.style';
import Toggle from '../Toggle';
import { VideoContext } from '../../state/Video.state';
import Login from '../../views/Login';

function Header({ theme, toggleTheme }) {
  const node = useRef();
  const { state, dispatch } = useContext(VideoContext);
  const { auth, search } = state;
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState(false);
  const history = useHistory();

  const localAuth = localStorage.getItem('auth');
  if (localAuth && !auth) {
    dispatch({
      type: 'SET_AUTH',
      payload: { auth: JSON.parse(localAuth), remember: true },
    });
  }

  function fetchVideos(_search) {
    dispatch({ type: 'SET_SEARCH', payload: _search });
    history.push('/');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(_.debounce(fetchVideos, 500), []);

  function handleSearchChange(event) {
    debounce(event.target.value);
  }

  function handleDrawerClick() {
    setDrawer(true);
  }

  function handleHomeClick() {
    history.push('/');
    setDrawer(false);
  }

  function handleUserClick() {
    setUser(true);
  }

  function handleLoginClick() {
    setLogin(true);
    setUser(false);
    setDrawer(false);
  }

  function handleOverlayClick() {
    setDrawer(false);
    setLogin(false);
  }

  function handleLogoutClick() {
    dispatch({ type: 'UNSET_AUTH' });
  }

  function handleClick(e) {
    if (node.current.contains(e.target)) {
      return;
    }
    setUser(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <StyledHeader>
      {(drawer || login) && (
        <Overlay onClick={handleOverlayClick} data-testid="overlay" />
      )}
      <DrawerMenu drawer={drawer}>
        <DrawerItem onClick={handleHomeClick} aria-label="home">
          Home
        </DrawerItem>
        <DrawerItem hiddenItem>
          Dark Mode
          <GapFill />
          <Toggle toggleBackground={false} value={theme} toggle={toggleTheme} />
        </DrawerItem>
        {!auth && (
          <DrawerItem aria-label="login" onClick={handleLoginClick} hiddenItem>
            Login
          </DrawerItem>
        )}
        {auth && <DrawerItem hiddenItem>Favorites</DrawerItem>}
        {auth && (
          <DrawerItem onClick={handleLogoutClick} hiddenItem>
            Logout
          </DrawerItem>
        )}
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
            defaultValue={search}
            onChange={handleSearchChange}
          />
        </SearchWrapper>
        <GapFill />
        <Options ref={node}>
          <ToggleText>Dark Mode</ToggleText>
          <Toggle toggleBackground value={theme} toggle={toggleTheme} />
          <AuthButton onClick={handleUserClick} aria-label="auth">
            <Icon viewBox="0 0 24 24">
              <path d={loginIcon} />
            </Icon>
          </AuthButton>
          {user && (
            <PopupMenu>
              {!auth && (
                <PopupItem onClick={handleLoginClick} aria-label="login">
                  Login
                </PopupItem>
              )}
              {auth && <PopupItem aria-label="favorites">Favorites</PopupItem>}
              {auth && (
                <PopupItem aria-label="logout" onClick={handleLogoutClick}>
                  Logout
                </PopupItem>
              )}
            </PopupMenu>
          )}
        </Options>
      </Wrapper>
      {login && <Login close={handleOverlayClick} />}
    </StyledHeader>
  );
}

export default Header;
