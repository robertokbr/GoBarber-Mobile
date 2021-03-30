/* eslint-disable @typescript-eslint/ban-types */
import React, {
  useCallback,
  useState,
  useContext,
  createContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthState>({} as AuthState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [userArray, tokenArray] = await AsyncStorage.multiGet([
        '@Gobarber:user',
        '@Gobarber:token',
      ]);
      const token = tokenArray[1];
      const user = userArray[1];

      if (user && token) {
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
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;
    setUserData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobarber:token', '@Gobarber:user']);
    setUserData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userData.user, loading, signIn, signOut }}
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
