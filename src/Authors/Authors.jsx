import React, { useEffect, useState } from 'react'
import Title from '../Components/Title';
import AddItems from '../Components/AddItems';
import Modal from '../Components/Modal';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserInfo from '../Hooks/UserInfo';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [role]=UserInfo()

  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/authors')
      .then(res => res.json())
      .then(data => setAuthors(data))
  }, []);

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
        fetch(`https://chapter-and-verse-server-side.vercel.app/delete-author/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Deleted',
                showConfirmButton: false,
                timer: 1500
              });

              const remainingAuthors = authors.filter(x => x._id !== id);
              setAuthors(remainingAuthors);
            }
          });
      }
    });
  }

  //console.log(authors);
  return (
    <div className=' lg:container lg:mx-auto py-5 mx-5'>
      <Title title={'Authors'} />
      <p className='py-2 text-gray-400'>Search books by Author</p>
      {
        role==='admin' && <AddItems text={'Add Authors'} route={'/authors/add-authors'} />
      }
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-5'>
        {
          authors?.map(x =>
            <div key={x._id} className=' p-5 shadow my-2 flex justify-between items-center' >
              <Link to={`${x?.name}`}><h1 className=' font-semibold text text-red-700 hover:text-gray-700'>{x.name}</h1></Link>
              <div className={role==='admin'?'grid grid-cols-2 gap-2':''}>
                {
                  role==='admin' && <button onClick={() => handleDelete(x._id)} className=' border px-3 py-1 hover:bg-gray-100'>Delete</button>
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