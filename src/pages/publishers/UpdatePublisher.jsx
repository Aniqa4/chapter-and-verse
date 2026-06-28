import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Title from '../../Components/Title';
import axiosInstance from '../../api/axiosInstance';

function UpdatePublisher() {
    const data = useParams();
    const [publisher, setPublisher] = useState([]);
    const navigate = useNavigate();
    const from = `/publishers`;

    useEffect(() => {
        axiosInstance.get(`/publishers/${data?.id}`)
            .then(data => setPublisher(data.data))
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
        const publisherInfo = { name, email, phone, description }

        axiosInstance.put(`/update-publisher/${data?.id}`, publisherInfo)
            .then(res => {
                const updatedData = res.data
                if (updatedData.success === true) {
                    toast.success('Publisher info has been updated!')
                    navigate(from, { replace: true })
                    form.reset()
                }
            })
    }
    return (
        <div className=' container mx-auto pt-1'>
            <Title title={'Update'} />
            <form onSubmit={handleForm} className='grid px-10 md:shadow'>
                <label>Publisher&apos;s Name: </label>
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