import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import img1 from "../../Assets/Slider/slider-2.jpeg"
import img2 from "../../Assets/Slider/slider-image-1.jpeg"
import img3 from "../../Assets/Slider//slider-image-2.jpeg"
import img4 from "../../Assets/Slider/slider-image-3.jpeg"



export default function MainSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       
    arrows: false,
  };

  return (
    <div className='row mt-5 g-0'>
        <div className="col-md-9">
          <Slider{...settings}>
          <img height={400} src={img1} className='w-100' alt="" />
          <img height={400} src={img2} className='w-100' alt="" />
          <img height={400} src={img3} className='w-100' alt="" />
          <img height={400} src={img4} className='w-100' alt="" />

          </Slider>
        </div>
        <div className="col-md-3">
          <img height={200} src={img3} className='w-100' alt="" />
          <img height={200} src={img2} className='w-100' alt="" />
        </div>
    </div>
  )
}
