import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { signup, loginWithGoogle, loginWithApple } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password, username);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please try a different one.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError("Google signup failed. Please try again.");
    }
  };

  const handleAppleSignup = async () => {
    try {
      await loginWithApple();
      navigate('/dashboard');
    } catch (error) {
      setError("Apple signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>

      <div className="my-4 flex items-center justify-center">
        <span className="text-gray-500">or</span>
      </div>

      <button onClick={handleGoogleSignup} className="btn btn-primary w-full bg-red-500 hover:bg-red-600">
        Sign Up with Google
      </button>

      <button onClick={handleAppleSignup} className="btn btn-primary w-full bg-black hover:bg-gray-800 mt-4">
        Sign Up with Apple
      </button>

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">Log In</a>
      </p>
    </div>
  );
};

export default Signup;
