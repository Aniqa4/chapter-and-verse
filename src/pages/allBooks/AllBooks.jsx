import { useState } from 'react';
import Title from '../../Components/Title';
import BookLayout from '../../Components/BookLayout';
import BookGridSkeleton from '../../Components/BookGridSkeleton';
import Books from '../../Hooks/Books';
import BookFilterBar, { applyBookFilters } from '../../components/BookFilterBar';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ITEMS_PER_PAGE = 15;

function AllBooks() {
  const books = Books();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState('');

  if (!books) {
    return (
      <div className="container mx-auto pt-1">
        <Title title="books" />
        <BookGridSkeleton count={15} />
      </div>
    );
  }

  const filtered = applyBookFilters(books, { sort, inStockOnly, search });
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const booksToDisplay = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleSort = v => { setSort(v); setCurrentPage(1); };
  const handleStock = fn => { setInStockOnly(fn); setCurrentPage(1); };
  const handleSearch = v => { setSearch(v); setCurrentPage(1); };

  return (
    <div className="container mx-auto pt-1 px-5 md:px-0">
      <Title title="books" />

      <BookFilterBar
        total={filtered.length}
        sort={sort}
        setSort={handleSort}
        inStockOnly={inStockOnly}
        setInStockOnly={handleStock}
        search={search}
        setSearch={handleSearch}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 pb-10">
        {booksToDisplay.map(x => (
          <BookLayout
            key={x._id}
            product_id={x._id}
            bookImage={x.bookImage}
            bookName={x.bookName}
            price={x.price}
            route={`/categories/${x?.category}/${x.bookName}`}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 my-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={safePage === 1}
            className="border px-5 py-3 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            <AiOutlineLeft />
          </button>
          <span className="text-sm text-gray-500">{safePage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={safePage === totalPages}
            className="border px-5 py-3 disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            <AiOutlineRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default AllBooks;
