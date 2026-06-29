import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdMenuBook, MdPerson, MdBusiness, MdShoppingBag, MdPeople,
  MdArrowForward, MdCategory, MdAdd,
} from 'react-icons/md';
import axiosInstance from '../../api/axiosInstance';
import UserInfo from '../../Hooks/UserInfo';

const STATS = [
  { key: 'books',      label: 'Books',      icon: MdMenuBook,   bg: 'bg-blue-50',   icon_color: 'text-blue-600',   to: '/books' },
  { key: 'authors',    label: 'Authors',    icon: MdPerson,     bg: 'bg-violet-50', icon_color: 'text-violet-600', to: '/authors' },
  { key: 'publishers', label: 'Publishers', icon: MdBusiness,   bg: 'bg-orange-50', icon_color: 'text-orange-600', to: '/publishers' },
  { key: 'orders',     label: 'Orders',     icon: MdShoppingBag,bg: 'bg-green-50',  icon_color: 'text-green-600',  to: '/dashboard/manage-orders' },
  { key: 'users',      label: 'Users',      icon: MdPeople,     bg: 'bg-red-50',    icon_color: 'text-red-500',    to: '/dashboard/manage-users' },
];

const QUICK_ACTIONS = [
  { label: 'Manage Books',    to: '/dashboard/manage-books',     icon: MdMenuBook },
  { label: 'Manage Users',    to: '/dashboard/manage-users',     icon: MdPeople },
  { label: 'Manage Orders',   to: '/dashboard/manage-orders',    icon: MdShoppingBag },
  { label: 'Add Author',      to: '/dashboard/add-authors',      icon: MdPerson },
  { label: 'Add Publisher',   to: '/dashboard/add-publishers',   icon: MdBusiness },
  { label: 'Add Category',    to: '/dashboard/add-new-category', icon: MdCategory },
];

function Skeleton() {
  return <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />;
}

function DashboardHome() {
  const [, userInfo] = UserInfo();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axiosInstance.get('/books'),
      axiosInstance.get('/authors'),
      axiosInstance.get('/publishers'),
      axiosInstance.get('/orders'),
      axiosInstance.get('/users'),
    ]).then(([books, authors, publishers, orders, users]) => {
      setCounts({
        books:      books.status      === 'fulfilled' ? books.value.data.length      : '—',
        authors:    authors.status    === 'fulfilled' ? authors.value.data.length    : '—',
        publishers: publishers.status === 'fulfilled' ? publishers.value.data.length : '—',
        orders:     orders.status     === 'fulfilled' ? orders.value.data.length     : '—',
        users:      users.status      === 'fulfilled' ? users.value.data.length      : '—',
      });
      setLoading(false);
    });
  }, []);

  const firstName = userInfo?.name?.split(' ')[0] || 'Admin';

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {firstName} 👋</h1>
        <p className="text-sm text-gray-400 mt-1">Here&apos;s a snapshot of your bookstore.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {STATS.map(({ key, label, icon: Icon, bg, icon_color, to }) => (
          <Link
            key={key}
            to={to}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={icon_color} />
            </div>
            {loading ? <Skeleton /> : (
              <p className="text-2xl font-bold text-gray-800 leading-none">{counts[key]}</p>
            )}
            <p className="text-xs text-gray-400 mt-1.5 font-medium">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MdAdd size={18} className="text-gray-400" />
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Quick Actions</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Icon size={17} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
              </div>
              <MdArrowForward size={15} className="text-gray-200 group-hover:text-green-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
