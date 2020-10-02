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

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    (async () => {
      const [userArray, tokenArray] = await AsyncStorage.multiGet([
        '@Gobarber:user',
        '@Gobarber:token',
      ]);
      const token = tokenArray[1];
      const user = userArray[1];

      if (user && token) {
        setUserData({ token, user: JSON.parse(user) });
      }
    })();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/session', { email, password });
    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@Gobarber:token', token],
      ['@Gobarber:user', user],
    ]);

    setUserData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobarber:token', '@Gobarber:user']);
    setUserData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: userData.user, signIn, signOut }}>
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
