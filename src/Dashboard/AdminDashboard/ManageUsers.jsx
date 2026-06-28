import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../../api/axiosInstance';
import Title from '../../Components/Title';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/users').then(res => setUsers(res.data)).catch(() => setUsers([]));
  }, []);

  const makeAdmin = (id) => {
    if (!window.confirm('Make this user an admin?')) return;
    axiosInstance.patch(`/make-admin/${id}`).then(res => {
      if (res.data.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, role: 'admin' } : u));
        toast.success('Admin role granted');
      }
    }).catch(() => toast.error('Update failed'));
  };

  const removeAdmin = (id) => {
    if (!window.confirm('Remove admin role from this user?')) return;
    axiosInstance.patch(`/remove-admin/${id}`).then(res => {
      if (res.data.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, role: 'user' } : u));
        toast.success('Admin role removed');
      }
    }).catch(() => toast.error('Update failed'));
  };

  return (
    <div className="lg:container lg:mx-auto py-5 mx-5">
      <Title title="Manage Users" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-600 border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Provider</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{i + 1}</td>
                <td className="py-2 px-3 font-semibold">{u.name}</td>
                <td className="py-2 px-3">{u.email}</td>
                <td className="py-2 px-3 capitalize">{u.provider}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-2 px-3">
                  {u.role === 'admin' ? (
                    <button
                      onClick={() => removeAdmin(u._id)}
                      className="border border-red-400 text-red-600 px-3 py-1 text-xs hover:bg-red-50"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdmin(u._id)}
                      className="border border-blue-400 text-blue-600 px-3 py-1 text-xs hover:bg-blue-50"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center py-10 text-gray-400">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
