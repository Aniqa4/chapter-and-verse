import React from 'react'
import Title from '../Components/Title';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddAuthors() {

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const authorInfo = { name, email, phone, description }

        axios.post(`https://chapter-and-verse-server-side.vercel.app/add-authors`, authorInfo)
            .then(data => {
                const addedData = data.data
                console.log(addedData);
                if (addedData.acknowledged === true) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Author has been added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset()
                }
            })
    }

    //console.log(author);
    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Add Author'} />
            <form onSubmit={handleForm} className='grid px-10 md:shadow'>
                <label>Author's Name: </label>
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

export default AddAuthors