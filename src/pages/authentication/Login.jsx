import { useContext, useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import Swal from 'sweetalert2';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../authProvider/AuthProvider';

const ERROR_MESSAGES = {
  email_exists: 'This email is already registered with a password. Please log in with email.',
  google_auth_failed: 'Google sign-in failed. Please try again.',
};

function Login() {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get('error');
    if (err) setError(ERROR_MESSAGES[err] || 'Authentication failed. Please try again.');
  }, [location.search]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setError('');

    signIn(email, password)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged In',
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 403) {
          setError('Please verify your email before logging in. Check your inbox.');
        } else if (status === 401) {
          setError('Invalid email or password.');
        } else {
          setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
      });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    setError('');
    googleSignIn(credentialResponse.credential)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged In',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 409) {
          setError('This email is already registered with a password. Please log in with email.');
        } else {
          setError(err.response?.data?.message || 'Google sign-in failed. Please try again.');
        }
      });
  };

  return (
    <div className='container mx-auto pt-1 text-gray-500 font-semibold'>
      <Title title={'log in'} />
      <form onSubmit={handleLogin} className='grid p-5 md:p-0 md:w-1/2 lg:w-1/4 mx-auto gap-5 mb-10'>
        <div className='grid'>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div className='grid'>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <input
          type="submit"
          value="Log In"
          className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black'
        />
        <p className='text-center text-sm'>
          <span className='underline'><Link to='/forgot-password'>Forgot Password?</Link></span>
        </p>
      </form>
      <Divider>OR</Divider>
      <div className='md:mx-auto md:w-1/2 lg:w-1/4 text-center mt-10 m-5 flex flex-col items-center gap-4'>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google sign-in failed. Please try again.')}
          width="100%"
        />
        <p>Don&apos;t Have an Account? <span className='underline'><Link to="/register">Register</Link></span></p>
      </div>
      {error && <p className='text-red-700 text-center mt-4'>{error}</p>}
    </div>
  );
}

export default Login;
