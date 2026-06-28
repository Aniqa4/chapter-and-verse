import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Title from '../../Components/Title';

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/verify-email/${token}`)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'This link is invalid or has expired.');
      });
  }, [token]);

  return (
    <div className='container mx-auto pt-1 text-center text-gray-500'>
      <Title title={'Email Verification'} />
      <div className='md:w-1/2 lg:w-1/3 mx-auto p-8 border rounded shadow-sm'>
        {status === 'loading' && (
          <p className='text-gray-500'>Verifying your email...</p>
        )}
        {status === 'success' && (
          <>
            <p className='text-lg font-semibold text-green-700 mb-3'>Email verified successfully!</p>
            <p className='text-sm'>
              Your account is active. <Link to='/log-in' className='underline text-blue-500'>Log in</Link> to continue.
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <p className='text-lg font-semibold text-red-600 mb-3'>Verification failed</p>
            <p className='text-sm'>{message}</p>
            <p className='text-sm mt-3'>
              <Link to='/register' className='underline text-blue-500'>Register again</Link> to get a new link.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
