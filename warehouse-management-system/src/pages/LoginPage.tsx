import React from 'react';
import useAuthStore from '../stores/authStore';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    // U realnoj aplikaciji, ovde bi išla provera kredencijala
    const mockUser = {
      name: 'Jovan Jovanović',
      email: 'jovan@example.com',
      role: 'Admin' as const,
    };
    login(mockUser);
    navigate('/'); // Preusmeri na dashboard nakon prijave
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Prijavljivanje</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="jovan@example.com"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Lozinka
            </label>
            <input
              type="password"
              id="password"
              defaultValue="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Button type="button" onClick={handleLogin} className="w-full">
            Prijavi se
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
