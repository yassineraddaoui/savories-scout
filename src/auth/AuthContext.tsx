
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as keycloakLogin, 
  logout as keycloakLogout, 
  register as keycloakRegister,
  getCurrentUser,
  isAuthenticated,
  refreshToken,
  KeycloakUser
} from './keycloak';

interface AuthContextType {
  user: KeycloakUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
  register: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<KeycloakUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Try to refresh token if needed
        if (isAuthenticated()) {
          const currentUser = getCurrentUser();
          setUser(currentUser);
        } else {
          const refreshed = await refreshToken();
          if (refreshed) {
            const currentUser = getCurrentUser();
            setUser(currentUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userInfo = await keycloakLogin(username, password);
      setUser(userInfo);
      return !!userInfo;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await keycloakLogout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = () => {
    keycloakRegister();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
