import { create } from 'zustand';

interface AuthState {
  phone: string | null;
  jwt: string | null;
  refreshToken: string | null; // stored securely, fetched into memory when needed
  selfieUrl?: string;
  setPhone: (p: string | null) => void;
  setJwt: (t: string | null) => void;
  setRefreshToken: (t: string | null) => void;
  setSelfieUrl: (u?: string) => void;
  reset: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  phone: null,
  jwt: null,
  refreshToken: null,
  selfieUrl: undefined,
  setPhone: (p) => set({ phone: p }),
  setJwt: (t) => set({ jwt: t }),
  setRefreshToken: (t) => set({ refreshToken: t }),
  setSelfieUrl: (u) => set({ selfieUrl: u }),
  reset: () => set({ phone: null, jwt: null, refreshToken: null, selfieUrl: undefined }),
}));