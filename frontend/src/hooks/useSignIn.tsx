import { useState } from 'react';

interface SignUpData {
  email?: string;
  password?: string;
}

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (formData: SignUpData) => {
    setLoading(true);
    setError(null);

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
        return setError(data.message);
      }

      if (!response.ok) {
        throw new Error('Signin failed');
      }

      if (!formData.email || !formData.password) {
        return setError('Please fill out all fields');
      }
    } catch (error: any) {
      // Handle any errors that occurred during the request
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};

export default useSignIn;
