import React from 'react';

import { StyledToggle, Background, Slider, Checkbox } from './Toggle.style';

function Toggle({ toggleBackground, value, toggle }) {
  return (
    <StyledToggle>
      <Checkbox
        aria-label="theme"
        type="checkbox"
        checked={value}
        onChange={() => toggle(!value)}
      />
      <Background toggleBackground={toggleBackground}>
        <Slider />
      </Background>
    </StyledToggle>
  );
}

export default Toggle;
