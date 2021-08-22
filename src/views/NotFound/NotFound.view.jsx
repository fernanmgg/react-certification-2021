import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, Modal, Title, Message } from './NotFound.style';

function NotFound() {
  return (
    <Wrapper>
      <Modal>
        <Title>Route not found</Title>
        <Message>
          Couldn&#39;t find accessed route <br />
          <Link to="/">&#60; Return to home page</Link>
        </Message>
      </Modal>
    </Wrapper>
  );
}

export default NotFound;
