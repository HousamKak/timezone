import { useState, useEffect } from 'react';

interface AuthUser {
  id: number;
  name: string;
  role: string;
  department: string;
  permissions: string[];
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would check localStorage, sessionStorage, or make an API call
        const token = localStorage.getItem('authToken');
        if (token) {
          // Mock user data - in real app, decode token or fetch user data
          const mockUser: AuthUser = {
            id: 1,
            name: 'Jane Smith',
            role: 'Senior Analyst',
            department: 'Biotech',
            permissions: ['read:trades', 'write:trades', 'read:performance'],
          };
          
          setAuthState({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Authentication check failed',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock login - in real app, make API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser: AuthUser = {
        id: 1,
        name: 'Jane Smith',
        role: 'Senior Analyst',
        department: 'Biotech',
        permissions: ['read:trades', 'write:trades', 'read:performance'],
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token');
      
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please check your credentials.',
      }));
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const hasPermission = (permission: string): boolean => {
    return authState.user?.permissions.includes(permission) || false;
  };

  const isRole = (role: string): boolean => {
    return authState.user?.role === role;
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    hasPermission,
    isRole,
  };
};
