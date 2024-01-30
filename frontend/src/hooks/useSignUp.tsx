import { useState } from 'react';

interface SignUpData {
  username?: string;
  email?: string;
  password?: string;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (formData: SignUpData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/auth/signup`, {
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
        throw new Error('Signup failed');
      }

      if (!formData.username || !formData.email || !formData.password) {
        return setError('Please fill out all fields');
      }
    } catch (error: any) {
      // Handle any errors that occurred during the request
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};

export default useSignUp;
