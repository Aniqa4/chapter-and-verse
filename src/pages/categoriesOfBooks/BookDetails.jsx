import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineFavoriteBorder, MdFavorite, MdEdit, MdArrowBack } from 'react-icons/md';
import { CgShoppingBag } from 'react-icons/cg';
import UserInfo from '../../Hooks/UserInfo';
import AddTo from '../../Hooks/AddTo';
import { AuthContext } from '../../authProvider/AuthProvider';
import axiosInstance from '../../api/axiosInstance';

const fmt = date => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

function MetaItem({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value || '—'}</span>
    </div>
  );
}

function BookDetailsSkeleton() {
  return (
    <div className="container mx-auto px-5 md:px-0 py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-2xl aspect-[2/3] max-w-xs mx-auto w-full" />
        <div className="space-y-4 py-4">
          <div className="h-4 bg-gray-100 rounded w-20" />
          <div className="h-8 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-10 bg-gray-100 rounded w-1/4 mt-4" />
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-100 rounded" />)}
          </div>
          <div className="flex gap-3 mt-6">
            <div className="h-11 bg-gray-100 rounded-xl flex-1" />
            <div className="h-11 bg-gray-100 rounded-xl flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BookDetails() {
  const { bookName, name: category } = useParams();
  const [bookData, setBookData] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [role] = UserInfo();
  const { user } = useContext(AuthContext);
  const { handleCart, handleWishlist } = AddTo();

  useEffect(() => {
    axiosInstance.get(`/books/${bookName}`)
      .then(res => setBookData(res.data))
      .catch(() => setBookData({}));
  }, [bookName]);

  if (!bookData) return <BookDetailsSkeleton />;

  const inStock = (bookData.stock ?? 1) > 0;

  const onWishlist = () => {
    handleWishlist(bookData._id, bookData.bookName, bookData.bookImage, bookData.price, user?.email);
    setWishlisted(true);
  };

  const onCart = () => {
    handleCart(bookData._id, bookData.bookName, bookData.bookImage, bookData.price, user?.email);
  };

  return (
    <div className="container mx-auto px-5 md:px-0 py-6 pb-16">
      {/* Back + admin edit */}
      <div className="flex items-center justify-between mb-6">
        <Link to={`/categories/${category}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
          <MdArrowBack size={16} /> Back to {category}
        </Link>
        {role === 'admin' && (
          <Link
            to={`/categories/${category}/${bookName}/update-book`}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
          >
            <MdEdit size={14} /> Edit Book
          </Link>
        )}
      </div>

      {/* Main layout */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Cover image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-xs">
            {bookData.bookImage ? (
              <img
                src={bookData.bookImage}
                alt={bookData.bookName}
                className="w-full rounded-2xl shadow-2xl object-cover"
                style={{ aspectRatio: '210/297' }}
              />
            ) : (
              <div className="w-full rounded-2xl bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '210/297' }}>
                <span className="text-gray-300 text-5xl">📖</span>
              </div>
            )}
            {/* Stock badge */}
            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          {/* Category pill */}
          <Link to={`/categories/${bookData.category}`} className="self-start text-xs font-semibold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full hover:bg-green-100 transition-colors">
            {bookData.category}
          </Link>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">{bookData.bookName}</h1>

          {/* Author */}
          <p className="text-gray-500 text-sm">
            by{' '}
            <Link to={`/authors/${bookData.authorName}`} className="font-semibold text-gray-700 hover:text-green-600 transition-colors">
              {bookData.authorName}
            </Link>
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{bookData.price}</span>
            <span className="text-base text-gray-400 font-medium">BDT</span>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-4 py-5 border-y border-gray-100">
            <MetaItem label="Pages" value={bookData.numberOfPages} />
            <MetaItem label="Publisher" value={bookData.publisherName} />
            <MetaItem label="Published" value={fmt(bookData.dateOfArrival)} />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCart}
              disabled={!inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              <CgShoppingBag size={18} /> Add to Cart
            </button>
            <button
              onClick={onWishlist}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-colors ${wishlisted ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'}`}
            >
              {wishlisted ? <MdFavorite size={18} /> : <MdOutlineFavoriteBorder size={18} />}
            </button>
          </div>

          {/* Similar books link */}
          <Link
            to={`/categories/${bookData.category}`}
            className="text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
          >
            Explore more in {bookData.category} →
          </Link>
        </div>
      </div>

      {/* Description */}
      {bookData.description && (
        <div className="mt-12 max-w-2xl">
          <h2 className="text-lg font-bold text-gray-800 mb-3">About this book</h2>
          <div className="h-0.5 w-10 bg-green-500 rounded-full mb-4" />
          <p className="text-sm text-gray-500 leading-relaxed">{bookData.description}</p>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
