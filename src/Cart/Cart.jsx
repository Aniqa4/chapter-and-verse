import { Box, Drawer, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CgShoppingBag } from 'react-icons/cg';
import { MdOutlineClose } from 'react-icons/md';

function Cart() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsDrawerOpen(true)} className=' text-xl flex gap-2 items-center'><CgShoppingBag /></button>
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

export default Cart