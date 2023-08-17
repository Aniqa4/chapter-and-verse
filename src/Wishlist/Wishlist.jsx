import { Box, Drawer, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { MdOutlineClose } from 'react-icons/md';

function Wishlist() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsDrawerOpen(true)} className=' text-xl flex gap-2 items-center'><MdOutlineFavoriteBorder /></button>
      <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box p={2} width={'250px'} role='presentation'>
          <Typography component={'div'}>
            <span onClick={() => setIsDrawerOpen(false)} className=' text-2xl'><MdOutlineClose /></span>
            hi
          </Typography>
        </Box>
      </Drawer>
    </div>
  )
}

export default Wishlist