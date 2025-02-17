import { createContext, JSX, ReactNode, useState } from 'react';

// Define an interface for our authentication context
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {}
});

// Define the type for the AuthProvider's props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  // Initialize auth state with token if available
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (newToken: string): void => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
