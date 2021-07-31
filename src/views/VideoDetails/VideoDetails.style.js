import styled from 'styled-components';

const StyledVideoDetails = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 16px;
  width: 100%;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.text};
`;

const Description = styled.h3`
  color: ${(props) => props.theme.textLight};
`;

export { StyledVideoDetails, Title, Description };
