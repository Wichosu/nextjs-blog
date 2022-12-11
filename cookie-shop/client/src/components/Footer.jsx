import React from 'react';

const Footer = () => {
  return (
    <div className='bg-neutral-50' >
      <div className='flex md:flex-row flex-col gap-8 justify-between items-center py-8 w-5/6 mx-auto'>
        <div className='text-2xl'>
          <i className='bi bi-facebook mx-4'></i>
          <i className='bi bi-twitter mx-4'></i>
          <i className='bi bi-instagram mx-4'></i>
          <i className='bi bi-tiktok mx-4'></i>
        </div>
        <div>
          <div className='flex items-center gap-4'>
            <img className='w-12' src='./img/Cookie.svg' alt='Cookie shop logo' />
            <p className='text-2xl'>Cookie Shop</p>
          </div>
        </div>
        <div className='flex'>
          <i className='bi bi-c-circle'></i>
          <p>Cookie Shop. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
