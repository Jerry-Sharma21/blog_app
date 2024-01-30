import React, { ChangeEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

import useSignUp from '../hooks/useSignUp';
interface IFormData {
  username?: string;
  email?: string;
  password?: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({});
  const { signUp, error, loading } = useSignUp();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(formData);
    // Check if there's an error before navigating
    if (!error) {
      navigate('/sign-in');
    }
  };

  return (
    <>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value='Your username' />
          <TextInput
            type='text'
            placeholder='Username'
            id='userName'
            onChange={handleChange}
          />
        </div>
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
            placeholder='Password'
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
            'Sign Up'
          )}
        </Button>
      </form>

      <div className='flex gap-2 text-sm mt-5'>
        <span>
          Have an account?
          <Link to='/sign-in'> Sign In</Link>
        </span>
      </div>

      {error && (
        <Alert className='mt-5' color='failure'>
          {error}
        </Alert>
      )}
    </>
  );
};

export default SignUpForm;
