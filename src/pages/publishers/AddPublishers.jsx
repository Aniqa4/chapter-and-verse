import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MdSearch, MdEdit, MdDelete, MdClose, MdBusiness } from 'react-icons/md';
import axiosInstance from '../../api/axiosInstance';

const EMPTY_FORM = { name: '', email: '', phone: '', description: '' };

function Field({ label, name, value, onChange, type = 'text', required, textarea }) {
  const cls = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition bg-white';
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea
        ? <textarea name={name} value={value} onChange={onChange} rows={3} className={`${cls} resize-none`} />
        : <input type={type} name={name} value={value} onChange={onChange} required={required} className={cls} />
      }
    </div>
  );
}

function EditModal({ publisher, onClose, onSave }) {
  const [form, setForm] = useState({ name: publisher.name || '', email: publisher.email || '', phone: publisher.phone || '', description: publisher.description || '' });
  const [saving, setSaving] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    axiosInstance.put(`/update-publisher/${publisher._id}`, form)
      .then(res => {
        if (res.data.success) {
          toast.success('Publisher updated!');
          onSave({ ...publisher, ...form });
          onClose();
        }
      })
      .catch(() => toast.error('Update failed'))
      .finally(() => setSaving(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-800">Edit Publisher</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><MdClose size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddPublishers() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    axiosInstance.get('/publishers')
      .then(res => setPublishers(res.data))
      .catch(() => setPublishers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = e => {
    e.preventDefault();
    setAdding(true);
    axiosInstance.post('/add-publishers', form)
      .then(res => {
        if (res.data.success) {
          toast.success('Publisher added!');
          setPublishers(prev => [...prev, { ...form, _id: res.data.id || Date.now().toString() }]);
          setForm(EMPTY_FORM);
        }
      })
      .catch(() => toast.error('Failed to add publisher'))
      .finally(() => setAdding(false));
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    axiosInstance.delete(`/delete-publisher/${id}`)
      .then(res => {
        if (res.data.success) {
          toast.success('Publisher deleted');
          setPublishers(prev => prev.filter(p => p._id !== id));
        }
      })
      .catch(() => toast.error('Delete failed'));
  };

  const handleSave = updated => {
    setPublishers(prev => prev.map(p => p._id === updated._id ? updated : p));
  };

  const filtered = publishers.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Publishers</h1>
        <p className="text-sm text-gray-400 mt-0.5">Add and manage book publishers</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Add form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <MdBusiness size={17} className="text-orange-500" />
              </div>
              <h2 className="text-sm font-bold text-gray-700">Add New Publisher</h2>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <Field label="Publisher Name" name="name" value={form.name} onChange={handleChange} required />
              <Field label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
              <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea />
              <button
                type="submit"
                disabled={adding}
                className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 mt-1"
              >
                {adding ? 'Adding…' : 'Add Publisher'}
              </button>
            </form>
          </div>
        </div>

        {/* Publishers list */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm font-bold text-gray-700 flex-1">
                All Publishers <span className="text-gray-400 font-normal ml-1">({publishers.length})</span>
              </p>
              <div className="relative">
                <MdSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-400 w-44 bg-white"
                />
              </div>
            </div>

            {loading ? (
              <div className="divide-y divide-gray-50">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="px-5 py-3.5 h-14 animate-pulse bg-gray-50/50" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-14 text-center">
                <MdBusiness size={36} className="text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">{search ? 'No publishers match your search.' : 'No publishers yet.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50 max-h-[calc(100vh-14rem)] overflow-y-auto">
                {filtered.map(p => (
                  <div key={p._id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">
                      {p.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                      {p.email && <p className="text-xs text-gray-400 truncate">{p.email}</p>}
                      {p.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{p.description}</p>}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setEditing(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <EditModal publisher={editing} onClose={() => setEditing(null)} onSave={handleSave} />
      )}
    </div>
  );
}

export default AddPublishers;
