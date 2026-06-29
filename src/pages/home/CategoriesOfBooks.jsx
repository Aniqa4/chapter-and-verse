import { Link } from 'react-router-dom';
import { MdArrowForward, MdGridView } from 'react-icons/md';
import BookCategories from '../../Hooks/BookCategories';

const FALLBACK_COLORS = [
  'from-rose-400 to-pink-600',
  'from-violet-400 to-purple-600',
  'from-blue-400 to-indigo-600',
  'from-teal-400 to-green-600',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-cyan-600',
];

function CategoriesOfBooks() {
  const categories = BookCategories();

  return (
    <section id="categories" className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-0">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MdGridView size={18} className="text-blue-600" />
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Browse by Genre</h2>
            </div>
            <div className="h-0.5 w-10 bg-blue-600 rounded-full" />
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
          >
            All genres <MdArrowForward size={15} />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories?.map((cat, i) => (
            <Link
              key={cat._id || i}
              to={`categories/${cat.name}`}
              className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              {cat.image ? (
                <>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK_COLORS[i % FALLBACK_COLORS.length]}`} />
              )}
              <div className="absolute inset-0 flex items-end p-2.5">
                <span className="text-white text-xs font-bold leading-tight drop-shadow-sm">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesOfBooks;
