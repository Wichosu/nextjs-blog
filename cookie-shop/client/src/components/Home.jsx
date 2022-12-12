import React from 'react';
import Catalog from './Catalog';
import FeaturedProducts from './FeaturedProducts';
import Slider from './Slider';

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts type={'New'} />
      <Catalog />
    </div>
  );
}

export default Home;
