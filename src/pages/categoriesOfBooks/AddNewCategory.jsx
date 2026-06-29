import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { MdSearch, MdEdit, MdDelete, MdClose, MdCategory, MdUpload } from 'react-icons/md';
import axiosInstance from '../../api/axiosInstance';

const EMPTY_FORM = { name: '', description: '' };

function Field({ label, name, value, onChange, required, textarea }) {
  const cls = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition bg-white';
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {textarea
        ? <textarea name={name} value={value} onChange={onChange} rows={3} className={`${cls} resize-none`} />
        : <input type="text" name={name} value={value} onChange={onChange} required={required} className={cls} />
      }
    </div>
  );
}

function ImageUploader({ existingUrl, onFileChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const applyFile = file => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileChange(file);
  };

  const clear = e => {
    e.stopPropagation();
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDrop = e => {
    e.preventDefault();
    applyFile(e.dataTransfer.files[0]);
  };

  const displayed = preview || existingUrl;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Image</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-green-400 transition-colors"
        style={{ aspectRatio: '1/1' }}
      >
        {displayed ? (
          <>
            <img src={displayed} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={clear}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/80"
            >×</button>
            {preview && (
              <span className="absolute bottom-2 left-2 text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-medium">New</span>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-gray-300">
            <MdUpload size={28} />
            <span className="text-xs">Click or drag to upload</span>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => applyFile(e.target.files[0])} />
      </div>
    </div>
  );
}

function EditModal({ category, onClose, onSave }) {
  const [form, setForm] = useState({ name: category.name || '', description: category.description || '' });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    if (imageFile) fd.append('image', imageFile);

    axiosInstance.put(`/update-category/${category._id}`, fd)
      .then(res => {
        if (res.data.success || res.data.acknowledged) {
          toast.success('Category updated!');
          onSave({ ...category, ...form, ...(imageFile ? { image: URL.createObjectURL(imageFile) } : {}) });
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
          <h2 className="text-base font-bold text-gray-800">Edit Category</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><MdClose size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ImageUploader existingUrl={category.image} onFileChange={setImageFile} />
          <Field label="Category Name" name="name" value={form.name} onChange={handleChange} required />
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

function AddNewCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    axiosInstance.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = e => {
    e.preventDefault();
    setAdding(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    if (imageFile) fd.append('image', imageFile);

    axiosInstance.post('/add-categories', fd)
      .then(res => {
        if (res.data.acknowledged || res.data.success) {
          toast.success('Category added!');
          axiosInstance.get('/categories').then(r => setCategories(r.data));
          setForm(EMPTY_FORM);
          setImageFile(null);
        }
      })
      .catch(() => toast.error('Failed to add category'))
      .finally(() => setAdding(false));
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    axiosInstance.delete(`/delete-category/${id}`)
      .then(res => {
        if (res.data.success || res.data.acknowledged) {
          toast.success('Category deleted');
          setCategories(prev => prev.filter(c => c._id !== id));
        }
      })
      .catch(() => toast.error('Delete failed'));
  };

  const handleSave = updated => {
    setCategories(prev => prev.map(c => c._id === updated._id ? updated : c));
  };

  const filtered = categories.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Categories</h1>
        <p className="text-sm text-gray-400 mt-0.5">Add and manage book categories</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Add form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <MdCategory size={17} className="text-blue-600" />
              </div>
              <h2 className="text-sm font-bold text-gray-700">Add New Category</h2>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <ImageUploader existingUrl={null} onFileChange={setImageFile} />
              <Field label="Category Name" name="name" value={form.name} onChange={handleChange} required />
              <Field label="Description" name="description" value={form.description} onChange={handleChange} required textarea />
              <button
                type="submit"
                disabled={adding}
                className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 mt-1"
              >
                {adding ? 'Adding…' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>

        {/* Categories list */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm font-bold text-gray-700 flex-1">
                All Categories <span className="text-gray-400 font-normal ml-1">({categories.length})</span>
              </p>
              <div className="relative">
                <MdSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-400 w-40 bg-white"
                />
              </div>
            </div>

            {loading ? (
              <div className="divide-y divide-gray-50">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="px-5 py-3.5 h-16 animate-pulse bg-gray-50/40" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-14 text-center">
                <MdCategory size={36} className="text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">{search ? 'No categories match your search.' : 'No categories yet.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50 max-h-[calc(100vh-14rem)] overflow-y-auto">
                {filtered.map(c => (
                  <div key={c._id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      {c.image
                        ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-400">{c.name?.charAt(0)?.toUpperCase()}</span>
                          </div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                      {c.description && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">{c.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => setEditing(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                        <MdEdit size={16} />
                      </button>
                      <button onClick={() => handleDelete(c._id, c.name)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
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
        <EditModal category={editing} onClose={() => setEditing(null)} onSave={handleSave} />
      )}
    </div>
  );
}

export default AddNewCategory;
