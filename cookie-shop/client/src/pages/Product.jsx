import React, { useState } from 'react';
import ProductSlider from '../components/ProductSlider';

const Product = () => {

  const [quantity, setQuantity] = useState(1);

  const reduceQuantity = () => {
    if(quantity > 1) setQuantity(quantity - 1);
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  return (
    <div className='flex flex-col gap-6 justify-center'>
      <ProductSlider />
      <div className='flex flex-col gap-4 mx-6'>
        <h2 className='text-4xl'>
          Titulo
        </h2>
        <h3 className='text-xl'>
          $Precio
        </h3>
        <p>
          Sint fugiat voluptate ex in ipsum. Quis irure exercitation sunt sint incididunt nisi 
          cupidatat. Occaecat incididunt minim duis consectetur exercitation. Sunt dolor magna 
          voluptate nisi Lorem eiusmod sunt veniam. Do anim consectetur quis tempor commodo. Officia 
          magna velit quis fugiat nostrud ipsum officia voluptate commodo in veniam ex anim.
        </p>
      </div>
      <div className='flex justify-between items-center w-fit mx-auto'>
        <i className='bi bi-dash-lg text-orange-500 text-2xl' onClick={reduceQuantity}></i>
        <div className='mx-8'>
          {quantity}
        </div>
        <i className='bi bi-plus-lg text-orange-500 text-2xl' onClick={increaseQuantity}></i>
      </div>
      <button className='bg-orange-200 px-12 py-2 rounded w-fit mx-auto'>Add</button>
    </div>
  );
}

export default Product;
