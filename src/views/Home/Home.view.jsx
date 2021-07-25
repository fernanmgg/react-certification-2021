import React from 'react';

import { Title, HomeWrapper } from './Home.style';
import CardList from '../../components/CardList';

function Home() {
  return (
    <>
      <Title>React Bootcamp 2021</Title>
      <HomeWrapper>
        <CardList />
      </HomeWrapper>
    </>
  );
}

export default Home;
