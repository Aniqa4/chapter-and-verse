
import { toast } from 'sonner';
import Title from '../../Components/Title';
import axiosInstance from '../../api/axiosInstance';

function AddPublishers() {
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const publisherInfo = { name, email, phone, description }

        axiosInstance.post(`/add-publishers`, publisherInfo)
            .then(data => {
                const postedData = data.data
                if (postedData.success === true) {
                    toast.success('Publisher has been added!')
                    form.reset()
                }
            })
    }
    return (
        <div className='container mx-auto '>
            <Title title={'Add publisher'} />
            <form onSubmit={handleForm} className='grid px-5  md:shadow'>
                <label>publisher&apos;s Name: </label>
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