import React from 'react';

const Cart = () => {
  return (
    <div 
      className='relative top-0 flex max-h-90vh overflow-auto flex-col gap-4 items-center py-4
        md:w-1/4 md:px-8 md:rounded md:absolute md:top-12 md:right-0 md:bg-neutral-50'>
      <h1 className='text-xl'>Products in your cart</h1>
      <div className='flex gap-6 items-center'>
        <img
          className='w-1/2 rounded'
          src='https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg'
        />
        <div className='flex flex-col'>
          <h2 className='text-lg'>Title</h2>
          <div>2</div>
        </div>
        <i className='bi bi-x text-orange-700 text-2xl'></i>
      </div>
      <div className='flex gap-6 items-center'>
        <img
          className='w-1/2 rounded'
          src='https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg'
        />
        <div className='flex flex-col'>
          <h2 className='text-lg'>Title</h2>
          <div>2</div>
        </div>
        <i className='bi bi-x text-orange-700 text-2xl'></i>
      </div>
      <div className='flex gap-6 items-center'>
        <img
          className='w-1/2 rounded'
          src='https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg'
        />
        <div className='flex flex-col'>
          <h2 className='text-lg'>Title</h2>
          <div>2</div>
        </div>
        <i className='bi bi-x text-orange-700 text-2xl'></i>
      </div>
      <button className='bg-orange-200 rounded px-6 py-2 uppercase'>Checkout</button>
    </div>
  );
}

export default Cart;
