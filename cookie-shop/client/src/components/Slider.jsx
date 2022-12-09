import React, { useState } from 'react';


const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    'https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg',
    'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1758181/pexels-photo-1758181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2067424/pexels-photo-2067424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3776939/pexels-photo-3776939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ]

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? (data.length - 1) : (prev) => prev - 1);
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === (data.length - 1) ? 0 : (prev) => prev + 1);
  }

  console.log(currentSlide)

  return (
    <div className='relative h-3/4 -top-24 w-screen overflow-hidden'>
      <div className='flex h-screen w-max transition-all duration-1000' style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
        {data.map((img, index) => (
          <img key={index} className='w-screen object-cover' src={img} alt='' />
        ))}
      </div>
      <div className='absolute w-fit bottom-16 left-0 right-0 mx-auto'>
        <i 
          className='bi bi-arrow-left rounded-md mx-6 px-2 text-3xl bg-neutral-100'
          onClick={prevSlide}
        />
        <i 
          className='bi bi-arrow-right rounded-md mx-6 px-2 text-3xl bg-neutral-100'
          onClick={nextSlide} 
        />
      </div>
    </div>
  );
}

export default Slider;
