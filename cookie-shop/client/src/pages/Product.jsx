import React from 'react';
import ProductSlider from '../components/ProductSlider';

const Product = () => {
  return (
    <div>
      <ProductSlider />
      <h2>
        Titulo
      </h2>
      <h3>
        $Precio
      </h3>
      <p>
        Sint fugiat voluptate ex in ipsum. Quis irure exercitation sunt sint incididunt nisi 
        cupidatat. Occaecat incididunt minim duis consectetur exercitation. Sunt dolor magna 
        voluptate nisi Lorem eiusmod sunt veniam. Do anim consectetur quis tempor commodo. Officia 
        magna velit quis fugiat nostrud ipsum officia voluptate commodo in veniam ex anim.
      </p>
      <div className='flex justify-between items-center w-fit mx-auto'>
        <i className='bi bi-dash-lg text-orange-500 text-2xl'></i>
        <input  className='w-20 mx-8' type='text' placeholder='1' />
        <i className='bi bi-plus-lg text-orange-500 text-2xl'></i>
      </div>
      <button></button>
    </div>
  );
}

export default Product;
