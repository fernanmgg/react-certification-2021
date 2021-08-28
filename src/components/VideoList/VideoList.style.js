import styled from 'styled-components';

const StyledVideoList = styled.div`
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

const StyledVideoListRel = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  flex: 1 1 0;
  overflow-y: scroll;
  padding-top: 8px;
`;

const Message = styled.h2`
  color: ${(props) => props.theme.textLight};
  text-align: center;
  width: 100%;
`;

export { StyledVideoList, StyledVideoListRel, Message };
