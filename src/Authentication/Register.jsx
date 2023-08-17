import React from 'react';
import Title from '../Components/Title';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';


function Register() {
  return (
    <div className=' container mx-auto pt-1 text-gray-500 font-semibold  '>
      <Title title={'Create an Account'} />
      <form className='grid p-5 md:p-0 md:w-1/2 lg:w-1/4 mx-auto gap-2 mb-10'>
        <div className='grid'>
          <label>Name:</label>
          <input type="text" name="name" />
        </div>
        <div className='grid'>
          <label>Phone Number:</label>
          <input type="text" name="name" />
        </div>
        <div className='grid'>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        <div className='grid'>
          <label>Password:</label>
          <input type="password" name="confirm-password" />
        </div>
        <div className='grid'>
          <label>Confirm Password:</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" value="Register" className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black' />
      </form>
      <div className='md:mx-auto md:w-1/2 lg:w-1/4 text-center m-5'>
        
        <p className='pt-5'>Already Have an Account? <span className='underline'><Link to="/log-in">Log In</Link></span></p>
      </div>
      <p className=' text-red-700 text-center'>Error</p>
    </div>
  )
}

export default Register