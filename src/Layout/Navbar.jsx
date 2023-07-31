import React from 'react'
import { Link } from 'react-router-dom';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';


function Navbar() {
  return (
    <>
      <div className=' bg-white fixed top-0 left-0 right-0 z-50 shadow '>
        <div className='container mx-auto flex justify-between text-slate-700 py-5'>
          <h1 className=' font-bold uppercase'>Chapter<span className=' text-black'>&</span>Verse</h1>
          <ul className='flex gap-10'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/all-books'>All Books</Link></li>
            <li><Link to='/category'>Category</Link></li>
            <li className=' relative text-xl'><Link to='/wishlist'><MdOutlineFavoriteBorder/></Link>
            <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
            <li className=' relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
            <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
          </ul>
          <button className=' text-2xl'><AiOutlineUserAdd/></button>
        </div>
      </div>
      <div className=' fixed bottom-10 right-5 md:right-10 rounded-full z-50'>
        <div className=' relative'>
          <h1 className=' text-black text-4xl'><CgShoppingBag /></h1>
          <p className=' absolute top-1/2 -right-1 px-2 py-1 bg-black text-white text-xs rounded-full'>1</p>
        </div>
      </div>
    </>
  )
}

export default Navbar