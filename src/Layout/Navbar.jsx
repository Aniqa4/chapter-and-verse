import { useContext, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineDashboardCustomize, MdOutlineFavoriteBorder, MdKeyboardArrowDown, MdLogout } from 'react-icons/md';
import NavbarMenu from './NavbarMenu';
import { AuthContext } from '../authProvider/AuthProvider';
import { CgShoppingBag } from 'react-icons/cg';
import LogOut from '../Hooks/LogOut';
import { useSelector } from 'react-redux';


function Navbar() {
  const { user } = useContext(AuthContext);
  const { handleSignOut } = LogOut();
  const cart = useSelector((state) => state.cart.cartItems);
  const favorite = useSelector((state) => state.favorite.favoriteItems);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

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
          {user ? (
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className='flex items-center gap-2 hover:text-gray-500'
              >
                {user.photoURL ? (
                  <img src={user.photoURL} className='w-8 h-8 rounded-full object-cover border border-gray-300' />
                ) : (
                  <span className='w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold'>
                    {initials}
                  </span>
                )}
                <span className='hidden xl:block text-sm font-medium'>
                  {user.displayName?.split(' ')[0] || 'Account'}
                </span>
                <MdKeyboardArrowDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-44 bg-white border border-gray-100 shadow-lg rounded z-50 py-1'>
                  <Link
                    to='dashboard'
                    onClick={() => setDropdownOpen(false)}
                    className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50'
                  >
                    <MdOutlineDashboardCustomize className='text-base' /> Dashboard
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); handleSignOut(); }}
                    className='w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50'
                  >
                    <MdLogout className='text-base' /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className='hover:text-gray-400 text-2xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button>
          )}
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
              {user ? (
                user.photoURL ? (
                  <img src={user.photoURL} className='w-7 h-7 rounded-full object-cover border border-gray-300' />
                ) : (
                  <span className='w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold'>
                    {initials}
                  </span>
                )
              ) : (
                <button className='text-xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar