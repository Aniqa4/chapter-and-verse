import React from 'react'
import Title from '../Components/Title';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

function Login() {
  return (
    <div className=' container mx-auto pt-1 text-gray-500 font-semibold  '>
      <Title title={'log in'} />
      <form className='grid p-5 md:p-0 md:w-1/3 mx-auto gap-5 mb-10'>
        <div className='grid'>
          <label>Email:</label>
          <input type="email" name="password"/>
        </div>
        <div className='grid'>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" value="Log In"  className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black'/>
      </form>
      <Divider>OR</Divider>
      <div className='md:mx-auto md:w-1/3 text-center mt-10 m-5'>
       <p className='flex justify-center items-center gap-2 border rounded-full shadow border-red-700 py-2 hover:bg-gray-200 text-red-700'>
        <span className=' text-xl'><FcGoogle/></span>Join with Google</p>
       <p className='pt-5'>Don't Have an Account? <span className='underline'><Link to="/register">Register</Link></span></p>
      </div>
      <p className=' text-red-700 text-center'>Error</p>
    </div>
  )
}

export default Login