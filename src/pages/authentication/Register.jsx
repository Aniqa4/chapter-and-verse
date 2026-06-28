import { useContext, useState } from 'react';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';

function Register() {
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    signUp(name, email, password)
      .then(() => {
        setSuccess(true);
        form.reset();
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 409) {
          setError('This email is already registered.');
        } else {
          setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
      });
  };

  if (success) {
    return (
      <div className='container mx-auto pt-1 text-center text-gray-500'>
        <Title title={'Check your email'} />
        <div className='md:w-1/2 lg:w-1/3 mx-auto p-8 border rounded shadow-sm'>
          <p className='text-lg font-semibold text-green-700 mb-3'>Verification email sent!</p>
          <p className='text-sm'>
            We sent a link to your inbox. Click it to verify your account, then{' '}
            <Link to='/log-in' className='underline text-blue-500'>log in</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=' container mx-auto pt-1 text-gray-500 font-semibold'>
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
          <label>Confirm Password:</label>
          <input type="password" name="confirm" required />
        </div>
        <input
          type="submit"
          value="Register"
          className='border py-2 shadow-sm bg-green-700 text-white hover:bg-white hover:text-black hover:border-black mt-2'
        />
      </form>
      <div className='md:mx-auto md:w-1/2 lg:w-1/4 text-center m-5'>
        <p className='pt-5'>Already Have an Account? <span className='underline'><Link to="/log-in">Log In</Link></span></p>
      </div>
      {error && <p className='text-red-700 text-center'>{error}</p>}
    </div>
  );
}

export default Register;
