import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Title from '../Components/Title';
import Swal from 'sweetalert2';

function UpdateAuthor() {
    const data = useParams();
    const [author, setAuthor] = useState([]);
    const navigate = useNavigate();
    const from = `/authors`;

    useEffect(() => {
        fetch(`https://chapter-and-verse-server-side.vercel.app/authors/${data?.id}`)
            .then(res => res.json())
            .then(data => setAuthor(data))
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const authorInfo = {name, email, phone, description }

        fetch(`https://chapter-and-verse-server-side.vercel.app/update-author/${data?.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(authorInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Author info has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(from, { replace: true })
                }
            })
        form.reset()
    }

    //console.log(author);
    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Update'} />
            <form onSubmit={handleForm} className='grid px-10 md:shadow'>
                <label>Author's Name: </label>
                <input type="text" name='name' defaultValue={author?.name} />
                <label>Email: </label>
                <input type="text" name='email' defaultValue={author?.email} /> 
                <label >Phone: </label>
                <input type="number" name="phone" defaultValue={author?.phone} />
                <label>Description: </label>
                <input type="text" name="description" defaultValue={author?.description}/>
                <input type="submit" value="Update" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
            </form>
        </div>
    )
}

export default UpdateAuthor