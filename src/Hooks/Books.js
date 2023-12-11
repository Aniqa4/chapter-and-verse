import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('https://chapter-and-verse-server-side.vercel.app/books')
          .then(data => setBooks(data.data))
      }, []);
      
  return books
    
}

export default Books