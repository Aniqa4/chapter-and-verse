import React, { useEffect, useState } from 'react'

function BookCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);

    return categories
}

export default BookCategories