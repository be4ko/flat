 import React from 'react'
import './Home.module.css'
import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
import MainSlider from '../../Components/MainSlider/MainSlider'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'

export default function Home() {
  return (
    <div className='container'>
      <MainSlider/>
      <CategorySlider/>
      <FeaturedProduct/>
    </div>
  )
}
