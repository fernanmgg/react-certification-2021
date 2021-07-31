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

const Title = styled.h1`
  color: ${(props) => props.theme.text};
`;

const Description = styled.h3`
  color: ${(props) => props.theme.textLight};
`;

export { StyledVideoDetails, Wrapper, Title, Description };
