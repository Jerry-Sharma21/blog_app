import { useDispatch } from 'react-redux';

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';
interface SignInData {
  email?: string;
  password?: string;
}

const useSignIn = () => {
  const dispatch = useDispatch();

  const signIn = async (formData: SignInData) => {
    dispatch(signInStart());

    try {
      const response = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (!response.ok) {
        throw new Error('Signin failed');
      }

      if (!formData.email || !formData.password) {
        dispatch(signInFailure('Please fill out all fields'));
      }

      if (response.ok) {
        dispatch(signInSuccess(data));
      }
    } catch (error: any) {
      // Handle any errors that occurred during the request
      dispatch(signInFailure(error.message || 'An error occurred'));
    }
  };

  return { signIn };
};

export default useSignIn;
