import React, { useEffect, useState } from 'react'

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/books-with-less-info')
          .then(res => res.json())
          .then(data => setBooks(data))
      }, []);
      
  return books
    
}

export default Books