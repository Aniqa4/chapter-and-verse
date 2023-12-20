import React, { useContext, useState } from 'react';
import Title from '../../components/Title';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, auth } from '../../authProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

function Register() {
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value;
    //console.log(email, password,name, photoUrl);

    signUp(email, password)
      .then(result => {
        const loggedUser = result.user;
        //console.log(loggedUser);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
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
                title: 'Successfully Registered',
                showConfirmButton: false,
                timer: 1500
              })
              form.reset();
              navigate(from, { replace: true })
            }
          })
      })
      .catch(error => {
        //console.log(error);
        setError(error.message)
      })

  }
  return (
    <div className=' container mx-auto pt-1 text-gray-500 font-semibold  '>
      <Title title={'Create an Account'} />
      <form onSubmit={handleSignIn} className='grid p-5 md:p-0 md:w-1/2 lg:w-1/4 mx-auto gap-2 mb-10'>
        <div className='grid'>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div className='grid'>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div className='grid'>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <div className='grid'>
          <label>PhotoURL:</label>
          <input type="text" name="photo" />
        </div>
        <input type="submit" value="Register" className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black' />
      </form>
      <div className='md:mx-auto md:w-1/2 lg:w-1/4 text-center m-5'>

        <p className='pt-5'>Already Have an Account? <span className='underline'><Link to="/log-in">Log In</Link></span></p>
      </div>
      <p className=' text-red-700 text-center'>{error}</p>
    </div>
  )
}

export default Register