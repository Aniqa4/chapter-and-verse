import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MdSearch, MdAdminPanelSettings, MdOutlineAdminPanelSettings } from 'react-icons/md';
import axiosInstance from '../../api/axiosInstance';

function Avatar({ name }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';
  const colors = ['bg-blue-500', 'bg-violet-500', 'bg-green-600', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500'];
  const color = colors[name?.charCodeAt(0) % colors.length] || 'bg-gray-400';
  return (
    <div className={`w-8 h-8 rounded-full ${color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 select-none`}>
      {initials}
    </div>
  );
}

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/users')
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const makeAdmin = (id) => {
    if (!window.confirm('Grant admin role to this user?')) return;
    axiosInstance.patch(`/make-admin/${id}`)
      .then(res => {
        if (res.data.success) {
          setUsers(prev => prev.map(u => u._id === id ? { ...u, role: 'admin' } : u));
          toast.success('Admin role granted');
        }
      })
      .catch(() => toast.error('Update failed'));
  };

  const removeAdmin = (id) => {
    if (!window.confirm('Remove admin role from this user?')) return;
    axiosInstance.patch(`/remove-admin/${id}`)
      .then(res => {
        if (res.data.success) {
          setUsers(prev => prev.map(u => u._id === id ? { ...u, role: 'user' } : u));
          toast.success('Admin role removed');
        }
      })
      .catch(() => toast.error('Update failed'));
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-sm text-gray-400 mt-0.5">{users.length} registered users</p>
        </div>
        <div className="relative">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 w-64 bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 h-14 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
          <p className="text-gray-400 text-sm">{search ? 'No users match your search.' : 'No users found.'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">User</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Provider</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Role</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u, i) => (
                  <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{u.name}</p>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="capitalize text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {u.provider || 'email'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        u.role === 'admin'
                          ? 'bg-green-50 text-green-700 border border-green-100'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {u.role === 'admin' ? (
                        <button
                          onClick={() => removeAdmin(u._id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 border border-red-100 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors bg-red-50 hover:bg-red-100"
                        >
                          <MdOutlineAdminPanelSettings size={13} />
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => makeAdmin(u._id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-100 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors bg-blue-50 hover:bg-blue-100"
                        >
                          <MdAdminPanelSettings size={13} />
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
