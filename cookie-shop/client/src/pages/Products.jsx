import React from 'react';
import FeaturedProducts from '../components/FeaturedProducts';

const Products = () => {

  const types = [
    {name: 'Butter', stock: 44},
    {name: 'Chocolate Chips', stock: 22},
    {name: 'Lemon', stock: 12},
    {name: 'Macarons', stock: 8}
  ]

  return (
    <div className='flex'>
      <div className='w-1/3 border-r pr-4'>
        <div className='flex sticky top-16 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Price</h2>
            <div className='flex gap-4 w-full'>
              <input type='number' className='border w-full' placeholder='$min' />
              <input type='number' className='border w-full' placeholder='$max' />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>Type</h2>
            { types.map((item, index) => (
              <div className='flex gap-2'>
                <input type='checkbox' id={item.name} name={item.name} />
                <label htmlFor={item.name}>{item.name}({item.stock})</label>
              </div>
            ))}
          </div>
          <div className='flex gap-6'>
            <button className='text-lg px-4 py-1 bg-orange-300 rounded uppercase'>apply filter</button>
            <button>
              <i className='bi bi-trash'></i>
            </button>
          </div>
        </div>
      </div>
      <FeaturedProducts type={'new'} />
    </div>
  );
}

export default Products;
