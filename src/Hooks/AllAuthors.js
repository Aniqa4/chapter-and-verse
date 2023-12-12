import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AllAuthors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('https://chapter-and-verse-server-side.vercel.app/authors')
            .then(data => setAuthors(data.data))
    }, []);
    
    return {authors,setAuthors}
}

export default AllAuthors