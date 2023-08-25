import React, { useEffect, useState, useRef } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function SearchBooks() {
    const [searchedItem, setSearchedItem] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResults, setShowResults] = useState(false);
    const searchResultsRef = useRef(null);

    const handleSearch = (event) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value;
        setSearchedItem(search);
        setShowResults(true);
    }

    useEffect(() => {
        if (searchedItem !== '') {
            fetch(`https://chapter-and-verse-server-side.vercel.app/search-books/${searchedItem}`)
                .then(res => res.json())
                .then(data => setSearchResult(data))
                .catch(error => console.error('Error fetching data:', error));
        } else {
            setSearchResult([]); // Clear search results if the search term is empty
        }
    }, [searchedItem]);

    // Add an event listener to detect clicks outside of the search results div
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        
        // Unbind the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    console.log(searchResult);

    return (
        <div className=' container mx-auto'>
            <form onSubmit={handleSearch} className='flex justify-center'>
                <div className=' relative  w-1/2'>
                    <input type="text" name="search" className=' absolute top-0 left-5 right-0 bottom-0' />
                </div>
                <button className=' text-2xl flex items-center bg-gray-800 text-white p-2'><BiSearchAlt2 /></button>
            </form>
            <div className=' relative' >
                {showResults && (
                    <div className="absolute top-0 left-0 right-0 bg-opacity-75 flex items-center justify-center z-50">
                        <div ref={searchResultsRef} className="bg-gray-50 p-4 w-1/2 overflow-y-auto max-h-96">
                            {searchResult.length === 0 ? (
                                <p className="text-gray-800">No results found.</p>
                            ) : (
                                <ul>
                                    {searchResult.map((book, index) => (
                                        <li key={index} className="mb-2">
                                            <h3 className=" text-gray-600 hover:text-blue-600" title='Click here to visit'>
                                                <Link to={`/categories/${book?.category}/${book?.bookName}`}>{book.bookName}</Link>
                                            </h3>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBooks;
