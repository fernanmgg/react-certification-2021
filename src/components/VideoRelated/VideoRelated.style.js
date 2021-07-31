import styled from 'styled-components';

const StyledVideoRelated = styled.div`
  background-color: ${(props) => props.theme.background};
  border-top: 1px solid ${(props) => props.theme.textLight};
  margin-bottom: 8px;
  height: 80px;
`;

const Wrapper = styled.button`
  background-color: ${(props) => props.theme.background};
  border: 0;
  border-top: black;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 0;
  position: relative;
  text-align: left;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  flex: 1 1 0;
`;

const Content = styled.div`
  overflow: hidden;
  padding: 8px;
  flex: 2 1 0;
`;

const Title = styled.span`
  color: ${(props) => props.theme.textLight};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: normal;
`;

const Effects = styled.span`
  background-color: transparent;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  transition: background-color 1s ease;
  &:hover,
  ${Wrapper}:focus & {
    background-color: ${(props) => props.theme.backgroundFocus};
  }
`;

export { StyledVideoRelated, Wrapper, Image, Content, Title, Effects };
