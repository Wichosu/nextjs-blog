import React, { useState } from 'react';
import ProductSlider from '../components/ProductSlider';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Product = () => {
  const catId = useParams().id;

  const {data, loading, error} = useFetch(`/products/${catId}?populate=*`);

  const [quantity, setQuantity] = useState(1);

  const reduceQuantity = () => {
    if(quantity > 1) setQuantity(quantity - 1);
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  return (
    <div className='flex flex-col md:flex-row gap-6'>
      <ProductSlider />
      <div className='flex flex-col gap-6 justify-center'>
        <div className='flex flex-col gap-4 mx-6'>
          <h2 className='text-4xl'>
            {data.attributes?.title}
          </h2>
          <h3 className='text-xl'>
            ${data.attributes?.price}
          </h3>
          <p>
            {data.attributes?.description}
          </p>
        </div>
        <div className='flex justify-between items-center w-fit mx-auto md:mx-6'>
          <i className='bi bi-dash-lg text-orange-500 text-2xl' onClick={reduceQuantity}></i>
          <div className='mx-8'>
            {quantity}
          </div>
          <i className='bi bi-plus-lg text-orange-500 text-2xl' onClick={increaseQuantity}></i>
        </div>
        <button className='bg-orange-200 px-12 py-2 rounded w-fit mx-auto md:mx-6'>Add</button>
      </div>
    </div>
  );
}

export default Product;
