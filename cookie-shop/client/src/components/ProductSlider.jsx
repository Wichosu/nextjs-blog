import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

const ProductSlider = () => {
  const catId = useParams().id;

  const {data, loading, error} = useFetch(`/products/${catId}?populate=*`)
  
  const [mainImg, setMainImg] = useState();

  const handleMain = (url) => {
    const fullUrl = import.meta.env.VITE_API_UPLOAD_URL + url;
    setMainImg(fullUrl);
  }

  useEffect(() => {
    setMainImg(import.meta.env.VITE_API_UPLOAD_URL + data.attributes?.carousel?.data[0]?.attributes?.url);
  }, [data]);

  return (
    <div className='relative w-full md:w-1/2'>
      <img className='object-cover w-full md:h-80vh' src={mainImg} alt='' />
      <div className='absolute flex w-full justify-evenly top-3/4 h-12'>
        { data.attributes?.carousel?.data.map((img, index) => (
          <img 
            className='w-12 h-12 border-2 cursor-pointer hover:border-orange-200 rounded-full'
            src={import.meta.env.VITE_API_UPLOAD_URL + img.attributes?.url}
            key={index} 
            alt='' 
            onClick={() => handleMain(img.attributes?.url)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSlider;
