import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { User, AuthState } from '../types/auth';
import { authApi } from '../api/auth';
import { mockUsers } from '../mocks/users';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const mockUser = mockUsers.find(
        user => user.email.toLowerCase() === email.toLowerCase()
      );
      
      if (mockUser && mockUser.password === password) {
        const { password: _, ...userWithoutPassword } = mockUser;
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Invalid email or password'
        });
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'An error occurred while logging in',
      });
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}