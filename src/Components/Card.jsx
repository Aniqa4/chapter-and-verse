import React from 'react'
import { Link } from 'react-router-dom'

function Card({ image, categoryName, description, route }) {
  return (
    <div className=' relative text-white'>
      <img src={image} className=' w-full' />
      <div className=' absolute top-0 left-0 right-0 bottom-0 p-5 grid items-center bg-slate-900 bg-opacity-40'>
        <h1 className=' md:text-2xl font-semibold'>{categoryName}</h1>
        <p className='py-2 text-xs md:text-base'>{description}</p>
        <Link to={route}><button className=' bg-slate-800 rounded text-white px-5 py-2 hover:bg-slate-600'>Browse</button></Link>
      </div>
    </div>
  )
}

export default Card