import React from 'react'
import { BiUser } from 'react-icons/bi';
import { AiTwotoneMail } from 'react-icons/ai';
import { IoIosPhonePortrait } from 'react-icons/io';
import { ImAddressBook } from 'react-icons/im';
import { AiOutlineEdit } from 'react-icons/ai';
import UserInfo from '../Hooks/UserInfo';
import Title from '../components/Title';
import LogOut from '../Hooks/LogOut';

function UserDashboard() {
    const {handleSignOut}=LogOut()
    const [x, userInfo] = UserInfo();

    return (
        <div className=' my-5 md:my-0 grid md:flex gap-10'>
            <div className='bg-gray-100 lg:h-screen'>
                <div className=' p-5 md:p-10 grid gap-5 text-xs md:text-base'>
                    <h1 className='flex items-center gap-2'><BiUser /><span className=' font-semibold'>{userInfo?.name}</span></h1>
                    <p className='flex items-center gap-2'><span><AiTwotoneMail /></span>{userInfo?.email}</p>
                    <p className='flex items-center gap-2'><IoIosPhonePortrait /><span>{userInfo?.phoneNumber ? userInfo?.phoneNumber : 'Add Phone Number'}</span>
                        <span><AiOutlineEdit /></span>
                    </p>
                    <p className='flex items-center gap-2'><ImAddressBook /><span>{userInfo?.address ? userInfo?.address : 'Add address'} </span>
                        <span><AiOutlineEdit /></span>
                    </p>
                    <button onClick={handleSignOut} className=' w-36 border border-gray-600 py-3 px-6 font-semibold hover:bg-gray-200 hover:border-red-700' >Log Out</button>
                </div>
            </div>
            <div className='w-full mx-5'>
                <Title title={'My Orders'}/>
                <div>
                    <h1 className='text-xl'>Active Orders</h1>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard