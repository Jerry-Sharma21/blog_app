import React from 'react';

import { Link } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div
        className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row
        md:items-center gap-5'
      >
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span
              className='px-2 py-1 bg-gradient-to-r from-indigo-500
              via-purple-500 to-pink-500 rounded-lg text-white'
            >
              Wander
            </span>
            Word
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        <div className='flex-1'>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
