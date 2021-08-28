import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #50bbbf;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 36px;
  box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.2);
  left: 50%;
  min-width: 360px;
  padding: 36px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  color: rgba(0, 0, 0, 0.5);
`;

const Message = styled.p`
  color: rgba(0, 0, 0, 0.8);
  & a {
    color: #50bbbf;
    text-decoration: none;
  }
`;

export { Wrapper, Modal, Title, Message };
