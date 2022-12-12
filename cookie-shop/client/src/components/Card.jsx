import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {

  return (
    <Link className='w-5/12 md:w-64'>
      <div className='flex flex-col'>
        <div className='w-full h-56 overflow-hidden relative rounded'>
          <img
            src='https://images.pexels.com/photos/6996314/pexels-photo-6996314.jpeg'
            alt=''
            className='absolute z-10 h-full object-cover hover:-z-20'
          />
          <img
            src='https://images.pexels.com/photos/1546890/pexels-photo-1546890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt=''
            className='absolute h-full object-cover hover:z-20'
          />
        </div>
        <h2 className='text-2xl'>{ item.title }</h2>
        <div>
          <p>{ item.desc }</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
