import React from 'react'
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserInfo from '../../Hooks/UserInfo';
import Publications from '../../Hooks/Publications';
import axios from 'axios';

function Publishers() {
  const [publications, setPublications] = Publications()
  const [role] = UserInfo()

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
        axios.delete(`https://chapter-and-verse-server-side.vercel.app/delete-publisher/${id}`)
          .then(data => {
            const deletedData = data.data
            if (deletedData.deletedCount > 0) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Deleted',
                showConfirmButton: false,
                timer: 1500
              });

              const remainingPublishers = publications.filter(x => x._id !== id);
              setPublications(remainingPublishers);
            }
          });
      }
    });
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