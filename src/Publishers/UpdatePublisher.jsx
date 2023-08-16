import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../Components/Title';

function UpdatePublisher() {
    const data = useParams();
    const [publisher, setPublisher] = useState([]);
    const navigate = useNavigate();
    const from = `/publishers`;

    useEffect(() => {
        fetch(`https://chapter-and-verse-server-side.vercel.app/publishers/${data?.id}`)
            .then(res => res.json())
            .then(data => setPublisher(data))
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const publisherInfo = { name, email, phone, description }

        fetch(`https://chapter-and-verse-server-side.vercel.app/update-publisher/${data?.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(publisherInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Publisher info has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(from, { replace: true })
                }
            })
        form.reset()
    }
    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Update'} />
            <form onSubmit={handleForm} className='grid px-10 md:shadow'>
                <label>Publisher's Name: </label>
                <input type="text" name='name' defaultValue={publisher?.name} />
                <label>Email: </label>
                <input type="text" name='email' defaultValue={publisher?.email} />
                <label >Phone: </label>
                <input type="number" name="phone" defaultValue={publisher?.phone} />
                <label>Description: </label>
                <input type="text" name="description" defaultValue={publisher?.description} />
                <input type="submit" value="Update" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
            </form>
        </div>
    )
}

export default UpdatePublisher