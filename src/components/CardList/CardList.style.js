import styled from 'styled-components';

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  @media (min-width: 405px) {
    width: 385px;
  }
  @media (min-width: 770px) {
    width: 750px;
  }
  @media (min-width: 1135px) {
    width: 1115px;
  }
  @media (min-width: 1500px) {
    width: 1480px;
  }
  @media (min-width: 1865px) {
    width: 1845px;
  }
`;

const Message = styled.h2`
  color: ${(props) => props.theme.textLight};
  text-align: center;
  width: 100%;
`;

export { CardListWrapper, Message };
