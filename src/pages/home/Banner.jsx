import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import banner from '../../assets/banner.jpg';
import axiosInstance from '../../api/axiosInstance';

function Banner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const wrapperRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) { setResults([]); return; }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearching(true);
      axiosInstance.get(`/search-books/${searchTerm}`)
        .then(res => { setResults(res.data); setShowResults(true); })
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 300);
  }, [searchTerm]);

  useEffect(() => {
    const close = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: 460 }}>
      {/* Background */}
      <img src={banner} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-white/50" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-green-400 mb-3">
          Welcome to
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
          Chapter<span className="text-green-400">&amp;</span>Verse
        </h1>
        <p className="text-gray-300 text-sm md:text-lg max-w-lg mb-8 leading-relaxed">
          Discover books that inspire, educate and entertain.
        </p>

        {/* Search bar */}
        <div className="relative w-full max-w-xl mb-8" ref={wrapperRef}>
          <div className="flex items-center gap-3 bg-white rounded-full shadow-xl px-5 py-2">
            <BiSearchAlt2 size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setShowResults(true); }}
              onFocus={() => searchTerm && setShowResults(true)}
              placeholder="Search by title, author, genre…"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:outline-none focus:ring-0 border-0"
            />
            {searching && (
              <span className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
            )}
            {searchTerm && !searching && (
              <button
                onClick={() => { setSearchTerm(''); setResults([]); setShowResults(false); }}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none flex-shrink-0 transition-colors"
              >×</button>
            )}
          </div>

          {/* Dropdown */}
          {showResults && searchTerm && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto text-left">
              {results.length === 0 ? (
                <p className="px-5 py-4 text-sm text-gray-400">No books found for &ldquo;{searchTerm}&rdquo;</p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {results.map((book, i) => (
                    <li key={i}>
                      <Link
                        to={`/categories/${book?.category}/${book?.bookName}`}
                        onClick={() => { setShowResults(false); setSearchTerm(''); }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        {book.bookImage && (
                          <img src={book.bookImage} alt={book.bookName} className="w-8 h-10 object-cover rounded flex-shrink-0 bg-gray-100" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{book.bookName}</p>
                          {book.authorName && <p className="text-xs text-gray-400">{book.authorName}</p>}
                        </div>
                        {book.price && <span className="text-xs font-bold text-green-700 flex-shrink-0">{book.price} BDT</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/books" className="px-7 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full transition-colors shadow-lg text-sm">
            Explore Books
          </Link>
          <button
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-2.5 border border-white/50 hover:bg-white/10 text-white font-semibold rounded-full transition-colors text-sm"
          >
            Browse Categories
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
