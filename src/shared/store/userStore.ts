import { create } from "zustand";

// types
export interface User {
  _id: string;
  userName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (userData: User) => void;
  logout: () => void;
}

//  store
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (userData: User) =>
    set(() => ({
      user: userData,
      isLoggedIn: true,
    })),

  logout: () =>
    set(() => ({
      user: null,
      isLoggedIn: false,
    })),
}));
