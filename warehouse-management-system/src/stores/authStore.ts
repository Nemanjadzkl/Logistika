import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Menadžer' | 'Magacioner' | 'Računovođa' | 'Read-only';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
