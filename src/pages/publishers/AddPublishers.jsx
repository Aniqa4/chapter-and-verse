import React from 'react'
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import axios from 'axios';

function AddPublishers() {
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const publisherInfo = { name, email, phone, description }

        axios.post(`https://chapter-and-verse-server-side.vercel.app/add-publishers`, publisherInfo)
            .then(data => {
                const postedData = data.data
                if (postedData.acknowledged === true) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'New Publisher has been added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset()
                }
            })
    }
    return (
        <div className='container mx-auto '>
            <Title title={'Add publisher'} />
            <form onSubmit={handleForm} className='grid px-5  md:shadow'>
                <label>publisher's Name: </label>
                <input type="text" name='name' />
                <label>Email: </label>
                <input type="text" name='email' />
                <label >Phone: </label>
                <input type="text" name="phone" />
                <label>Description: </label>
                <input type="text" name="description" />
                <input type="submit" value="ADD" className='mb-10 mt-5 p-2 bg-slate-500 text-white' />
            </form>
        </div>
    )
}

export default AddPublishers