import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='sticky top-0 z-10'>
      <div 
        className='flex px-16 justify-between items-center border-b-neutral-300 border-b-2
        py-2 bg-neutral-50'
      >
        <div className='flex items-center gap-4'>
          <img className='w-12' src='./img/Cookie.svg' alt='Cookie shop logo' />
          <p className='text-2xl'>Cookie Shop</p>
        </div>
        <ul className='w-fit mx-auto'>
          <Link className='mx-8'>Butter</Link>
          <Link className='mx-8'>Chocolate Chips</Link>
          <Link className='mx-8'>About Us</Link>
        </ul>
        <div className='relative'>
          <i className='bi bi-cart-fill'></i>
          <span 
            className='absolute -top-2 -right-3 bg-orange-300 text-neutral-100 rounded-full
            w-5 h-5 flex justify-center items-center'
          >
          0
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
