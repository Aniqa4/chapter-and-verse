import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  MdDashboard, MdPeople, MdMenuBook, MdShoppingBag,
  MdBusiness, MdPerson, MdCategory, MdLogout, MdMenu, MdClose, MdEdit,
} from 'react-icons/md';
import UserInfo from '../../Hooks/UserInfo';
import LogOut from '../../Hooks/LogOut';
import EditProfileForm from '../../Components/EditProfileForm';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: MdDashboard, end: true },
  { to: '/dashboard/manage-users', label: 'Manage Users', icon: MdPeople },
  { to: '/dashboard/manage-books', label: 'Manage Books', icon: MdMenuBook },
  { to: '/dashboard/manage-orders', label: 'Manage Orders', icon: MdShoppingBag },
  { to: '/dashboard/add-publishers', label: 'Add Publisher', icon: MdBusiness },
  { to: '/dashboard/add-authors', label: 'Add Author', icon: MdPerson },
  { to: '/dashboard/add-new-category', label: 'Add Category', icon: MdCategory },
];

function AdminDashboard() {
  const [role, userInfo] = UserInfo();
  const { handleSignOut } = LogOut();
  const [editingProfile, setEditingProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = userInfo?.name
    ? userInfo.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-4rem)] transition-transform duration-200 flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="text-base font-bold text-gray-800 tracking-tight">
            Chapter<span className="text-green-600">&amp;Verse</span>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>
            <MdClose size={20} />
          </button>
        </div>

        {/* Profile */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 select-none">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{userInfo?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{userInfo?.email}</p>
            </div>
            <button
              onClick={() => setEditingProfile(true)}
              className="text-gray-300 hover:text-green-600 transition-colors flex-shrink-0"
              title="Edit profile"
            >
              <MdEdit size={15} />
            </button>
          </div>
          <span className="mt-2.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 capitalize border border-green-100">
            {role}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          <p className="px-5 mb-1 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Navigation</p>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-all border-r-2 ${
                  isActive
                    ? 'text-green-700 bg-green-50 border-green-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent'
                }`
              }
            >
              <Icon size={17} className="flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-red-500 transition-colors w-full"
          >
            <MdLogout size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Mobile topbar */}
        <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-3.5 flex items-center gap-3 sticky top-16 z-10">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu size={22} />
          </button>
          <span className="text-sm font-semibold text-gray-700">Dashboard</span>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {editingProfile && (
        <EditProfileForm userInfo={userInfo} onClose={() => setEditingProfile(false)} />
      )}
    </div>
  );
}

export default AdminDashboard;
