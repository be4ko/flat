import React, { useContext, useEffect, useState } from 'react';
import './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner'
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function ProductDetails() {
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const {addProductToCard,setNumOfCartItems } = useContext(CartContext);


  let {id} = useParams();

  async function getProduct(){
    setLoading(true);
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setLoading(false);
    
    setDetails(data.data);
  }
  useEffect(() => {
    getProduct();
  }, []);


  async function addProduct(id){
    const {data} = await addProductToCard(id);
    if(data.status === 'success' ){
        toast.success(data.message, {position:'bottom-right'});
    }
    setNumOfCartItems(data.numOfCartItems);
  }
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,   
    autoplaySpeed: 1400,
    arrows: false,
  };

  return ( 
    <div className="container">
      {loading === true ?
        <div className='d-flex justify-content-center'>
          <InfinitySpin
            visible={true}
            width="200"
            color="#009986"
            ariaLabel="infinity-spin-loading"
          />
        </div> :
      <div className="row align-items-center mt-5">
        <div className="col-md-3">
            <Slider {...settings}>
                {details.images?.map((element)=>
                <img src={element} alt="" />
                )}
            </Slider>
        </div>
        <div className="col-md-7 position-relative ">
          <h2>{details.title}</h2>
          <p className='text-black-50'>{details.description}</p>
          <p className='fw-bold'>{details.category?.name}</p>
          <div className="d-flex justify-content-between fw-bold">
            <span>{details.price} EPG</span>
            <span> <i className='fa-solid fa-star  rating-color'></i>{details.ratingsAverage} </span>
          </div>
          <button onClick={()=>(addProduct(details.id))} className='bg-main btn w-100 my-3'>Add to Card</button>
        </div>
      </div>
    }
    </div>

  )
}
