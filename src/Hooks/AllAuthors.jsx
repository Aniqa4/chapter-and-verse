import React, { useEffect, useState } from 'react'

function AllAuthors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/authors')
            .then(res => res.json())
            .then(data => setAuthors(data))
    }, []);
    return authors
}

export default AllAuthors