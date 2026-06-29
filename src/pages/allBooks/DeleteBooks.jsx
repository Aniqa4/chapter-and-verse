import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  MdSearch, MdEdit, MdDelete, MdClose, MdAdd, MdMenuBook,
  MdFilterList, MdCloudUpload,
} from 'react-icons/md';
import { TbCurrencyTaka } from 'react-icons/tb';
import axiosInstance from '../../api/axiosInstance';

const EMPTY_FIELDS = {
  bookName: '', authorName: '', publisherName: '', price: '',
  category: '', dateOfArrival: '', availableCopies: '', numberOfPages: '', description: '',
};

function InputField({ label, name, value, onChange, type = 'text', required, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type} name={name} value={value ?? ''} onChange={onChange}
        required={required} disabled={disabled}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition disabled:bg-gray-50 disabled:text-gray-400"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        name={name} value={value ?? ''} onChange={onChange} required={required}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition bg-white"
      >
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ImageUploader({ existingUrl, onFileChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(existingUrl ?? null);
  const [dragging, setDragging] = useState(false);

  const applyFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    onFileChange(file);
  };

  const handleInput = e => applyFile(e.target.files[0]);
  const handleDrop = e => { e.preventDefault(); setDragging(false); applyFile(e.dataTransfer.files[0]); };

  const clear = e => {
    e.stopPropagation();
    setPreview(existingUrl ?? null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Book Cover {!existingUrl && <span className="text-red-400">*</span>}
        {existingUrl && <span className="text-gray-300 font-normal normal-case ml-1">(upload to replace)</span>}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden
          ${dragging ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'}`}
        style={{ height: preview ? 180 : 110 }}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" className="w-full h-full object-contain p-2" />
            <button
              type="button"
              onClick={clear}
              className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition"
            >
              <MdClose size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1.5 text-gray-400 select-none">
            <MdCloudUpload size={28} className="text-gray-300" />
            <p className="text-xs font-medium">Click or drag &amp; drop to upload</p>
            <p className="text-xs text-gray-300">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleInput} className="hidden" />
    </div>
  );
}

function BookFormModal({ book, categories, authors, publishers, onClose, onSuccess }) {
  const isEdit = Boolean(book?._id);
  const [fields, setFields] = useState(
    isEdit
      ? { bookName: book.bookName ?? '', authorName: book.authorName ?? '', publisherName: book.publisherName ?? '', price: book.price ?? '', category: book.category ?? '', dateOfArrival: book.dateOfArrival ?? '', availableCopies: book.availableCopies ?? '', numberOfPages: book.numberOfPages ?? '', description: book.description ?? '' }
      : { ...EMPTY_FIELDS }
  );
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!isEdit && !imageFile) { toast.error('Please select a book cover image.'); return; }

    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => { if (v !== '') fd.append(k, v); });
    if (!isEdit) fd.append('soldCopies', '0');
    if (imageFile) fd.append('bookImage', imageFile);

    setSaving(true);
    const req = isEdit
      ? axiosInstance.put(`/update-book/${book._id}`, fd)
      : axiosInstance.post('/add-books', fd);

    req
      .then(res => {
        if (res.data.success) {
          toast.success(isEdit ? 'Book updated!' : 'Book added!');
          onSuccess(res.data.data ?? null);
          onClose();
        }
      })
      .catch(() => toast.error(isEdit ? 'Update failed' : 'Add failed'))
      .finally(() => setSaving(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <MdMenuBook size={18} className="text-green-600" />
            <h2 className="text-base font-bold text-gray-800">{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><MdClose size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid sm:grid-cols-2 gap-4">
          {/* Cover image — full width */}
          <div className="sm:col-span-2">
            <ImageUploader existingUrl={isEdit ? book.bookImage : null} onFileChange={setImageFile} />
          </div>

          {/* Book name — full width */}
          <div className="sm:col-span-2">
            <InputField label="Book Name" name="bookName" value={fields.bookName} onChange={handleChange} required />
          </div>

          <SelectField label="Author" name="authorName" value={fields.authorName} onChange={handleChange} options={authors.map(a => a.name)} required />
          <SelectField label="Publisher" name="publisherName" value={fields.publisherName} onChange={handleChange} options={publishers.map(p => p.name)} required />
          <SelectField label="Category" name="category" value={fields.category} onChange={handleChange} options={categories.map(c => c.name)} required />
          <InputField label="Price (BDT)" name="price" value={fields.price} onChange={handleChange} type="number" required />
          <InputField label="Date of Arrival" name="dateOfArrival" value={fields.dateOfArrival} onChange={handleChange} type="datetime-local" required={!isEdit} disabled={isEdit} />
          <InputField label="Available Copies" name="availableCopies" value={fields.availableCopies} onChange={handleChange} type="number" required />
          <InputField label="Number of Pages" name="numberOfPages" value={fields.numberOfPages} onChange={handleChange} type="number" required />

          <div className="sm:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description <span className="text-red-400">*</span></label>
            <textarea
              name="description" value={fields.description ?? ''} onChange={handleChange} required rows={3}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition resize-none"
            />
          </div>

          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{isEdit ? 'Saving…' : 'Uploading…'}</>
                : isEdit ? 'Save Changes' : 'Add Book'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteBooks() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | book-object

  const fetchBooks = () => {
    axiosInstance.get('/books').then(res => setBooks(res.data)).catch(() => setBooks([]));
  };

  const handleModalSuccess = (newOrUpdatedBook) => {
    if (!newOrUpdatedBook) { fetchBooks(); return; }
    setBooks(prev => {
      const exists = prev.find(b => b._id === newOrUpdatedBook._id);
      return exists
        ? prev.map(b => b._id === newOrUpdatedBook._id ? newOrUpdatedBook : b)
        : [newOrUpdatedBook, ...prev];
    });
  };

  useEffect(() => {
    Promise.allSettled([
      axiosInstance.get('/books'),
      axiosInstance.get('/categories'),
      axiosInstance.get('/authors'),
      axiosInstance.get('/publishers'),
    ]).then(([b, c, a, p]) => {
      if (b.status === 'fulfilled') setBooks(b.value.data);
      if (c.status === 'fulfilled') setCategories(c.value.data);
      if (a.status === 'fulfilled') setAuthors(a.value.data);
      if (p.status === 'fulfilled') setPublishers(p.value.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    axiosInstance.delete(`/delete-book/${id}`)
      .then(res => {
        if (res.data.success) {
          toast.success('Book deleted');
          setBooks(prev => prev.filter(b => b._id !== id));
        }
      })
      .catch(() => toast.error('Delete failed'));
  };

  const filtered = books.filter(b => {
    const matchSearch = !search ||
      b.bookName?.toLowerCase().includes(search.toLowerCase()) ||
      b.authorName?.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || b.category === filterCat;
    return matchSearch && matchCat;
  });

  const uniqueCategories = [...new Set(books.map(b => b.category).filter(Boolean))];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">Manage Books</h1>
          <p className="text-sm text-gray-400 mt-0.5">{books.length} books in catalog</p>
        </div>
        <button
          onClick={() => setModal('add')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
        >
          <MdAdd size={18} />
          Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <MdSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or author…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200"
          />
        </div>
        <div className="relative">
          <MdFilterList size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-green-400 appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="">All categories</option>
            {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Books list */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-5 py-4 h-20 border-b border-gray-50 animate-pulse bg-gray-50/40" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
          <MdMenuBook size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            {search || filterCat ? 'No books match your filters.' : 'No books yet. Add your first one!'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 px-5 py-3 bg-gray-50/60 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Cover</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Details</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Price</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Stock</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</span>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map(book => (
              <div key={book._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                {/* Thumbnail */}
                <div className="w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100">
                  {book.bookImage
                    ? <img src={book.bookImage} alt={book.bookName} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><MdMenuBook size={16} className="text-gray-300" /></div>
                  }
                </div>
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{book.bookName}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {book.authorName && <span>{book.authorName}</span>}
                    {book.category && <span> · <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{book.category}</span></span>}
                  </p>
                </div>
                {/* Price */}
                <div className="hidden md:flex items-center gap-0.5 text-sm font-semibold text-gray-700 flex-shrink-0">
                  <TbCurrencyTaka size={14} className="text-gray-400" />
                  {book.price}
                </div>
                {/* Stock */}
                <div className="hidden md:block text-xs text-gray-400 flex-shrink-0 w-16 text-center">
                  {book.availableCopies != null ? (
                    <span className={`font-medium ${book.availableCopies < 5 ? 'text-red-500' : 'text-green-600'}`}>
                      {book.availableCopies} left
                    </span>
                  ) : '—'}
                </div>
                {/* Actions */}
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setModal(book)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id, book.bookName)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal !== null && (
        <BookFormModal
          book={modal === 'add' ? null : modal}
          categories={categories}
          authors={authors}
          publishers={publishers}
          onClose={() => setModal(null)}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}

export default DeleteBooks;
