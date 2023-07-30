import React from 'react'
import { Link } from 'react-router-dom'

function Card({ image, categoryName, route }) {
  return (
    <div className=' relative text-white'>
      <img src={image} className=' rounded-xl' />
      <div className=' absolute top-0 left-0 right-0 bottom-0 p-5 rounded-xl grid items-center bg-slate-900 bg-opacity-40'>
        <h1 className=' text-2xl font-semibold'>{categoryName}</h1>
        <button className=' bg-slate-800 rounded text-white px-5 py-2 hover:bg-slate-600'><Link to={route}>Browse</Link></button>
      </div>
    </div>
  )
}

export default Card