import React, { useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const FeaturedProducts = ({ type }) => {

  const items = [
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'},
    {title: 'Cookie', desc: '$7'}
  ]

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log(import.meta.env.VITE_API_URL)
        const data = await axios.get(import.meta.env.VITE_API_URL + '/products', {
          headers: {
            Authorization: 'bearer ' + import.meta.env.VITE_API_TOKEN,
          },
        });
        console.log(data.data.data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  }, [])

  return (
    <div className='mx-auto'>
      <h1 className='my-10 text-center text-4xl'>{ type }</h1>
      <div className='flex flex-wrap w-full justify-evenly gap-y-8 md:gap-x-8'>
        {items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
