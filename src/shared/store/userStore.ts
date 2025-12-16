import { create } from "zustand";

// types
export interface User {
  _id: string;
  userName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (userData: User) => void;
  logout: () => void;
}

//  store
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  setUser: (userData: User) =>
    set(() => ({
      user: userData,
    })),

  logout: () =>
    set(() => ({
      user: null,
    })),
}));
