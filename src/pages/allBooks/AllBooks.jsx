import React, { useState } from 'react';
import Title from '../../components/Title';
import BookLayout from '../../components/BookLayout';
import Books from '../../Hooks/Books';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function AllBooks() {
  const books = Books();
  const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  if (!books) {
    return <div>Loading...</div>;
  }

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the books to display on the current page
  const booksToDisplay = books.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className=' container mx-auto pt-1'>
      <Title title={'books'}></Title>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center mx-5 md:mx-0 pb-10'>
        {booksToDisplay.map((x) => (
          <BookLayout
            key={x?._id}
            product_id={x._id}
            bookImage={x.bookImage}
            bookName={x.bookName}
            price={x.price}
            route={`/categories/${x?.category}/${x.bookName}`}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center my-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="border px-5 py-3 me-5"
        >
          <AiOutlineLeft/>
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="border px-5 py-3"
        >
          <AiOutlineRight/>
        </button>
      </div>
    </div>
  );
}

export default AllBooks;
