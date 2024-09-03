import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LoginResponse, TParsedToken, TRegister } from "../types";

// type User = {
//   data: {
//     exp: number;
//   };
// };

type AuthContextType = {
  user: LoginResponse | null;
  getUser: () => TRegister | null;
  userIsAuthenticated: () => boolean;
  userLogin: (user: LoginResponse, token: TParsedToken) => void;
  userLogout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const getUser = (): TRegister | null => {
    return JSON.parse(localStorage.getItem("user") || "null");
  };

  const userIsAuthenticated = (): boolean => {
    let storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return false;
    }
    storedUser = JSON.parse(storedUser);

    // if user has token expired, logout user
    // if (Date.now() > storedUser?.data.exp * 1000) {
    //   userLogout();
    //   return false;
    // }
    return true;
  };

  const userLogin = (user: LoginResponse, token: TParsedToken): void => {
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
