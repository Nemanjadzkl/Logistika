import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { Button } from './ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-center">MagacinPRO</h1>
        </div>
        <nav className="mt-4 p-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-semibold' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `block px-4 py-2 mt-2 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-semibold' : ''}`
            }
          >
            Inventar
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b p-4 flex justify-end items-center">
          <div className="flex items-center space-x-4">
            <span>{user?.name} ({user?.role})</span>
            <Button variant="outline" onClick={handleLogout}>
              Odjavi se
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
