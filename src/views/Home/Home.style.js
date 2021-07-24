import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.title};
  text-align: center;
`;

const HomeWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundTransparent};
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

export { Title, HomeWrapper };
