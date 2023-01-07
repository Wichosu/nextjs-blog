import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const Navbar = () => {

  const links = [
    { name: 'All Cookies', link: '/products/'},
    { name: 'Butter', link: '/products/'},
    { name: 'Chocolate Chips', link: '/products/'},
    { name: 'About Us', link: '/'}
  ]

  const [navBar, setNavBar] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleNavBar = () => {
    setNavBar(!navBar);
  }

  return (
    <div className='sticky top-0 z-50 bg-neutral-50'>
      <div 
        className='flex w-5/6 mx-auto justify-between items-center py-2'
      >
        <div 
          className='absolute top-full left-0 right-0  bg-neutral-50 transition-all
          duration-300 -z-10 lg:hidden'
          style={{transform: `translateY(-${!navBar * 100}vh)`}}
        >
          <ul className='flex flex-col w-5/6 mx-auto py-2 gap-2'>
            { links.map((link, index) => (
              <Link 
                key={index}
                className={`transition-all ${navBar? 'duration-700' : 'duration-75'}`} 
                style={{opacity: `${navBar * 1}`}}
                to={link.link}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className='text-2xl md:hidden' onClick={toggleNavBar}>
          <i className='bi bi-list'></i> 
        </div>
        <Link to='/' className='flex items-center gap-4'>
          <img className='w-12' src='/img/Cookie.svg' alt='Cookie shop logo' />
          <p className='text-2xl'>Cookie Shop</p>
        </Link>
        <ul className='w-fit mx-auto hidden md:block'>
          { links.map((link, index) => (
            <Link 
              key={index}
              className='mx-8' 
              to={link.link}
            >
              {link.name}
            </Link>
          ))}
        </ul>
        <div className='relative' onClick={() => setOpen(!open)}>
          <i className='bi bi-cart-fill'></i>
          <span 
            className='absolute -top-2 -right-3 bg-orange-300 text-neutral-100 rounded-full
            w-5 h-5 flex justify-center items-center'
          >
          0
          </span>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
}

export default Navbar;
