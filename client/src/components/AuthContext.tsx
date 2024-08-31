import { createContext, useContext, useState } from "react";
import { TRegister } from "../types";

interface AuthContextType {
  user: TRegister | null;
  login: (userData: TRegister) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<TRegister | null>();

  const login = (userData: any) => {
    // Login logic

    setUser(userData);
  };

  const logout = () => {
    // Logout logic
    setUser(null);
  };

  const register = () => {
    // logic
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
