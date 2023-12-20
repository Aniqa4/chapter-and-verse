import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/Title';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { AuthContext } from './AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

function Login() {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const provider = new GoogleAuthProvider;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('https://chapter-and-verse-server-side.vercel.app/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, []);
  
  console.log(users);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;


    //---------login with email and password-------
    signIn(email, password)
      .then(result => {
        const loggedUser = result.user;
        //console.log(loggedUser);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged In',
          showConfirmButton: false,
          timer: 1500
        })
        form.reset();
        navigate(from, { replace: true })
      })
      .catch(error => {
        //console.log(error);
        setError(error.message)
      })
  }


  //----------login with google--------------
  const handleGoogleSignIn = () => {
    googleSignIn(provider)
      .then(result => {
        const loggedUser = result.user;
        //console.log(loggedUser);
        const email = loggedUser?.email;
        const existingUser = users.find(x => x?.email === email)
        if (!existingUser) {
          const name = loggedUser.displayName;
          const email = loggedUser.email;
          const phoneNumber = '';
          const address = '';
          const role = 'user'
          const newUser = { name, email, phoneNumber, address, role }
          fetch('https://chapter-and-verse-server-side.vercel.app/add-users', {
            method: 'POST',
            headers:
              { 'content-type': 'application/json' },
            body: JSON.stringify(newUser)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              if (data.acknowledged === true) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Successfully Logged In',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged in',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(from, { replace: true })
      })
      .catch(error => {
        //console.log(error);
        setError(error.message)
      })
  }


  return (
    <div className=' container mx-auto pt-1 text-gray-500 font-semibold  '>
      <Title title={'log in'} />
      <form onSubmit={handleLogin} className='grid p-5 md:p-0 md:w-1/2 lg:w-1/4 mx-auto gap-5 mb-10'>
        <div className='grid'>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        <div className='grid'>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" value="Log In" className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black' />
      </form>
      <Divider>OR</Divider>
      <div className='md:mx-auto md:w-1/2 lg:w-1/4 text-center mt-10 m-5'>
        <p onClick={handleGoogleSignIn} className='flex justify-center items-center gap-2 border rounded-full shadow border-red-700 py-2 hover:bg-gray-200 text-red-700'>
          <span className=' text-xl'><FcGoogle /></span>Join with Google</p>
        <p className='pt-5'>Don't Have an Account? <span className='underline'><Link to="/register">Register</Link></span></p>
      </div>
      <p className=' text-red-700 text-center'>{error}</p>
    </div>
  )
}

export default Login