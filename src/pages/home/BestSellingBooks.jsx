import { Link } from 'react-router-dom';
import { MdArrowForward, MdTrendingUp } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import BookLayout from '../../components/BookLayout';
import BookGridSkeleton from '../../components/BookGridSkeleton';
import axiosInstance from '../../api/axiosInstance';

function SectionHeader({ icon: Icon, title, to, accent }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon size={18} className={accent} />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className={`h-0.5 w-10 rounded-full ${accent.replace('text-', 'bg-')}`} />
      </div>
      <Link
        to={to}
        className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
      >
        See all <MdArrowForward size={15} />
      </Link>
    </div>
  );
}

function BestSellingBooks() {
  const { isLoading, isError, data: books } = useQuery({
    queryKey: ['bestSellingBooks'],
    queryFn: async () => (await axiosInstance.get('/best-selling')).data,
  });

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-0">
        <SectionHeader icon={MdTrendingUp} title="Best Selling" to="/books" accent="text-orange-500" />
        {isLoading ? (
          <BookGridSkeleton count={10} />
        ) : isError ? (
          <p className="text-center py-10 text-red-400 text-sm">Failed to load best-selling books.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books?.map(x => (
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
        )}
      </div>
    </section>
  );
}

export default BestSellingBooks;
