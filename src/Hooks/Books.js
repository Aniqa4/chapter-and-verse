import axiosInstance from '../api/axiosInstance';
import { useEffect, useState } from 'react';

function Books() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    axiosInstance.get('/books')
      .then(res => setBooks(res.data))
      .catch(() => setBooks([]));
  }, []);

  return books;
}

export default Books;
