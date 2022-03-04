/* eslint-disable import/no-cycle */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import PostScreen from '../screens/Post';
import UserPostScreen from '../screens/UserPost';
import UserPostUpdateScreen from '../screens/UserPostUpdate';
import FriendFeedScreen from '../screens/FriendFeed';
import PostDraftScreen from '../screens/PostDraft';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home Feed" component={HomeScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="User Post" component={UserPostScreen} />
      <Stack.Screen name="Editing Post" component={UserPostUpdateScreen} />
      <Stack.Screen name="Friend Feed" component={FriendFeedScreen} />
      <Stack.Screen name="Post Draft" component={PostDraftScreen} />
    </Stack.Navigator>
  );
}
