import React, { useState } from 'react';
import List from '../components/List';
import useFetch from '../hooks/useFetch';

const Products = () => {
  const {data, loading, error} = useFetch('/categories?populate=*');

  console.log(data)
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  }

  const handleChange = (e) => {
    const value = e.target.id;
    const isChecked = e.target.checked;

    setCategories(
      isChecked
      ? [...categories, value]
      : categories.filter((item) => item !== value)
    );
  }

  const handleMaxPrice = (e) => {
    const value = e.target.value;
    if(value === ''){
      setMaxPrice(999);
      return
    }
    if(value > minPrice){
      setMaxPrice(value);
    }
  }

  const handleMinPrice = (e) => {
    const value = e.target.value;
    if(value === ''){
      setMinPrice(0);
      return
    }
    if(value < maxPrice){
      setMinPrice(value);
    } 
  }

  return (
    <div className='flex flex-col md:gap-8 md:flex-row relative'>
      <div 
        className={`${showFilter? 'fixed' : 'hidden'} px-8 h-screen z-40 bg-neutral-50 
        md:bg-transparent md:block md:sticky md:top-0 md:w-1/4 md:border-r md:pr-4`}
      >
        <div className='flex md:sticky md:top-16 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Price</h2>
            <div className='flex gap-4 w-full'>
              <input 
                type='number' 
                className='border-b w-full outline-none' 
                placeholder='$min'
                onChange={handleMinPrice}
              />
              <input 
                type='number' 
                className='border-b w-full outline-none' 
                placeholder='$max' 
                onChange={handleMaxPrice}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Type</h2>
            { data.map((item, index) => (
              <div key={index} className='flex gap-2'>
                <input 
                  type='checkbox' 
                  id={item.attributes?.title} 
                  name={item.attributes?.title} 
                  onChange={handleChange}
                />
                <label 
                  htmlFor={item.attributes?.title}
                >
                  {item.attributes?.title}({item.attributes?.products?.data?.length})
                </label>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-6'>
            <button 
              className='text-lg px-4 py-1 bg-orange-300 rounded uppercase hover:shadow-lg '
            >
              apply filter
            </button>
            <button className='text-lg'>
              <i className='bi bi-trash'></i>
            </button>
          </div>
        </div>
      </div>
      <div className='lg:mb-8'>
        <List categories={categories} maxPrice={maxPrice} minPrice={minPrice} />
      </div>
      <div 
        className={` ${showFilter? 'fixed bottom-0' : 'sticky bottom-6'} 
        z-40 left-0 right-0 w-fit mx-auto my-6 md:hidden`}
      >
        <button 
          className='px-4 py-1 rounded bg-orange-200 uppercase'
          onClick={handleFilter}
        >
          {showFilter? 'close' : 'filters'}
        </button>
      </div>
    </div>
  );
}

export default Products;
