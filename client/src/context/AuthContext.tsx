import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { TLoginResponse, TParsedToken, TLocalStorageUser } from "../types";

type AuthContextType = {
  user: TLoginResponse | null;
  getUser: () => TLocalStorageUser | null;
  userIsAuthenticated: () => boolean;
  userLogin: (user: TLoginResponse, token: TParsedToken) => void;
  userLogout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<TLoginResponse | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const getUser = (): TLocalStorageUser | null => {
    return JSON.parse(localStorage.getItem("user") || "null");
  };

  const userIsAuthenticated = (): boolean => {
    let storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return false;
    }
    storedUser = JSON.parse(storedUser);

    return true;
  };

  const userLogin = (user: TLoginResponse, token: TParsedToken): void => {
    const toStore = { user, token };

    localStorage.setItem("user", JSON.stringify(toStore));
    setUser(user);
  };

  const userLogout = (): void => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    getUser,
    userIsAuthenticated,
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider };
