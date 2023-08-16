import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Title from '../Components/Title';
import Swal from 'sweetalert2';

function AddAuthors() {
    const data = useParams();
    const [author, setAuthor] = useState([]);
    const navigate = useNavigate();
    const from = `/authors`;

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const authorInfo = {name, email, phone, description }

        fetch(`https://chapter-and-verse-server-side.vercel.app/add-authors`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(authorInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Author has been added',
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
            <Title title={'Add Author'} />
            <form onSubmit={handleForm} className='grid px-10 md:shadow'>
                <label>Author's Name: </label>
                <input type="text" name='name' defaultValue={author?.name} />
                <label>Email: </label>
                <input type="text" name='email' defaultValue={author?.email} /> 
                <label >Phone: </label>
                <input type="number" name="phone" defaultValue={author?.phone} />
                <label>Description: </label>
                <input type="text" name="description" defaultValue={author?.description}/>
                <input type="submit" value="ADD" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
            </form>
        </div>
    )
}

export default AddAuthors