import styled from 'styled-components';

const StyledVideoDetails = styled.div`
  background-color: ${(props) => props.theme.backgroundTransparent};
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  flex: 3 1 0;
  margin: 0 16px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;
`;

const Description = styled.div`
  color: ${(props) => props.theme.textLight};
  font-size: 1rem;
  margin-top: 16px;
`;

export { StyledVideoDetails, Wrapper, Title, Description };
