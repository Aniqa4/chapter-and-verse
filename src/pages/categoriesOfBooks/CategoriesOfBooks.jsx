import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { MdArrowForward } from 'react-icons/md';
import BookCategories from '../../Hooks/BookCategories';

const FALLBACK_COLORS = [
  'from-rose-400 to-pink-600',
  'from-violet-400 to-purple-600',
  'from-blue-400 to-indigo-600',
  'from-teal-400 to-green-600',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-cyan-600',
  'from-red-400 to-rose-600',
  'from-emerald-400 to-teal-600',
];

function CategoryCard({ cat, index }) {
  return (
    <Link
      to={`${cat.name}`}
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ aspectRatio: '1/1' }}
    >
      {cat.image ? (
        <img
          src={cat.image}
          alt={cat.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK_COLORS[index % FALLBACK_COLORS.length]}`} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-1">{cat.name}</h3>
        {cat.description && (
          <p className="text-white/70 text-xs line-clamp-2 mb-3">{cat.description}</p>
        )}
        <span className="flex items-center gap-1 text-xs font-semibold text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Browse <MdArrowForward size={13} />
        </span>
      </div>
    </Link>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-gray-100 animate-pulse" style={{ aspectRatio: '1/1' }} />
      ))}
    </div>
  );
}

function CategoriesOfBooks() {
  const categories = BookCategories();
  const [search, setSearch] = useState('');

  const filtered = (categories ?? []).filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-5 md:px-0 pt-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Browse Categories</h1>
          <p className="text-sm text-gray-400 mt-1">Find books by genre</p>
        </div>

        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-56 focus-within:border-green-400 transition-colors bg-white">
          <CiSearch size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search genres…"
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:outline-none focus:ring-0 border-0"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-300 hover:text-gray-500 text-base leading-none">×</button>
          )}
        </div>
      </div>

      {/* Grid */}
      {!categories ? (
        <CategoriesSkeleton />
      ) : filtered.length === 0 ? (
        <p className="text-center py-20 text-gray-400 text-sm">No categories match &ldquo;{search}&rdquo;</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((cat, i) => (
            <CategoryCard key={cat._id || i} cat={cat} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoriesOfBooks;
