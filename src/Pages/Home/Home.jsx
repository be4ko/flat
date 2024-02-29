 import React from 'react'
import './Home.module.css'
import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
//import MainSlider from '../../Components/MainSlider/MainSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <div className='container'>
            <Helmet>
              <title>Flat</title>  
            </Helmet>
      {/* <MainSlider/> */}
      <CategorySlider/>
      <FeaturedProduct/>
    </div>
  )
}
