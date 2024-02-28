import React, { useEffect, useState } from 'react'
import './FeaturedProduct.module.css'
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import ProductItem from '../ProductItem/ProductItem'

export default function FeaturedProduct() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)

  async function getAllProducts() {
    setLoading(true);
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setLoading(false);
    setAllProducts(data.data);
  }

  useEffect(() => {
    getAllProducts();
  }, [])


  return (
    <div className='row'>
      {loading === true ?
        <div className='d-flex justify-content-center'>
          <InfinitySpin
            visible={true}
            width="200"
            color="#009986"
            ariaLabel="infinity-spin-loading"
          />
        </div> :
        allProducts.map(product => (
          <ProductItem product={product}/>
        ))}
    </div>
  );
}
