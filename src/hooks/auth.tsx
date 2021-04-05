import React, {
  useCallback,
  useState,
  useContext,
  createContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { isAfter, parseISO } from 'date-fns';

import api from '../services/api';
import IUser from '../models/IUser';

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthState>({} as AuthState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [
        userArray,
        tokenArray,
        validationArray,
      ] = await AsyncStorage.multiGet([
        '@Gobarber:user',
        '@Gobarber:token',
        '@Gobarber:validation',
      ]);
      const token = tokenArray[1];
      const user = userArray[1];
      const validation = validationArray[1];

      const isTokenValid = new Date(JSON.parse(validation));

      isTokenValid.setHours(23, 59);

      if (user && token && isAfter(isTokenValid, new Date())) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', { email, password });
    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@Gobarber:token', token],
      ['@Gobarber:user', JSON.stringify(user)],
      ['@Gobarber:validation', JSON.stringify(new Date())],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;
    setUserData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobarber:token', '@Gobarber:user']);
    setUserData({} as AuthState);
  }, []);

  const updateUser = useCallback(async (user: IUser) => {
    setUserData(state => ({
      ...state,
      user,
    }));

    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userData.user, updateUser, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider as wrapper');
  }

  return context;
}

export { AuthProvider, useAuth };
