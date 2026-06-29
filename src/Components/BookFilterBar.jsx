import { CiSearch } from 'react-icons/ci';
import { MdSort } from 'react-icons/md';

export function applyBookFilters(books, { sort, inStockOnly, search }) {
  if (!books) return [];
  let result = [...books];

  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(b =>
      b.bookName?.toLowerCase().includes(q) ||
      b.authorName?.toLowerCase().includes(q)
    );
  }

  if (inStockOnly) result = result.filter(b => (b.stock ?? 1) > 0);

  switch (sort) {
    case 'price_asc':  result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break;
    case 'price_desc': result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); break;
    case 'name_asc':   result.sort((a, b) => (a.bookName ?? '').localeCompare(b.bookName ?? '')); break;
    case 'name_desc':  result.sort((a, b) => (b.bookName ?? '').localeCompare(a.bookName ?? '')); break;
    case 'popular':    result.sort((a, b) => (b.soldCopies ?? 0) - (a.soldCopies ?? 0)); break;
    case 'newest':     result.sort((a, b) => new Date(b.dateOfArrival) - new Date(a.dateOfArrival)); break;
    default: break;
  }

  return result;
}

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors duration-200 ${on ? 'bg-green-500' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </div>
  );
}

function BookFilterBar({ total, sort, setSort, inStockOnly, setInStockOnly, search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      {/* Search */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 w-full sm:w-60 focus-within:border-green-400 transition-colors">
        <CiSearch size={16} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or author…"
          className="flex-1 text-xs text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:outline-none focus:ring-0 border-0"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-gray-300 hover:text-gray-500 text-base leading-none flex-shrink-0">×</button>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <p className="text-xs text-gray-400 hidden sm:block">
          <span className="font-semibold text-gray-600">{total}</span> book{total !== 1 ? 's' : ''}
        </p>

        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
          <Toggle on={inStockOnly} onToggle={() => setInStockOnly(v => !v)} />
          In stock only
        </label>

        <div className="relative">
          <MdSort className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="pl-7 pr-6 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 bg-white focus:outline-none focus:border-green-400 cursor-pointer appearance-none"
          >
            <option value="">Default order</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A → Z</option>
            <option value="name_desc">Name: Z → A</option>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default BookFilterBar;
