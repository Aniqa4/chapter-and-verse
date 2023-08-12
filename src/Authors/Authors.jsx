import React, { useEffect, useState } from 'react'

function Authors() {
  const [namesOfAuthors, setNamesOfAuthors] = useState([]);

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/authors')
      .then(res => res.json())
      .then(data => setNamesOfAuthors(data))
  }, []);

  return (
    <div>Authors</div>
  )
}

export default Authors