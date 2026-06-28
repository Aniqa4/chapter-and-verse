import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import UserInfo from '../../Hooks/UserInfo';

function StatCard({ label, value, to }) {
  return (
    <Link to={to} className="block border rounded p-5 shadow-sm hover:shadow-md text-center bg-white">
      <p className="text-3xl font-bold text-red-700">{value ?? '—'}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </Link>
  );
}

function DashboardHome() {
  const [, userInfo] = UserInfo();
  const [counts, setCounts] = useState({ books: null, authors: null, publishers: null, orders: null, users: null });

  useEffect(() => {
    Promise.allSettled([
      axiosInstance.get('/books'),
      axiosInstance.get('/authors'),
      axiosInstance.get('/publishers'),
      axiosInstance.get('/orders'),
      axiosInstance.get('/users'),
    ]).then(([books, authors, publishers, orders, users]) => {
      setCounts({
        books:      books.status === 'fulfilled'      ? books.value.data.length      : '?',
        authors:    authors.status === 'fulfilled'    ? authors.value.data.length    : '?',
        publishers: publishers.status === 'fulfilled' ? publishers.value.data.length : '?',
        orders:     orders.status === 'fulfilled'     ? orders.value.data.length     : '?',
        users:      users.status === 'fulfilled'      ? users.value.data.length      : '?',
      });
    });
  }, []);

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-xl font-semibold text-gray-700 mb-1">
        Welcome back, {userInfo?.name || 'Admin'}
      </h1>
      <p className="text-sm text-gray-400 mb-8">Here&apos;s a quick overview of the store.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Books"      value={counts.books}      to="/books" />
        <StatCard label="Authors"    value={counts.authors}    to="/authors" />
        <StatCard label="Publishers" value={counts.publishers} to="/publishers" />
        <StatCard label="Orders"     value={counts.orders}     to="/dashboard/manage-orders" />
        <StatCard label="Users"      value={counts.users}      to="/dashboard/manage-users" />
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-4 text-sm">
        <Link to="/dashboard/manage-books"    className="border rounded p-4 hover:bg-gray-50">📚 Manage Books</Link>
        <Link to="/dashboard/manage-users"    className="border rounded p-4 hover:bg-gray-50">👥 Manage Users</Link>
        <Link to="/dashboard/manage-orders"   className="border rounded p-4 hover:bg-gray-50">📦 Manage Orders</Link>
        <Link to="/dashboard/add-authors"     className="border rounded p-4 hover:bg-gray-50">✍️ Add Author</Link>
        <Link to="/dashboard/add-publishers"  className="border rounded p-4 hover:bg-gray-50">🏢 Add Publisher</Link>
        <Link to="/dashboard/add-new-category" className="border rounded p-4 hover:bg-gray-50">🗂️ Add Category</Link>
      </div>
    </div>
  );
}

export default DashboardHome;
