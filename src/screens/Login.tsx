import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { RootStackParams } from '../types/Navigation';
import { useAuth } from '../context/AuthContext';

type RegisterScreenProp = StackNavigationProp<RootStackParams, 'Register'>;
function LoginScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation<RegisterScreenProp>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const auth = useAuth();

  const loginUser = () => {
    // navigation.navigate('Home');
    auth.signIn();
    console.log('logged in the user');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <TextInput placeholder="TESTTST" />

          <TextInput placeholder="password" keyboardType="visible-password" />

          <Button title="Login" onPress={loginUser} />

          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
