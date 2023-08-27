import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiTwotoneMail } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import { IoIosPhonePortrait } from 'react-icons/io';
import { ImAddressBook } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';
import UserInfo from '../../Hooks/UserInfo';
import LogOut from '../../Hooks/LogOut';

function AdminDashboard() {
    const [role, userInfo] = UserInfo();
    const {handleSignOut}=LogOut()

    return (
        <div>
            <div className=' my-5 md:my-0 grid md:flex gap-10'>
                <div className='bg-gray-100 lg:h-screen'>
                    <div className=' p-5 md:p-10 grid gap-5 text-xs md:text-base'>
                        <h1 className='flex items-center gap-2'><BiUser /><span className=' font-semibold'>{userInfo?.name}</span></h1>
                        <p className='flex items-center gap-2'><span><AiTwotoneMail /></span>{userInfo?.email}</p>
                        <p className='flex items-center gap-2'><IoMdArrowDropright /><span>{role}</span></p>
                        <p className='flex items-center gap-2'><IoIosPhonePortrait /><span>{userInfo?.phoneNumber ? userInfo?.phoneNumber : 'Add Phone Number'}</span>
                            <span><AiOutlineEdit /></span>
                        </p>
                        <p className='flex items-center gap-2'><ImAddressBook /><span>{userInfo?.address ? userInfo?.address : 'Add address'} </span>
                            <span><AiOutlineEdit /></span>
                        </p>
                        <ul className=' grid gap-2 text-gray-600 py-10'>
                            <li><Link to='/dashboard'>Dashboard home</Link></li>
                            <li><Link to='manage-users'>Manage Users</Link></li>
                            <li><Link to='manage-books'>Manage Books</Link></li>
                            <li><Link to='add-publishers'>Add Publishers</Link></li>
                            <li><Link to='add-authors'>Add Authors</Link></li>
                            <li><Link to='add-new-category'>Add New Category</Link></li>
                        </ul>
                        <button onClick={handleSignOut} className=' w-36 border border-gray-600 py-3 px-6 font-semibold hover:bg-gray-200 hover:border-red-700' >Log Out</button>
                    </div>
                </div>
                <div className=' max-h-screen w-full overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default AdminDashboard