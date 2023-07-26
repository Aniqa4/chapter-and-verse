import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className='px-20 flex justify-between bg-sky-600 text-white py-5'>
        <h1>Chapter&Verse</h1>
        <ul className='flex gap-10'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/all-books'>All Books</Link></li>
        </ul>
        <button>Sign In</button>
      </div>
    </>
  )
}

export default Navbar