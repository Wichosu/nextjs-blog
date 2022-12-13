import React, { useState } from 'react';
import FeaturedProducts from '../components/FeaturedProducts';

const Products = () => {

  const types = [
    {name: 'Butter', stock: 44},
    {name: 'Chocolate Chips', stock: 22},
    {name: 'Lemon', stock: 12},
    {name: 'Macarons', stock: 8}
  ]

  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  }

  return (
    <div className='flex flex-col md:flex-row relative'>
      <div className='fixed top-14 z-40 left-0 right-0 w-fit mx-auto mt-4 md:hidden'>
        <button 
          className='px-4 py-1 rounded bg-orange-200 uppercase'
          onClick={handleFilter}
        >
          Filters
        </button>
      </div>
      { showFilter && 
        <div 
          className='px-8 h-screen bg-neutral-50 md:bg-transparent md:block 
          md:w-1/3 md:border-r md:pr-4'
        >
          <div className='flex md:sticky md:top-16 flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl'>Price</h2>
              <div className='flex gap-4 w-full'>
                <input type='number' className='border-b w-full outline-none' placeholder='$min' />
                <input type='number' className='border-b w-full outline-none' placeholder='$max' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl'>Type</h2>
              { types.map((item, index) => (
                <div key={index} className='flex gap-2'>
                  <input type='checkbox' id={item.name} name={item.name} />
                  <label htmlFor={item.name}>{item.name}({item.stock})</label>
                </div>
              ))}
            </div>
            <div className='flex items-center gap-6'>
              <button className='text-lg px-4 py-1 bg-orange-300 rounded uppercase hover:shadow-lg '>
                apply filter
              </button>
              <button className='text-lg'>
                <i className='bi bi-trash'></i>
              </button>
            </div>
          </div>
        </div>
      }
      { !showFilter && <FeaturedProducts type={'new'} />}
    </div>
  );
}

export default Products;
