import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../Context/WishListContext';
import empty from '../../Assets/empty.jpg';
import { Link } from 'react-router-dom';


export default function WishList() {
  
  const { getLoggedWishList, removeProductFromWishList ,setNumOfFavItems } = useContext(WishListContext);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0)


  async function deleteProduct(id) {
    const { data } = await removeProductFromWishList(id);
    setProducts(data?.data);
    setTotalItems(data?.count);
    setNumOfFavItems(data.count);
  }

  async function getWishList() {
    const  {data}  = await getLoggedWishList();
    setProducts(data?.data);
    setTotalItems(data?.count);
    setNumOfFavItems(data?.count);

  }

  useEffect(() => {
    getWishList();
  }, [])
  

  return (

    <div className='container bg-main-light p-4'>
      {totalItems === 0 ? <div className="d-flex justify-content-center row p-4 w-100" > <img className='col-md-10 me-9 px-9 w-50' height={400} src={empty} alt="empty" /> <h1 className='col-md-9 text-center text-main'>No Items in the Wish List</h1> </div>
      : 
      <>
        <h1 className='h2'>Wish List</h1>
        <div className="d-flex justify-content-between align-items-center">
          <span className='text-main'> Total Items: {totalItems} Items </span>
        </div>

        {products.map(product =>
          <div className='row border-bottom m-2 align-items-center' key={product?._id}>
            <div className="col-md-1">
              <img height={140} src={product?.imageCover} alt={product?.title} />
            </div>
            <div className="col-md-11">
              <div className="d-flex justify-content-between align-items-center">
                <div className="col-md-9">
                  <h4>{product?.title}</h4>
                  <h6 className='text-main mx-2'>Price: {product?.price} EGP</h6>
                  <h6 onClick={() => { deleteProduct(product?._id) }} className='text-main cursor-pointer'>
                    <Link className='fa-solid fa-trash-can mx-2'></Link>Remove
                  </h6>
                </div>

              </div>
            </div>
          </div>
        )}
      </>
      }
    </div>
  )
}
