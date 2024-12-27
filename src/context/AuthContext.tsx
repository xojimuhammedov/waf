import { createContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { useStore } from '../services/store';
import { request } from 'services/request';
import authConfig from 'configs/auth';
import { toast } from 'react-toastify';

interface User {
  // Define properties of user here
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (params: any, errorCallback?: (error: any) => void) => void;
  logout: () => void;
  register: (params: any, errorCallback?: (error: any) => void) => void;
  checkAuth: (token?: string | null) => void;
}

const defaultProvider: AuthContextProps = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  checkAuth: () => Promise.resolve()
};

const AuthContext = createContext<AuthContextProps>(defaultProvider);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const setUserData = useStore((state) => get(state, 'setUser', () => {}));
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  useEffect(() => {
    const initAuth = async () => {
      checkAuth();
    };
    initAuth();
  }, []);

  const handleLogin = (params: any, errorCallback?: (error: any) => void) => {
    setLoading(false);
    request
      .post(authConfig.loginEndpoint, params)
      .then(async (response: AxiosResponse<any>) => {
        console.log(response.data);
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data?.token);
        setUser({ ...response.data.user });
        window.localStorage.setItem('userData', JSON.stringify(response.data?.user));
        window.location.replace('/');
        checkAuth(response.data?.jwt);
        toast.success('Siz muvaffaqiyatli kirdingiz!');
      })
      .catch((err: any) => {
        console.log(err);
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    window.location.replace('/login');
  };

  const handleRegister = (params: any, errorCallback?: (error: any) => void) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err) => (errorCallback ? errorCallback(err) : null));
  };

  const checkAuth = async (token: string | null = null) => {
    console.log(token);
    // Your checkAuth implementation
  };

  const values: AuthContextProps = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    checkAuth: checkAuth
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
