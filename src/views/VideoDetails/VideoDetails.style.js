import styled from 'styled-components';

const StyledVideoDetails = styled.div`
  background-color: ${(props) => props.theme.backgroundTransparent};
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  flex: 3 1 0;
  margin: 0 16px;
`;

const Favorite = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const FavoriteButton = styled.button`
  background-color: ${(props) => props.theme.backgroundTransparent};
  color: ${(props) => props.theme.accent};
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 8px;
  padding: 8px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;
`;

const Description = styled.div`
  color: ${(props) => props.theme.textLight};
  font-size: 1rem;
  margin: 16px 0;
`;

export { StyledVideoDetails, Wrapper, Favorite, FavoriteButton, Title, Description };
