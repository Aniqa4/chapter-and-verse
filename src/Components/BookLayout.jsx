import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { CgShoppingBag } from 'react-icons/cg';
import { AuthContext } from '../authProvider/AuthProvider';
import AddTo from '../Hooks/AddTo';

function BookLayout({ product_id, bookImage, bookName, price, route }) {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { handleCart, handleWishlist } = AddTo();

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Cover image */}
      <Link to={route} className="block relative overflow-hidden bg-gray-100" style={{ aspectRatio: '210/297' }}>
        <img
          src={bookImage}
          alt={bookName}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-end justify-center gap-2.5 pb-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={e => { e.preventDefault(); handleWishlist(product_id, bookName, bookImage, price, email); }}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
            title="Add to wishlist"
          >
            <MdOutlineFavoriteBorder size={16} className="text-gray-700" />
          </button>
          <button
            onClick={e => { e.preventDefault(); handleCart(product_id, bookName, bookImage, price, email); }}
            className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors"
            title="Add to cart"
          >
            <CgShoppingBag size={16} className="text-white" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5">{bookName}</h3>
        <p className="text-xs font-bold text-green-700">{price} <span className="font-normal text-gray-400">Tk</span></p>
      </div>
    </div>
  );
}

export default BookLayout;
