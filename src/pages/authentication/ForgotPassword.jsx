import { useState } from 'react';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = e.target.email.value;

    try {
      const res = await axios.post(`${BASE_URL}/forgot-password`, { email });
      if (res.data.success) {
        setSubmitted(true);
      } else {
        setError(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.response?.status === 400) {
        setError(msg);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className='container mx-auto pt-1 text-gray-500 font-semibold'>
        <Title title={'forgot password'} />
        <div className='grid md:w-1/2 lg:w-1/4 mx-auto p-5 md:p-0 gap-5 text-center'>
          <p className='text-green-700 text-lg'>Check your inbox!</p>
          <p>If that email is registered, we&apos;ve sent a password reset link. It expires in 1 hour.</p>
          <Link to='/log-in' className='underline text-blue-600'>Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto pt-1 text-gray-500 font-semibold'>
      <Title title={'forgot password'} />
      <form onSubmit={handleSubmit} className='grid p-5 md:p-0 md:w-1/2 lg:w-1/4 mx-auto gap-5 mb-10'>
        <p className='text-sm text-gray-400 font-normal'>Enter your email address and we&apos;ll send you a link to reset your password.</p>
        <div className='grid'>
          <label>Email:</label>
          <input type='email' name='email' required />
        </div>
        <input
          type='submit'
          value={loading ? 'Sending...' : 'Send Reset Link'}
          disabled={loading}
          className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed'
        />
        {error && <p className='text-red-700 text-center'>{error}</p>}
        <p className='text-center'>
          Remember your password?{' '}
          <span className='underline'><Link to='/log-in'>Log In</Link></span>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
