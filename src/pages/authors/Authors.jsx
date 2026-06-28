
import Title from '../../Components/Title';
import Modal from '../../Components/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import UserInfo from '../../Hooks/UserInfo';
import AllAuthors from '../../Hooks/AllAuthors';
import axiosInstance from '../../api/axiosInstance';

function Authors() {
  const [authors, setAuthors] = AllAuthors()
  const [role] = UserInfo()

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this author?')) return;
    axiosInstance.delete(`/delete-author/${id}`).then(data => {
      if (data.data.success === true) {
        toast.success('Author deleted');
        setAuthors(authors.filter(x => x._id !== id));
      }
    }).catch(() => toast.error('Failed to delete author'));
  }

  //console.log('authors', authors);
  return (
    <div className=' lg:container lg:mx-auto py-5 mx-5'>
      <Title title={'Authors'} />
      <p className='py-2 text-gray-400'>Search books by Author</p>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-5'>
        {
          authors?.map(x =>
            <div key={x._id} className=' p-5 shadow my-2 flex justify-between items-center' >
              <Link to={`${x?.name}`}><h1 className=' font-semibold text text-red-700 hover:text-gray-700'>{x.name}</h1></Link>
              <div className={role === 'admin' ? 'grid grid-cols-2 gap-2' : ''}>
                {
                  role === 'admin' && <button onClick={() => handleDelete(x._id)} className=' border px-3 py-1 hover:bg-gray-100'>Delete</button>
                }
                <Modal name={x.name} email={x.email} phone={x.phone} description={x.description} route={`${x._id}/update-authors`} />
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Authors