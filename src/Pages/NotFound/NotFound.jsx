import React from 'react'
import './NotFound.module.css'
import notFound from '../../Assets/error.svg'

export default function NotFound() {
  return (
    <div className='w-100 text-center'>
      <img src={notFound} alt="" />
      <h1 className='text-center'>404</h1>
      <h3 className='text-center'>Page Not Found</h3>
    </div>
    )
}
