import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

const SignUpForm: React.FC = () => {
  return (
    <>
      <form className='flex flex-col gap-4'>
        <div>
          <Label value='Your username' />
          <TextInput type='text' placeholder='Username' id='username' />
        </div>
        <div>
          <Label value='Your email' />
          <TextInput type='text' placeholder='name@company.com' id='email' />
        </div>
        <div>
          <Label value='Your password' />
          <TextInput type='text' placeholder='Password' id='password' />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit'>
          Sign Up
        </Button>
      </form>

      <div className='flex gap-2 text-sm mt-5'>
        <span>
          Have an account?
          <Link to='/sign-in'> Sign In</Link>
        </span>
      </div>
    </>
  );
};

export default SignUpForm;
