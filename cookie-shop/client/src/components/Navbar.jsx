import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const links = [
    { name: 'All Cookies', link: '/'},
    { name: 'Butter', link: '/'},
    { name: 'Chocolate Chips', link: '/'},
    { name: 'About Us', link: '/'}
  ]

  const [navBar, setNavBar] = useState(false);

  const toggleNavBar = () => {
    setNavBar(!navBar);
  }

  return (
    <div className='sticky top-0 z-20 bg-neutral-50'>
      <div 
        className='flex w-5/6 mx-auto justify-between items-center border-b-2
        py-2'
      >
        <div 
          className='absolute top-full left-0 right-0  bg-neutral-50 transition-all
          duration-300 -z-10'
          style={{transform: `translateY(-${!navBar * 100}vh)`}}
        >
          <ul className='flex flex-col w-5/6 mx-auto py-2 gap-2'>
            { links.map((link, index) => (
              <Link 
                key={index}
                className={`transition-all ${navBar? 'duration-700' : 'duration-75'}`} 
                style={{opacity: `${navBar * 1}`}}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className='text-2xl md:hidden' onClick={toggleNavBar}>
          <i className='bi bi-list'></i> 
        </div>
        <div className='flex items-center gap-4'>
          <img className='w-12' src='./img/Cookie.svg' alt='Cookie shop logo' />
          <p className='text-2xl'>Cookie Shop</p>
        </div>
        <ul className='w-fit mx-auto hidden md:block'>
          { links.map((link, index) => (
            <Link 
              key={index}
              className='mx-8' 
            >
              {link.name}
            </Link>
          ))}
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
