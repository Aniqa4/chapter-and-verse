import React from 'react'
import banner from '../assets/banner.jpg';


function Banner() {
  return (
    <div className=' mx-auto relative text-white'>
        <img src={banner} className=' lg:h-screen opacity-50 w-screen' />
        <div className=' absolute top-1/4 md:top-1/3 left-0 right-0 bg-slate-700 bg-opacity-40 p-5 md:py-20'>
          <h1 className=' text-xl md:text-3xl font-semibold text-center'>Chapter&Verse</h1>
          <p className=' text-center font-semibold text-xs md:text-xl'>Unlock the World of Knowledge - Your One-Stop Bookshop!</p>
        </div>
    </div>
  )
}

export default Banner