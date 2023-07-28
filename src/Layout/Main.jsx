import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Main() {
  return (
    <>
      <Navbar></Navbar>
      <div className='mt-10'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Main