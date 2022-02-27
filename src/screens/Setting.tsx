import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { SafeAreaView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Button, Text } from 'react-native-paper';
import UserDataService from '../api/authenticated/user/UserDataService';
import UserDetail from '../components/UserDetail';
import { UserDetail as UserDetailInterface } from '../interfaces/Interfaces';

import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { SettingStackParams } from '../types/Types';

type UserUpdateScreenProp = StackNavigationProp<
  SettingStackParams,
  'Update Details'
>;

function Setting() {
  const auth = useAuth();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  UserDataService.setAuth(auth.authData);

  const navigation = useNavigation<UserUpdateScreenProp>();

  useEffect(() => {
    UserDataService.getUser(auth.authData?.id)
      .then((response: any) => {
        // set data
        setData(response.data);

        const user: UserDetailInterface = {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          friend_count: response.data.friend_count,
        };

        auth.user = user;

        showMessage({
          message: 'User data loaded',
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
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <Avatar.Text size={48} label="XD" />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <UserDetail
          first_name={data.first_name}
          last_name={data.last_name}
          email={data.email}
          friend_count={data.friend_count}
        />
      )}

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Update Details')}
      >
        Edit User Details
      </Button>
    </SafeAreaView>
  );
}

export default Setting;
