import { Link } from 'react-router-dom';
import { MdArrowForward, MdAutoAwesome } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import BookLayout from '../../Components/BookLayout';
import BookGridSkeleton from '../../Components/BookGridSkeleton';
import axiosInstance from '../../api/axiosInstance';

function SectionHeader({ icon: Icon, title, to, badge }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon size={18} className="text-violet-600" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
          {badge && (
            <span className="text-[10px] font-bold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {badge}
            </span>
          )}
        </div>
        <div className="h-0.5 w-10 bg-violet-600 rounded-full" />
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

function NewArrivals() {
  const { isLoading, isError, data: books } = useQuery({
    queryKey: ['newArrivals'],
    queryFn: async () => (await axiosInstance.get('/new-arrivals')).data,
  });

  return (
    <section className="container mx-auto px-4 md:px-0 py-10">
      <SectionHeader icon={MdAutoAwesome} title="New Arrivals" to="/books" badge="Just In" />
      {isLoading ? (
        <BookGridSkeleton count={10} />
      ) : isError ? (
        <p className="text-center py-10 text-red-400 text-sm">Failed to load new arrivals.</p>
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
    </section>
  );
}

export default NewArrivals;
