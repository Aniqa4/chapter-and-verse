import axios from 'axios';
import { useEffect, useState } from 'react'

function BookCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://chapter-and-verse-server-side.vercel.app/categories')
            .then(data => setCategories(data.data))
    }, []);

    return categories
}

export default BookCategories