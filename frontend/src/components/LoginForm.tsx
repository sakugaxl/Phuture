import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../main';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 p-3 border rounded-lg"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 p-3 border rounded-lg"
      />
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm">Remember Me</label>
      </div>
      <button onClick={handleLogin} className="btn btn-primary w-full">Log In</button>
      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginForm;
