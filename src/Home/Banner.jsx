import React from 'react'
import banner from '../assets/banner.jpg';

function Banner() {
  return (
    <div className=' mx-auto relative text-white'>
        <img src={banner} className=' lg:h-screen opacity-70 w-screen' />
        <div className=' absolute top-1/4 md:top-1/3 lg:left-32 lg:right-32 left-5 right-5 bg-sky-500 bg-opacity-50 p-5 md:py-20'>
          <h1 className=' text-3xl font-semibold text-center'>Chapter&Verse</h1>
          <p className=' text-center text-gray-200 font-semibold text-xl'>Unlock the World of Knowledge - Your One-Stop Bookshop!</p>
        </div>
    </div>
  )
}

export default Banner