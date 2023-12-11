import React, { useEffect, useState } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NavbarMenu() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://chapter-and-verse-server-side.vercel.app/names-of-categories')
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