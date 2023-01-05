import React, { useState } from 'react';

const ProductSlider = () => {

  const data = [
    'https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg',
    'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1758181/pexels-photo-1758181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2067424/pexels-photo-2067424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3776939/pexels-photo-3776939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ]
  
  const [mainImg, setMainImg] = useState(data[0]);

  return (
    <div className='relative'>
      <img className='object-cover' src={mainImg} alt='' />
      <div className='absolute flex w-screen justify-evenly top-3/4 h-12'>
        { data.map((img, index) => (
          <img 
            className='w-12 h-12 border-2 cursor-pointer hover:border-orange-200 rounded-full'
            src={img} 
            key={index} 
            alt='' 
            onClick={() => setMainImg(img)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSlider;
