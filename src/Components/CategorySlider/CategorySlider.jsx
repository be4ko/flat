import React, { useEffect, useState } from 'react'
import './CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";


export default function CategorySlider() {

  const [result, setResult] = useState([])

  async function getData(){
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    let res = data.data ;
    setResult(res);
  }

  useEffect(() => {
    getData();
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 6,
    slidesToScroll: 1,
    
  };
  return (
    <div className="my-5">
    <Slider {...settings}>
      {result.map((category)=> <>
        <img height={300} src={category.image} className='w-100' alt={category.name} />
        <h4>{category.name}</h4>
      </>)}
    </Slider>
    </div>

  )
}
