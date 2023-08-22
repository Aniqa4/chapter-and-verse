import React, { useContext } from 'react'
import { AuthContext } from '../Authentication/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../Hooks/UserInfo';
import Title from '../Components/Title';
import { BiUser } from 'react-icons/bi';
import { AiTwotoneMail } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import { IoIosPhonePortrait } from 'react-icons/io';
import { ImAddressBook } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';

function Dashboard() {
  const { logOut } = useContext(AuthContext);
  const [userInfo, role] = UserInfo();
  const navigate = useNavigate();
  const from = "/";

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged in',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(from, { replace: true })
      })
      .catch(error => {
        console.log(error);

      })
  }
  console.log(userInfo);
  return (
    <div className='pt-1 container mx-auto'>
      <Title title={'dashboard'} />
      <div className='my-10 flex'>
        <div className='bg-gray-100'>
          <div className=' p-10 grid gap-5'>
            <h1 className='flex items-center gap-2'><BiUser /><span className=' font-semibold'>{userInfo?.name}</span></h1>
            <p className='flex items-center gap-2'><span><AiTwotoneMail /></span>{userInfo?.email}</p>
            <p className='flex items-center gap-2'><IoMdArrowDropright /><span>{role}</span></p>
            <p className='flex items-center gap-2'><IoIosPhonePortrait /><span>{userInfo?.phoneNumber ? userInfo?.phoneNumber : 'Add Phone Number'}</span>
              <span><AiOutlineEdit /></span>
            </p>
            <p className='flex items-center gap-2'><ImAddressBook /><span>{userInfo?.address ? userInfo?.address : 'Add address'} </span>
              <span><AiOutlineEdit /></span>
            </p>
            <button onClick={handleSignOut} className=' w-36 border border-gray-600 py-3 px-6 font-semibold hover:bg-gray-200 hover:border-red-700' >Log Out</button>
          </div>
        </div>
        <div>
        
        </div>
      </div>
    </div >
  )
}

export default Dashboard