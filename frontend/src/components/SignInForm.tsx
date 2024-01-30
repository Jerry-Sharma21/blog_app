import React, { ChangeEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

import useSignIn from '../hooks/useSignIn';
import { UserState } from '../redux/user/userSlice';

interface IFormData {
  email?: string;
  password?: string;
}

interface RootState {
  user: UserState;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({});
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData);
    // Check if there's an error before navigating
    if (!error) {
      navigate('/');
    }
  };

  return (
    <>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value='Your email' />
          <TextInput
            type='email'
            placeholder='name@company.com'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <Label value='Your password' />
          <TextInput
            type='password'
            placeholder='**********'
            id='password'
            onChange={handleChange}
          />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
          {loading ? (
            <>
              <Spinner size='sm' /> <span className='pl-3'>Loading....</span>
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className='flex gap-2 text-sm mt-5'>
        <span>
          Don't have an account?
          <Link to='/sign-up'> Sign Up</Link>
        </span>
      </div>

      {error && (
        <Alert className='mt-5' color='failure'>
          {error instanceof Error ? error.message : error}
        </Alert>
      )}
    </>
  );
};

export default SignInForm;
