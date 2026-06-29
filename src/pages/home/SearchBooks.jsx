import { useEffect, useRef, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function SearchBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!searchTerm) { setSearchResult([]); return; }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      axiosInstance.get(`/search-books/${searchTerm}`)
        .then(res => { setSearchResult(res.data); setIsSearching(false); })
        .catch(() => setIsSearching(false));
    }, 300);
  }, [searchTerm]);

  useEffect(() => {
    const handleOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="bg-white border-b border-gray-100 py-5">
      <div className="container mx-auto px-4">
        <div className="relative max-w-xl mx-auto" ref={wrapperRef}>
          <div className="flex items-center gap-3 rounded-full px-5 py-2.5 bg-white shadow-sm  focus-within:ring-2 focus-within:ring-green-100 transition-all">
            <BiSearchAlt2 size={20} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search books by title, author…"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setShowResults(true); }}
              onFocus={() => searchTerm && setShowResults(true)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); setSearchResult([]); }}
                className="text-gray-300 hover:text-gray-500 text-lg leading-none flex-shrink-0"
              >
                ×
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showResults && searchTerm && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 items-center animate-pulse">
                      <div className="w-8 h-10 rounded bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                        <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchResult.length === 0 ? (
                <p className="px-5 py-4 text-sm text-gray-400">No books found for &ldquo;{searchTerm}&rdquo;</p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {searchResult.map((book, i) => (
                    <li key={i}>
                      <Link
                        to={`/categories/${book?.category}/${book?.bookName}`}
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        {book.bookImage && (
                          <img src={book.bookImage} alt={book.bookName} className="w-8 h-10 object-cover rounded flex-shrink-0 bg-gray-100" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{book.bookName}</p>
                          {book.authorName && <p className="text-xs text-gray-400 truncate">{book.authorName}</p>}
                        </div>
                        {book.price && <span className="ml-auto text-xs font-semibold text-green-700 flex-shrink-0">{book.price} BDT</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBooks;
