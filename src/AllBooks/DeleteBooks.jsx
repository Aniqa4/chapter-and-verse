import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';
import { Link } from 'react-router-dom';

function DeleteBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://chapter-and-verse-server-side.vercel.app/books-with-less-info')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed, proceed with the deletion
                fetch(`https://chapter-and-verse-server-side.vercel.app/delete-book/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Deleted',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            const remainingBooks = books.filter(x => x._id !== id);
                            setBooks(remainingBooks);
                        }
                    });
            }
        });
    }

    return (
        <div className=' lg:container lg:mx-auto py-5 mx-5'>
            <Title title={'Manage Books'} />
            <p className='py-2 text-gray-400'>Delete Books</p>
            <AddItems text={'Add Books'} route={'add-books'} />
            <div className='grid xl:grid-cols-2 md:grid-cols-2 gap-5'>
                {
                    books?.map(x =>
                        <div key={x._id} className=' p-5 shadow my-2 flex justify-between items-center' >
                            <h1 className=' font-semibold text text-red-700 hover:text-gray-700'>{x.bookName}</h1>
                            <button onClick={() => handleDelete(x._id)} className=' border px-3 py-1 hover:bg-gray-100'>Delete</button>
                        </div>)
                }
            </div>
            <p className=' text-center underline text-blue-600 pt-10'><Link to={'/books'}>Retun</Link></p>
        </div>
    )
}

export default DeleteBooks