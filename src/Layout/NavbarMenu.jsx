import React, { useState } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

function NavbarMenu() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/all-books'>Books</Link></li>
                            <li onClick={() => setIsDrawerOpen(false)} className=' border-b py-2'><Link to='/category'>Category</Link></li>
                        </ul>
                    </Typography>
                </Box>
            </Drawer>
        </div>
    )
}

export default NavbarMenu