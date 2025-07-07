import React, { useState } from 'react';
import clixxoLogo from '../assets/Clixxo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Wrong username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#e3e7ef] flex flex-col items-center justify-start">
      {/* Top Bar */}
      <div className="w-screen h-[170px] bg-[#23272b] relative overflow-hidden" />
      {/* Login Card */}
      <div className="bg-white/80 rounded-lg shadow-lg px-6 py-10 sm:px-10 sm:py-12 flex flex-col items-center relative mt-6 w-[95vw] max-w-[400px]">
        {/* Error Message */}
        {error && (
          <div className="bg-[#f8d7da] text-[#a94442] px-5 py-3 rounded-md text-base font-medium mb-4 w-full max-w-xs absolute -top-16 left-1/2 -translate-x-1/2 border border-[#f5c6cb] flex items-center justify-between z-10 shadow">
            <span>username or password is incorrect.</span>
            <span
              className="cursor-pointer text-2xl ml-4 leading-none"
              onClick={() => setError('')}
            >
              &times;
            </span>
          </div>
        )}
        {/* Logo */}
        <div className="mb-2 flex justify-center w-full">
          <img src={clixxoLogo} alt="Clixxo Logo" className="w-56 max-w-full" />
        </div>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full max-w-xs mt-6">
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-lg text-gray-700 font-medium" htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="text-base px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white disabled:bg-gray-100"
              autoFocus
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-2 mb-7">
            <label className="text-lg text-gray-700 font-medium" htmlFor="password">Password :</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="text-base px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white disabled:bg-gray-100"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`min-w-[120px] px-8 py-2 text-lg rounded-md font-semibold shadow-md transition-all duration-200
                ${isLoading
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : 'bg-gradient-to-b from-[#3bb6f5] to-[#0e8fd6] text-white hover:from-[#249be8] hover:to-[#0a6fae] hover:shadow-lg cursor-pointer'}
              `}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className={`min-w-[120px] px-8 py-2 text-lg rounded-md font-semibold shadow-md transition-all duration-200
                ${isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-b from-[#e3e7ef] to-[#bfc6d1] text-gray-800 hover:from-[#f5f6fa] hover:to-[#d3d6dd] hover:shadow-lg cursor-pointer'}
              `}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 