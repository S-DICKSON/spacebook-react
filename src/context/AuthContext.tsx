/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable object-curly-newline */
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FlashMessage, { showMessage } from 'react-native-flash-message';
import LoginDataService from '../api/unauthenticated/LoginDataService';
import UserDataService from '../api/authenticated/user/UserDataService';
import { AuthContextData, AuthData, LoginUser } from '../types/Types';
import checkNetwork from '../exceptions/CheckNetwork';
import { UserDetail } from '../interfaces/Interfaces';

// Create the Auth Context with the data type specified
// and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children: React.ReactNode;
};

const user: UserDetail = {
  first_name: '',
  last_name: '',
  email: '',
  friend_count: 0,
};
function AuthProvider({ children }: Props) {
  const [authData, setAuthData] = useState<AuthData>();

  const [loading, setLoading] = useState(true);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const data: AuthData = JSON.parse(authDataSerialized);
        setAuthData(data);
      }
    } finally {
      // loading finished
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  const signIn = async (loginUser: LoginUser) => {
    LoginDataService.login(loginUser)
      .then((response: any) => {
        const authDataResponse: AuthData = {
          id: response.data.id,
          token: response.data.token,
        };

        setAuthData(authDataResponse);

        AsyncStorage.setItem('@AuthData', JSON.stringify(authDataResponse));

        showMessage({
          message: 'You have successfully logged in!',
          type: 'success',
          duration: 3000,
        });
      })
      .catch((err) => {
        checkNetwork(err.message);

        if (err.response?.status === 400) {
          showMessage({
            message: 'Wrong email or password!',
            type: 'danger',
            duration: 3000,
          });
        }
      });
  };

  const signOut = async () => {
    UserDataService.setAuth(authData);
    UserDataService.logout();
    setAuthData(undefined);

    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signOut,
        user,
      }}
    >
      {children}
      <FlashMessage position="top" />
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
