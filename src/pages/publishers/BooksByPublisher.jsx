import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../Components/Title';
import BookLayout from '../../Components/BookLayout';
import BookGridSkeleton from '../../Components/BookGridSkeleton';
import BookFilterBar, { applyBookFilters } from '../../Components/BookFilterBar';
import axiosInstance from '../../api/axiosInstance';

function BooksByPublisher() {
  const { name: publisher } = useParams();
  const [books, setBooks] = useState(null);
  const [sort, setSort] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setBooks(null);
    axiosInstance.get(`/books-by-publisher/${publisher}`)
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]));
  }, [publisher]);

  const filtered = applyBookFilters(books ?? [], { sort, inStockOnly, search });

  return (
    <div className="container mx-auto pt-1 px-5 md:px-0">
      <Title title={`Books by ${publisher}`} />

      {books === null ? (
        <BookGridSkeleton count={10} />
      ) : (
        <>
          <BookFilterBar
            total={filtered.length}
            sort={sort}
            setSort={setSort}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            search={search}
            setSearch={setSearch}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 pb-10">
            {filtered.map(x => (
              <BookLayout
                key={x._id}
                product_id={x._id}
                bookImage={x.bookImage}
                bookName={x.bookName}
                price={x.price}
                route={`/categories/${x.category}/${x.bookName}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BooksByPublisher;
