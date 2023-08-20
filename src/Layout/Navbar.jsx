import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import NavbarMenu from './NavbarMenu';
import Cart from '../Cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';


function Navbar() {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged in',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(from, { replace: true })
      })
      .catch(error => {
        console.log(error);

      })
  }

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
            <li className='  hover:text-gray-400 relative text-xl'><Wishlist />
              <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
            <li className=' hover:text-gray-400 relative text-xl'><Cart />
              <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
          </ul>
          {
            user ? <button onClick={handleSignOut} className='  hover:text-gray-400 text-2xl'>Log Out</button> :
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
            <li className=' relative text-xl'><Wishlist />
              <span className=' absolute -top-2 -right-2 text-xs'>10</span>
            </li>
            <li className=' relative text-xl'><Cart />
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