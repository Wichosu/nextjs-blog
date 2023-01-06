import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {

  return (
    <Link className='w-5/12 md:w-64' to={`/product/${item}`}>
      <div className='flex flex-col'>
        <div className='w-full h-56 overflow-hidden relative rounded'>
          <img
            src={import.meta.env.VITE_API_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url}
            alt=''
            className='absolute z-10 h-full object-cover hover:-z-20'
          />
          <img
            src={import.meta.env.VITE_API_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url}
            alt=''
            className='absolute h-full object-cover hover:z-20'
          />
        </div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl'>{ item.attributes?.title }</h2>
          <p className='text-xl'>${ item.attributes?.price }</p>
        </div>
        <p>{ item?.attributes.description }</p>
      </div>
    </Link>
  );
}

export default Card;
