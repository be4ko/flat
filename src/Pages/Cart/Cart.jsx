import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import empty from '../../Assets/empty.jpg';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Cart() {

  const { getLoggedCart, removeProductFromCart, updateProductQuantity,setNumOfCartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0)


  async function deleteProduct(id) {
    const { data } = await removeProductFromCart(id);
    setProducts(data?.data.products);
    setCartPrice(data?.data?.totalCartPrice);
    setTotalItems(data?.numOfCartItems);
    setNumOfCartItems(data.numOfCartItems);
  }

  async function updateQuantity(id, count) {
    const { data } = await updateProductQuantity(id, count);
    setProducts(data?.data.products);
    setCartPrice(data?.data?.totalCartPrice);
    setTotalItems(data?.numOfCartItems);

  }

  async function getCart() {
    const { data } = await getLoggedCart();
    setProducts(data?.data.products);
    setCartPrice(data?.data?.totalCartPrice);
    setTotalItems(data?.numOfCartItems);
  }

  useEffect(() => {
    getCart();
  }, [])


  return (
    <div className='container bg-main-light p-4 mb-5'>
      {totalItems === 0 ? <div className="d-flex justify-content-center row p-4 w-100" > <img className='col-md-10 me-9 px-9 w-50' height={400} src={empty} alt="empty" /> <h1 className='col-md-9 text-center text-main'>No Items in the cart</h1> </div>
      : 
      <>
        <h1 className='h2'>Shop Cart</h1>
        <div className="d-flex justify-content-between align-items-center">
          <span className='text-main'> Total Price: {Intl.NumberFormat("en-US",{maximumFractionDigits: 2}).format(cartPrice)} EPG </span>
          <span className='text-main'> Total Items: {totalItems} Items </span>
        </div>

        {products.map(product =>
          <div className='row border-bottom m-2 align-items-center' key={product._id}>
            <div className="col-md-1">
              <img height={140} src={product?.product?.imageCover} alt={product?.product?.title} />
            </div>
            <Helmet>
              <title>Cart</title>  
            </Helmet>
            <div className="col-md-11">
              <div className="d-flex justify-content-between align-items-center">
                <div className="col-md-9">
                  <h4>{product?.product?.title}</h4>
                  <h6 className='text-main mx-2'>Price: {product.price} EGP</h6>
                  <h6 onClick={() => { deleteProduct(product.product._id) }} className='text-main cursor-pointer'>
                    <i className='fa-solid fa-trash-can mx-2'></i>Remove
                  </h6>
                </div>

                <div className="col-md-2 text-end">
                  <button disabled={product.count > product?.product?.quantity ? 'disabled' : false} onClick={() => { updateQuantity(product?.product._id, product.count + 1) }} className=' btn-outline'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button  onClick={() => { product.count === 1 ?  deleteProduct(product?.product.id) :  updateQuantity(product?.product._id, product.count - 1) }} className=' btn-outline'>-</button>
                </div>
              </div>
            </div>            
          </div>          
        )}
      </>
      }
      <div className='d-flex w-100 justify-content-center'>
        <Link className='w-25' to={'/checkout'}>
        <button className='w-100 h-10 btn bg-main'>Pay</button>
        </Link>
      </div>

    </div>
  )
}
