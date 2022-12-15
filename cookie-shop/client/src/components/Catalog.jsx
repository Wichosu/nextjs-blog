import React from 'react';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const data = [
    'https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg',
    'https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1758181/pexels-photo-1758181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2067424/pexels-photo-2067424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3776939/pexels-photo-3776939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ]

  return (
    <>
      <h1 className='text-4xl text-center my-10'>Catalog</h1>
      <div className='grid grid-cols-2 grid-rows-catalog w-11/12 md:w-3/4 mx-auto mb-10 gap-2'>
        <div className='relative row-span-2 col-span-1'>
          <img className='w-full h-full object-cover rounded-md' src={data[0]} alt='' />
          <Link 
            className='absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center bg-neutral-100
            w-fit mx-auto px-4 py-1 rounded-sm '
            to='/products/butter'
          >
            Butter
          </Link>
        </div>
        <div className='relative row-span-1 col-span-1'>
          <img className=' w-full h-full object-cover rounded-md' src={data[1]} alt='' />
          <Link 
            className='absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center bg-neutral-100
            w-fit mx-auto px-4 py-1 rounded-sm '
            to='/products/chocolate-chips'
          >
            Chocolate Chips
          </Link>
        </div>
        <div className='relative row-span-1 col-span-1'>
          <img className='w-full h-full object-cover rounded-md' src={data[2]} alt='' />
          <Link 
            className='absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center bg-neutral-100
            w-fit mx-auto px-4 py-1 rounded-sm '
            to='/products/lemon'
          >
            Lemon
          </Link>
        </div>
        <div className='relative row-span-2 col-span-2'>
          <img className='w-full h-full object-cover rounded-md' src={data[4]} alt='' />
          <Link 
            className='absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center bg-neutral-100
            w-fit mx-auto px-4 py-1 rounded-sm '
            to='/products/macarons'
          >
            Macarons
          </Link>         
        </div>
      </div>
    </>
  );
}

export default Catalog;
