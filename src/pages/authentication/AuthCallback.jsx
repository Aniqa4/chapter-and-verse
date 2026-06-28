import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';

function AuthCallback() {
  const { loginWithToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('No token received. Please try signing in again.');
      return;
    }

    loginWithToken(token)
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        setError('Failed to complete sign-in. Please try again.');
        navigate('/log-in', { replace: true });
      });
  }, []);

  if (error) {
    return (
      <div className="container mx-auto pt-10 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-10 text-center text-gray-500">
      <p>Completing sign-in...</p>
    </div>
  );
}

export default AuthCallback;
