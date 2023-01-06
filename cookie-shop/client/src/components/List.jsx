import React from 'react';
import useFetch from '../hooks/useFetch';
import Card from './Card';

const List = ({ maxPrice, minPrice, categories}) => {

  const {data, loading, error} = useFetch(
    `/products?populate=*${categories.map(
      (item) => `&filters[categories][title][$eq]=${item}&`
    )}`
  )

  console.log(data)

  return (
    <div className='mx-auto flex flex-wrap w-full justify-evenly gap-y-8 md:gap-x-8'>
      {loading
      ? 'loading...'
      : data.map((item, index) => (
        <Card key={index} item={item} />
      ))
      }
    </div>
  );
}

export default List;
