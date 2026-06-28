import { useContext, useEffect, useState } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { MdOutlineClose, MdOutlineDashboardCustomize, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from '../authProvider/AuthProvider';
import LogOut from '../Hooks/LogOut';

function NavbarMenu() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { handleSignOut } = LogOut();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosInstance.get('/names-of-categories')
            .then(data => setCategories(data.data))
    }, []);

    return (
        <div>
            <button onClick={() => setIsDrawerOpen(true)} className=' text-xl flex gap-2 items-center'><CiMenuKebab />
                <span className=' text-base'>Menu</span>
            </button>
            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width={'250px'} role='presentation'>
                    <Typography component={'div'}>
                        <span onClick={() => setIsDrawerOpen(false)} className=' text-2xl'><MdOutlineClose /></span>
                        <ul className=' py-5'>
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/'>Home</Link></li>
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/books'>Books</Link></li>
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/categories'>Categories</Link></li>
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/authors'>Authors</Link></li>
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/publishers'>Publishers</Link></li>
                            {user && (
                                <>
                                    <li onClick={() => setIsDrawerOpen(false)} className='border-b py-2'>
                                        <Link to='/dashboard' className='flex items-center gap-2'>
                                            <MdOutlineDashboardCustomize /> Dashboard
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <button
                                            onClick={() => { setIsDrawerOpen(false); handleSignOut(); }}
                                            className='flex items-center gap-2 text-red-600 w-full'
                                        >
                                            <MdLogout /> Log Out
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div>
                            <h1 className=' text-2xl my-5 border-b'>Categories</h1>
                            <ul>
                                {
                                    categories?.map((x, index) =>
                                        <li key={index} onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to={`categories/${x.name}`}>{x.name}</Link></li>)
                                }
                            </ul>
                        </div>
                    </Typography>
                </Box>
            </Drawer>
        </div>
    )
}

export default NavbarMenu