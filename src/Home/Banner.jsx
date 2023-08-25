import React from 'react'
import banner from '../assets/banner.jpg';


function Banner() {
  return (
    <div className=' mx-auto relative text-white mb-10'>
        <img src={banner} className=' opacity-50 w-screen' />
        <div className=' absolute top-1/3 md:top-1/4 xl:top-1/4 left-0 right-0 bg-slate-700 bg-opacity-40 md:p-5 xl:py-10'>
          <h1 className=' text-base md:text-3xl font-semibold text-center'>Chapter&Verse</h1>
          <p className=' text-center font-semibold text-xs md:text-xl'>Unlock the World of Knowledge - Your One-Stop Bookshop!</p>
        </div>
    </div>
  )
}

export default Banner