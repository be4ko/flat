import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [allBrands, setAllBrands] = useState([])
  const [loader, setLoader] = useState(false)

  async function getAllBrands() {
    setLoader(true);
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    setLoader(false);
    setAllBrands(data.data);
  }

  useEffect(() => {
    getAllBrands();
  }, [])
  

  return (
    <div className='container'>
            <Helmet>
              <title>Brands</title>  
            </Helmet>
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
          {allBrands.map((brand) => (
            <Link className="col-md-3 product m-2 text-decoration-none text-dark ">
              <h1 className='h5'>{brand.name}</h1>
              <img src={brand.image} alt={brand.name} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
