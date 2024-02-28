import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getAllCategories() {
    setLoader(true);
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setLoader(false);
    setAllCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, [])
  


  return (
    <div className='container'>
      {loader === true ? (
        <div className='d-flex justify-content-center'>
          <InfinitySpin
            visible={true}
            width="200"
            color="#009986"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <div className='justify-content-center text-center row w-100'>
          {allCategories.map((category) => (
            <div className="col-md-2 product m-4">
              <h1 className='h5'>{category?.name}</h1>
              <img height={200} src={category?.image} alt={category?.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
