import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden max-w-6xl w-full">
        <div className="hidden md:block w-1/2">
          <img
            src="../collab.png"
            alt="Teamwork"
            className="w-[580px] h-[690px] object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src="../logo.png"
              alt="Logo"
              className="w-[200px] h-[80px] bg-white"
            />
          </div>
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome to Gigfloww</h1>
            <p className="text-sm text-gray-600">
              Seamless HR operations start now!
              <br />
              Sign up
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Work Email</label>
              <input
                type="email"
                placeholder="Your Work Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500 text-sm"
                >
                  {showPassword ? '🔓' : '🔒'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2784B8] to-[#113B52] text-white text-sm font-medium py-2.5 rounded-md shadow"
            >
              Sign up for free
            </button>

            <p className="text-xs text-center text-gray-500 mt-1">
              By clicking Sign up, you agree to our{' '}
              <a href="#" className="text-blue-600 underline">
                Terms and Conditions
              </a>
            </p>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already on Gigfloww?{' '}
              <a href="/login" className="text-blue-600 underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
