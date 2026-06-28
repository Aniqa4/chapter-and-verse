import { useState } from 'react';
import Title from '../../Components/Title';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, { password });
      if (res.data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Password Reset!',
          text: 'You can now log in with your new password.',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/log-in');
      } else {
        setError(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired reset link. Please request a new one.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto pt-1 text-gray-500 font-semibold'>
      <Title title={'reset password'} />
      <form onSubmit={handleSubmit} className='grid p-5 md:p-0 md:w-1/2 lg:w-1/4 mx-auto gap-5 mb-10'>
        <div className='grid'>
          <label>New Password:</label>
          <input type='password' name='password' required minLength={6} />
        </div>
        <div className='grid'>
          <label>Confirm Password:</label>
          <input type='password' name='confirm' required minLength={6} />
        </div>
        <input
          type='submit'
          value={loading ? 'Resetting...' : 'Reset Password'}
          disabled={loading}
          className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed'
        />
        {error && <p className='text-red-700 text-center'>{error}</p>}
        <p className='text-center'>
          <span className='underline'><Link to='/log-in'>Back to Login</Link></span>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
