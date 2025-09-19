import { useState, useEffect } from "react";

interface User {
  id: string;
  name?: string;
  email?: string;
  [key: string]: any; // For any additional properties
}

interface Tokens {
  accessToken: string;
  refreshToken?: string;
  [key: string]: any; // For any additional properties
}

interface UseUserReturn {
  user: User | null;
  tokens: Tokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

/**
 * Custom hook to access user data and tokens from localStorage
 */
export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user and tokens from localStorage
    try {
      const storedUser = localStorage.getItem("user");
      const storedTokens = localStorage.getItem("tokens");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedTokens) {
        setTokens(JSON.parse(storedTokens));
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper function to clear user data and tokens
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    setUser(null);
    setTokens(null);
  };

  return {
    user,
    tokens,
    isLoading,
    isAuthenticated: !!user && !!tokens,
    logout,
  };
}
