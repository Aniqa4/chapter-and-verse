import axiosInstance from '../api/axiosInstance';
import { useEffect, useState } from 'react'

function AllAuthors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axiosInstance.get('/authors')
            .then(data => setAuthors(data.data))
    }, []);
    
    return [authors,setAuthors]
}

export default AllAuthors