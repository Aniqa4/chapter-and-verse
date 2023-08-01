import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CiMenuKebab } from 'react-icons/ci';
import { MdOutlineClose } from 'react-icons/md';
import { Box, Drawer, Typography } from '@mui/material';


function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  return (
    <>
      <div className='hidden lg:block bg-white fixed top-0 left-0 right-0 z-50 shadow '>
        <div className='container mx-auto px-5 flex justify-between text-slate-700 py-5'>
          <div className='flex items-center gap-20'>
            <h1 className=' font-bold text-sm uppercase'><Link to='/'>Chapter<span className=' text-black'>&</span>Verse</Link></h1>
          </div>
          <ul className='flex gap-10'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/all-books'>Books</Link></li>
            <li><Link to='/category'>Category</Link></li>
            <li className=' relative text-xl'><Link to='/wishlist'><MdOutlineFavoriteBorder /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
            <li className=' relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span></li>
          </ul>
          <button className=' text-2xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button>
        </div>
      </div>
      <div className=' lg:hidden bg-white fixed top-0 left-0 right-0 z-50 shadow '>
        <div className='container mx-auto px-5 flex justify-between text-slate-700 py-5'>
          <button onClick={() => setIsDrawerOpen(true)} className=' text-xl flex gap-2 items-center'><CiMenuKebab />
            <span className=' text-base'>Menu</span></button>
          <h1 className=' font-bold text-sm uppercase'><Link to='/'>Chapter<span className=' text-black'>&</span>Verse</Link></h1>
          <ul className='flex gap-5'>
            <li className=' relative text-xl'><Link to='/wishlist'><MdOutlineFavoriteBorder /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span>
            </li>
            <li className=' relative text-xl'><Link to='/cart'><CgShoppingBag /></Link>
              <span className=' absolute -top-2 -right-2 text-xs'>10</span>
            </li>
            <li><button className=' text-xl'><Link to='/log-in'><AiOutlineUserAdd /></Link></button></li>
          </ul>
        </div>
      </div>
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box p={2} width={'150px'} role='presentation'>
          <Typography component={'div'}>
            <span onClick={()=>setIsDrawerOpen(false)} className=' text-2xl'><MdOutlineClose/></span>
            <ul className=' py-5'>
              <li onClick={()=>setIsDrawerOpen(false)}><Link to='/'>Home</Link></li>
              <li onClick={()=>setIsDrawerOpen(false)}><Link to='/all-books'>Books</Link></li>
              <li onClick={()=>setIsDrawerOpen(false)}><Link to='/category'>Category</Link></li>
            </ul>
          </Typography>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar