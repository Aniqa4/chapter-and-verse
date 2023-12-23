import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import NavbarMenu from './NavbarMenu';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AuthContext } from '../authProvider/AuthProvider';;
import { CgShoppingBag } from 'react-icons/cg';
import LogOut from '../Hooks/LogOut';
import { useSelector } from 'react-redux';


function Navbar() {
  const { user } = useContext(AuthContext);
  const { handleSignOut } = LogOut()
  const cart = useSelector((state) => state.cart.cartItems)
  const favorite = useSelector((state) => state.favorite.favoriteItems)

  const favoriteItemsString = localStorage.getItem(user ? user.email + 'favorites' : 'favorites');
  const favoriteItems = JSON.parse(favoriteItemsString);
  const totalItems = favoriteItems?.length

  const cartItemsString = localStorage.getItem(user ? user.email + 'cart' : 'cart');
  const cartItems = JSON.parse(cartItemsString);
  const totalItemsInCart = cartItems?.length

  //console.log(user.email);
  return (
    <>
      <div className='hidden lg:block bg-white fixed top-0 left-0 right-0 z-50 shadow '>
        <div className='container mx-auto  px-5 flex justify-between text-slate-700 py-5'>
          <NavbarMenu />
          <div className='flex items-center'>
            <h1 className=' font-bold text-sm uppercase'><Link to='/'>Chapter<span className=' text-black'>&</span>Verse</Link></h1>
          </div>
          <ul className='flex lg:gap-5 xl:gap-10'>
            <li className=' hover:text-gray-400'><Link to='/'>Home</Link></li>
            <li className=' hover:text-gray-400'><Link to='/books'>Books</Link></li>
            <li className=' hover:text-gray-400'><Link to='/categories'>Categories</Link></li>
            <li className=' hover:text-gray-400'><Link to='/authors'>Authors</Link></li>
            <li className=' hover:text-gray-400'><Link to='/publishers'>Publishers</Link></li>
            <li className='  hover:text-gray-400 relative text-xl'><Link to='/wishlist'><MdOutlineFavoriteBorder /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>{favorite === 0 ? totalItems : favorite}</span></li>
            <li className=' hover:text-gray-400 relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>{cart === 0 ? totalItemsInCart : cart}</span></li>
          </ul>
          {
            user ?
              <div className='flex gap-5'>
                <button onClick={handleSignOut} className=' text-xs px-3 py-1 border border-gray-500 font-bold  hover:bg-gray-200'>Log Out</button>
                <Link to='dashboard' className='  hover:text-gray-400 text-2xl'><MdOutlineDashboardCustomize /></Link>
              </div>
              :
              <button className='  hover:text-gray-400 text-2xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button>
          }
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
              <span className=' absolute -top-2 -right-2 text-xs'>{totalItems}</span>
            </li>
            <li className=' relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>{totalItemsInCart}</span>
            </li>
            <li>
              {
                user ?
                  <Link to='dashboard' className='  hover:text-gray-400 text-2xl'><MdOutlineDashboardCustomize /></Link>
                  : <button className=' text-xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button>
              }
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar