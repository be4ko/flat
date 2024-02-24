import React, { useContext } from 'react'
import './ProductItem.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductItem({ product }) {

  const {addProductToCard} = useContext(CartContext);
  const {addProductToWishList} =  useContext(WishListContext);

  async function addToWishList(e,id){
    const {data} = await addProductToWishList(id);
    if(data.status === 'success' ){
        toast.success("Product Added to Wish List", {position:'bottom-right'});
        e.target.classList.replace('fa-regular', 'fa-solid');
    }
    else {
      toast.error(data.message, {position:'bottom-right'});
    }

  }

  async function addProduct(id){
    const {data} = await addProductToCard(id);
    if(data.status === 'success' ){
      toast.success(data.message, {position:'bottom-right'});
    }
    else {
      toast.error(data.message, {position:'bottom-right'});
    }

  }

  return (
    <div className='col-md-2 product position-relative'>
        <Link to={`details/${product.id}`} className='text-dark text-decoration-none' >
            <img src={product.imageCover} className='w-100 ' alt="" />
            <h6 className='text-main'>{product.category.name}</h6>
            <h2 className='h4' >{product.title.split(' ').slice(0, 2).join(' ')}</h2>
            <div className="d-flex justify-content-between my-3">
              <span>{product.price} EGP</span>
              <span><i className='fa-solid fa-star'></i>{product.ratingsAverage}</span>
            </div>
        </Link> 
        <i onClick={(e)=>{addToWishList(e,product.id)}} className="fa-regular cursor-pointer fa-heart fa-2x position-absolute top-0 end-0 m-3 text-danger"></i>

        <button onClick={()=>{addProduct(product.id)}} className='btn bg-main w-100 m-1'>Add to Card</button>
    </div>
  )
}
