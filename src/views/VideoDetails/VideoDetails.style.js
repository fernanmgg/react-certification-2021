import styled from 'styled-components';

const StyledVideoDetails = styled.div`
  background-color: ${(props) => props.theme.backgroundTransparent};
  display: flex;
  flex-direction: row;
  height: calc(100vh - 64px - 16px);
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column;
    height: 200vh;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 3 1 0;
  flex-direction: column;
  height: 100%;
  margin: 0 16px;
  @media (max-width: 900px) {
    margin: 16px 0;
  }
`;

const Video = styled.div`
  flex: 1 1 0;
`;

const Details = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
`;

const Favorite = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 8px;
`;

const FavoriteButton = styled.button`
  background-color: ${(props) => props.theme.backgroundTransparent};
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 8px;
  color: ${(props) => props.theme.accent};
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
  flex: 1 1 0;
  font-size: 1rem;
  overflow-y: auto;
  white-space: pre-wrap;
`;

export {
  StyledVideoDetails,
  Wrapper,
  Video,
  Details,
  Favorite,
  FavoriteButton,
  Title,
  Description,
};
