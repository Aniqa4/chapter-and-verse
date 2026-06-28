import { useEffect, useState, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; // import instance

function SearchBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchResultsRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Fetch search results when searchTerm changes
  useEffect(() => {
    if (!searchTerm) {
      setSearchResult([]);
      return;
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      axiosInstance
        .get(`/search-books/${searchTerm}`)
        .then((res) => { setSearchResult(res.data); setIsSearching(false); })
        .catch((err) => { console.error(err); setIsSearching(false); });
    }, 300); // debounce 300ms
  }, [searchTerm]);

  // Close search results on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto relative">
      <div className="flex justify-center mb-4">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full border border-gray-300 rounded p-2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
          />
          <span className="absolute right-2 top-0 bottom-0  flex items-center text-2xl text-gray-600">
            <BiSearchAlt2 />
          </span>
        </div>
      </div>

      {showResults && searchTerm && (
        <div
          className="absolute top-14 left-1/4 w-1/2 bg-white shadow-lg rounded z-50 max-h-96 overflow-y-auto"
          ref={searchResultsRef}
        >
          {isSearching ? (
            <div className="p-3 space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-3/4" />
              ))}
            </div>
          ) : searchResult.length === 0 ? (
            <p className="p-4 text-gray-600">No results found.</p>
          ) : (
            <ul>
              {searchResult.map((book, index) => (
                <li key={index} className="p-2 hover:bg-gray-100">
                  <Link
                    to={`/categories/${book?.category}/${book?.bookName}`}
                    className="text-gray-700 hover:text-blue-600"
                    onClick={() => setShowResults(false)}
                  >
                    {book.bookName}
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

export default SearchBooks;
