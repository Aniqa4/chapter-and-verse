import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

function SearchBooks() {
    const [searchedItem, setSearchedItem] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResults, setShowResults] = useState(false);


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

    console.log(searchResult);

    return (
        <div className=' container mx-auto'>
            <form onSubmit={handleSearch} className='flex justify-center mt-10'>
                <div className=' relative  w-1/2'>
                    <input type="search" name="search" className=' absolute top-0 left-0 right-0 bottom-0' />
                </div>
                <button className=' text-2xl flex items-center bg-gray-800 text-white p-2'><BiSearchAlt2 /></button>
            </form>
            <div className=' relative'>
                {showResults && (
                    <div className="absolute top-0 left-0 right-0 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-gray-100 p-4 w-1/2">
                            {searchResult.length === 0 ? (
                                <p className="text-gray-800">No results found.</p>
                            ) : (
                                <ul>
                                    {searchResult.map((book, index) => (
                                        <li key={index} className="mb-2">
                                            <h3 className=" text-blue-600">{book.bookName}</h3>
                                            {/* Add other information about the book, like author, description, etc. */}
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

export default SearchBooks