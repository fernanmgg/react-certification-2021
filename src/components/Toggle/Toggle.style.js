import styled from 'styled-components';

const StyledToggle = styled.label`
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
`;

const Background = styled.span`
  background-color: ${(props) =>
    props.toggleBackground
      ? props.theme.backgroundTransparent
      : props.theme.backgroundFocus};
  border-radius: 34px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
`;

const Slider = styled.span`
  background-color: ${(props) => props.theme.background};
  border-radius: 50%;
  bottom: 4px;
  height: 26px;
  left: 4px;
  position: absolute;
  transition: 0.4s;
  width: 26px;
`;

const Checkbox = styled.input`
  height: 0;
  opacity: 0;
  width: 0;
  &:checked ~ ${Background} {
    background-color: ${(props) => props.theme.backgroundColors[1]};
  }
  &:checked ~ ${Background} > ${Slider} {
    transform: translateX(26px);
  }
`;

export { StyledToggle, Background, Slider, Checkbox };
