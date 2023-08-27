import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiTwotoneMail } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import { IoIosPhonePortrait } from 'react-icons/io';
import { ImAddressBook } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Authentication/AuthProvider/AuthProvider';
import UserInfo from '../../Hooks/UserInfo';

function AdminDashboard() {
    const { logOut } = useContext(AuthContext);
    const [role, userInfo] = UserInfo();
    const navigate = useNavigate();
    const from = "/";

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate(from, { replace: true })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Logged Out',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error);

            })
    }
    return (
        <div>
            <div className=' my-5 md:my-10 grid md:flex gap-10'>
                <div className='bg-gray-100  max-h-screen'>
                    <div className=' p-5 md:p-10 grid gap-5 text-xs md:text-base'>
                        <h1 className='flex items-center gap-2'><BiUser /><span className=' font-semibold'>{userInfo?.name}</span></h1>
                        <p className='flex items-center gap-2'><span><AiTwotoneMail /></span>{userInfo?.email}</p>
                        <p className={role === 'admin' ? 'flex items-center gap-2' : 'hidden'}><IoMdArrowDropright /><span>{role}</span></p>
                        <p className='flex items-center gap-2'><IoIosPhonePortrait /><span>{userInfo?.phoneNumber ? userInfo?.phoneNumber : 'Add Phone Number'}</span>
                            <span><AiOutlineEdit /></span>
                        </p>
                        <p className='flex items-center gap-2'><ImAddressBook /><span>{userInfo?.address ? userInfo?.address : 'Add address'} </span>
                            <span><AiOutlineEdit /></span>
                        </p>
                        <button onClick={handleSignOut} className=' w-36 border border-gray-600 py-3 px-6 font-semibold hover:bg-gray-200 hover:border-red-700' >Log Out</button>
                        <ul>
                            <li><Link to='manage-users'>Manage Users</Link></li>
                            <li><Link to='manage-books'>Manage Books</Link></li>
                            <li><Link to='manage-users'>Manage Users</Link></li>
                            <li><Link to='manage-users'>Manage Users</Link></li>
                        </ul>
                    </div>
                </div>
                <div className=' max-h-screen overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default AdminDashboard