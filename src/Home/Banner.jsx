import React from 'react'
import banner from '../assets/banner.jpg';

function Banner() {
  return (
    <div className=' container mx-auto relative text-white'>
        <img src={banner} className='mx-auto lg:h-screen' />
        <div className=' absolute top-1/3 lg:left-32 lg:right-32 left-5 right-5 bg-sky-500 bg-opacity-40 py-10'>
          <h1 className=' text-3xl font-semibold text-center'>Chapter&Verse</h1>
          <p className=' text-center font-semibold text-xl'>Unlock the World of Knowledge - Your One-Stop Bookshop!</p>
        </div>
    </div>
  )
}

export default Banner