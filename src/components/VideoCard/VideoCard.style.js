import styled from 'styled-components';

const StyledVideoCard = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
  height: 345px;
  margin: 10px;
  overflow: hidden;
  position: relative;
  width: 345px;
`;

const FavoriteButton = styled.button`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 8px;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  font-size: 0.75rem;
  margin: 8px;
  opacity: 0;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
  &:hover,
  ${StyledVideoCard}:hover & {
    opacity: 1;
  }
`;

const Wrapper = styled.button`
  background-color: ${(props) => props.theme.background};
  border: 0;
  cursor: pointer;
  display: block;
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
  height: 140px;
`;

const Content = styled.div`
  height: 190px;
  overflow: hidden;
  padding: 0 16px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.25rem;
  font-weight: normal;
  line-height: 1.5;
  margin-bottom: 0.25em;
`;

const Description = styled.p`
  color: ${(props) => props.theme.textLight};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0;
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

export {
  StyledVideoCard,
  FavoriteButton,
  Wrapper,
  Image,
  Content,
  Title,
  Description,
  Effects,
};
