import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
}
interface signUpCredentials {
  name: string;
  email: string;
  password: string;
  birth: string;
}
interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(creationCredentials: signUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Coal:token');
    const user = localStorage.getItem('@Coal:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Coal:token', token);
    localStorage.setItem('@Coal:user', JSON.stringify(user));
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password, birth }) => {
    const response = await api.post('users', {
      name,
      email,
      password,
      birth,
    });
    console.log(response);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Coal:token');
    localStorage.removeItem('@Coal:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AutoProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
