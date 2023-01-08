import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../zustand/cart';

const Cart = () => {
  const items = useStore((state) => state.items);
  const removeItem = useStore((state) => state.removeItem);

  const totalPrice = () => {
    let total = 0;
    items.forEach(item => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  }

  return (
    <div 
      className='relative top-0 flex max-h-90vh overflow-auto flex-col gap-4 items-center py-4
        md:w-80 md:px-8 md:rounded md:absolute md:top-12 md:right-0 md:bg-neutral-50'>
      <h1 className='text-xl'>Products in your cart</h1>
      { items.map((item, index) => (
        <Link key={index} className='flex gap-6 items-center' to={`/product/${item.id}`}>
          <img
            className='w-full object-cover rounded'
            src={item.img}
          />
          <div className='flex flex-col'>
            <h2 className='text-lg'>{item.title}</h2>
            <div>{item.quantity}</div>
            <div>${item.price}</div>
          </div>
          <i className='bi bi-x text-orange-700 text-2xl' onClick={() => removeItem(item)}></i>
        </Link>
      ))}
      {
        items.length > 0 && 
        <>
          <div>
            Subtotal: ${totalPrice()}
          </div>
          <button className='bg-orange-200 rounded px-8 py-2'>
            Checkout
          </button>
        </>
      }
    </div>
  );
}

export default Cart;
