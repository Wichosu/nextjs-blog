import React from 'react';
import Card from './Card';
import FeaturedProducts from './FeaturedProducts';
import Slider from './Slider';

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts type={'New'} />
    </div>
  );
}

export default Home;
