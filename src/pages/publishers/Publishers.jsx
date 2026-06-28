
import Title from '../../Components/Title';
import Modal from '../../Components/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import UserInfo from '../../Hooks/UserInfo';
import Publications from '../../Hooks/Publications';
import axiosInstance from '../../api/axiosInstance';

function Publishers() {
  const [publications, setPublications] = Publications()
  const [role] = UserInfo()

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this publisher?')) return;
    axiosInstance.delete(`/delete-publisher/${id}`).then(data => {
      if (data.data.success === true) {
        toast.success('Publisher deleted');
        setPublications(publications.filter(x => x._id !== id));
      }
    }).catch(() => toast.error('Failed to delete publisher'));
  }


  //console.log(namesOfPublications);
  return (
    <div className=' lg:container lg:mx-auto py-5 mx-5'>
      <Title title={'Publishers'} />
      <p className='py-2 text-gray-400'>Search books by Publishers</p>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-2'>
        {
          publications?.map(x =>
            <div key={x?._id} className=' p-5 shadow my-2 flex justify-between items-center hover:bg-gray-100' >
              <Link to={`${x?.name}`}><h1 className=' font-semibold text-sm text-red-700 hover:text-red-400'>{x.name}</h1></Link>
              <div className={role === 'admin' ? 'grid grid-cols-2 gap-2' : ''}>
                {
                  role === 'admin' && <button onClick={() => handleDelete(x._id)} className=' border px-3 py-1 hover:bg-white'>Delete</button>
                }
                <Modal name={x.name} email={x.email} phone={x.phone} description={x.description} route={`${x._id}/update-publisher`} />
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Publishers