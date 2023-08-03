import React from 'react'
import { Link } from 'react-router-dom';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import NavbarMenu from './NavbarMenu';


function Navbar() {


  return (
    <>
      <div className='hidden lg:block bg-white fixed top-0 left-0 right-0 z-50 shadow '>
        <div className='container mx-auto px-5 flex justify-between text-slate-700 py-5'>
          <NavbarMenu />
          <div className='flex items-center'>
            <h1 className=' font-bold text-sm uppercase'><Link to='/'>Chapter<span className=' text-black'>&</span>Verse</Link></h1>
          </div>
          <ul className='flex lg:gap-5 xl:gap-10'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/all-books'>Books</Link></li>
            <li><Link to='/category'>Categories</Link></li>
            <li><Link to='/authors'>Authors</Link></li>
            <li><Link to='/publishers'>Publishers</Link></li>
            <li className=' relative text-xl'><Link to='/wishlist'><MdOutlineFavoriteBorder /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
            <li className=' relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
          </ul>
          <button className=' text-2xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button>
        </div>
      </div>
      <div className=' lg:hidden bg-white fixed top-0 left-0 right-0 z-50 shadow '>
        <div className='container mx-auto px-5 flex justify-between text-slate-700 py-5'>
          <NavbarMenu />
          <div className=' flex items-center'>
            <h1 className=' font-bold text-sm uppercase'><Link to='/'>Chapter<span className=' text-black'>&</span>Verse</Link></h1>
          </div>
          <ul className='flex gap-5'>
            <li className=' relative text-xl'><Link to='/wishlist'><MdOutlineFavoriteBorder /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span>
            </li>
            <li className=' relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span>
            </li>
            <li><button className=' text-xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar