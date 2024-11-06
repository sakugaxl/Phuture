import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login, loginWithGoogle, loginWithApple } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError("Google login failed. Please try again.");
    }
  };

  const handleAppleLogin = async () => {
    try {
      await loginWithApple();
      navigate('/dashboard');
    } catch (error) {
      setError("Apple login failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary w-full">Log In</button>
      </form>

      <div className="my-4 flex items-center justify-center">
        <span className="text-gray-500">or</span>
      </div>

      <button onClick={handleGoogleLogin} className="btn btn-primary w-full bg-red-500 hover:bg-red-600">
        Log In with Google
      </button>

      <button onClick={handleAppleLogin} className="btn btn-primary w-full bg-black hover:bg-gray-800 mt-4">
        Log In with Apple
      </button>

      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
