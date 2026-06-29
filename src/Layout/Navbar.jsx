import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineDashboardCustomize, MdOutlineFavoriteBorder, MdKeyboardArrowDown, MdLogout } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { CgShoppingBag } from 'react-icons/cg';
import NavbarMenu from './NavbarMenu';
import { AuthContext } from '../authProvider/AuthProvider';
import LogOut from '../Hooks/LogOut';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';

function NavSearch() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const timer = useRef(null);

  const expand = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 30); };
  const collapse = () => { setTerm(''); setResults([]); setShow(false); setOpen(false); };

  useEffect(() => {
    if (!term.trim()) { setResults([]); setShow(false); return; }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setBusy(true);
      axiosInstance.get(`/search-books/${term}`)
        .then(r => { setResults(r.data); setShow(true); })
        .catch(() => {})
        .finally(() => setBusy(false));
    }, 300);
  }, [term]);

  useEffect(() => {
    const close = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShow(false);
        if (!term) setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [term]);

  return (
    <div className="relative flex flex-row-reverse items-center gap-1" ref={wrapperRef}>
      <button onClick={expand} className="text-gray-500 hover:text-green-600 transition-colors flex-shrink-0">
        <CiSearch size={24} />
      </button>

      {open && (busy
        ? <span className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        : term && <button onClick={collapse} className="text-gray-400 hover:text-gray-600 text-base leading-none flex-shrink-0">×</button>
      )}

      <div className={`overflow-hidden transition-all duration-200 ${open ? 'w-44' : 'w-0'}`}>
        <input
          ref={inputRef}
          type="text"
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search books…"
          className="w-full text-xs text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-transparent focus:border-green-500 pb-0.5"
        />
      </div>

      {show && term && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-xs text-gray-400">No results for &ldquo;{term}&rdquo;</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {results.map((book, i) => (
                <li key={i}>
                  <Link
                    to={`/categories/${book?.category}/${book?.bookName}`}
                    onClick={collapse}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    {book.bookImage && <img src={book.bookImage} alt="" className="w-7 h-9 object-cover rounded bg-gray-100 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{book.bookName}</p>
                      {book.authorName && <p className="text-xs text-gray-400 truncate">{book.authorName}</p>}
                    </div>
                    {book.price && <span className="text-xs font-semibold text-green-700 flex-shrink-0">{book.price} BDT</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const { user } = useContext(AuthContext);
  const { handleSignOut } = LogOut();
  const cart = useSelector(state => state.cart.cartItems);
  const favorite = useSelector(state => state.favorite.favoriteItems);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const close = e => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const favoriteItemsString = localStorage.getItem(user ? user.email + 'favorites' : 'favorites');
  const favoriteItems = JSON.parse(favoriteItemsString);
  const totalItems = favoriteItems?.length;

  const cartItemsString = localStorage.getItem(user ? user.email + 'cart' : 'cart');
  const cartItems = JSON.parse(cartItemsString);
  const totalItemsInCart = cartItems?.length;

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-white fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-5 flex items-center justify-between text-slate-700 py-3.5 gap-4">
          <NavbarMenu />

          <h1 className="font-bold text-sm uppercase flex-shrink-0">
            <Link to="/">Chapter<span className="text-green-600">&amp;</span>Verse</Link>
          </h1>

          {/* Nav links */}
          <ul className="flex items-center gap-5 text-sm">
            <li className="hover:text-gray-400 transition-colors"><Link to="/">Home</Link></li>
            <li className="hover:text-gray-400 transition-colors"><Link to="/books">Books</Link></li>
            <li className="hover:text-gray-400 transition-colors"><Link to="/categories">Categories</Link></li>
            <li className="hover:text-gray-400 transition-colors"><Link to="/authors">Authors</Link></li>
            <li className="hover:text-gray-400 transition-colors"><Link to="/publishers">Publishers</Link></li>
            <li className="hover:text-gray-400 relative text-xl transition-colors">
              <Link to="/wishlist"><MdOutlineFavoriteBorder /></Link>
              <span className="absolute -top-2 -right-2 text-xs">{favorite === 0 ? totalItems : favorite}</span>
            </li>
            <li className="hover:text-gray-400 relative text-xl transition-colors">
              <Link to="/cart"><CgShoppingBag /></Link>
              <span className="absolute -top-2 -right-2 text-xs">{cart === 0 ? totalItemsInCart : cart}</span>
            </li>
            <li className="text-xl"><NavSearch /></li>
          </ul>

          {/* User */}
          {user ? (
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(o => !o)} className="flex items-center gap-2 hover:text-gray-500">
                {user.photoURL ? (
                  <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">{initials}</span>
                )}
                <span className="hidden xl:block text-sm font-medium">{user.displayName?.split(' ')[0] || 'Account'}</span>
                <MdKeyboardArrowDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-1 overflow-hidden">
                  <Link to="dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                    <MdOutlineDashboardCustomize /> Dashboard
                  </Link>
                  <button onClick={() => { setDropdownOpen(false); handleSignOut(); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
                    <MdLogout /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="hover:text-gray-400 text-2xl flex-shrink-0"><Link to="/log-in"><AiOutlineUserAdd /></Link></button>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden bg-white fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between text-slate-700 py-3.5 gap-3">
          <NavbarMenu />
          <h1 className="font-bold text-sm uppercase">
            <Link to="/">Chapter<span className="text-green-600">&amp;</span>Verse</Link>
          </h1>
          <ul className="flex items-center gap-4">
            <li className="relative text-xl">
              <Link to="/wishlist"><MdOutlineFavoriteBorder /></Link>
              <span className="absolute -top-2 -right-2 text-xs">{totalItems}</span>
            </li>
            <li className="relative text-xl">
              <Link to="/cart"><CgShoppingBag /></Link>
              <span className="absolute -top-2 -right-2 text-xs">{totalItemsInCart}</span>
            </li>
            <li>
              {user ? (
                user.photoURL
                  ? <img src={user.photoURL} className="w-7 h-7 rounded-full object-cover border border-gray-200" />
                  : <span className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">{initials}</span>
              ) : (
                <button className="text-xl"><Link to="/log-in"><AiOutlineUserAdd /></Link></button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
