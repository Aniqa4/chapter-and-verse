import axiosInstance from '../api/axiosInstance';
import { useEffect, useState } from 'react'

function BookCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosInstance.get('/categories')
            .then(data => setCategories(data.data))
    }, []);

    return categories
}

export default BookCategories