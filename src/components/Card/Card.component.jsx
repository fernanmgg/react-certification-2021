import React from 'react';

import {
  StyledCard,
  CardWrapper,
  CardImage,
  CardContent,
  Title,
  Description,
  Effects,
} from './Card.style';

function Card(props) {
  return (
    <StyledCard>
      <CardWrapper>
        <CardImage backgroundImage={props.image} />
        <CardContent>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
        </CardContent>
        <Effects />
      </CardWrapper>
    </StyledCard>
  );
}

export default Card;
