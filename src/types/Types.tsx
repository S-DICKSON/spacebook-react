/* eslint-disable @typescript-eslint/indent */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserDetail, DraftPost, Post } from '../interfaces/Interfaces';

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(loginUser: LoginUser): Promise<void>;
  signOut(): void;
  user: UserDetail;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
};

export type UserProp = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type AuthData = {
  token: string;
  id: number;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  user_id: number;
};

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
};

export type SettingStackParams = {
  Settings: undefined;
  'Update Details': undefined;
  Photo: undefined;
};

export type Photo = {
  base64: string;
  uri: string;
  type: string;
};

export type PostStackParams = {
  Post: {
    draft_post: undefined | DraftPost;
  };
  'Home Feed': undefined;
  'User Post': { post_id: number; user_id: number; text: string };
  'Editing Post': {
    post_id: number | undefined;
    user_id: number | undefined;
    text: string | undefined;
  };
  'Friend Feed': {
    posts: [] | [Post];
  };
  'Post Draft': undefined;
};

export type RequestItemProp = {
  user: User;
  index: number;
  removeFriendItem(index: number): void;
  authData: AuthData | undefined;
};
export type PostDraftItemProp = {
  item: DraftPost;
  updateDraftPost: () => {};
};

export type DraftScreenProp = StackNavigationProp<PostStackParams>;

export type PostItemProp = {
  item: Post;
  authData: any | undefined;
};

export type PostScreenProp = StackNavigationProp<PostStackParams>;

export type UserHeaderProp = {
  item: UserProp;
  authData: any | undefined;
};
export type UserFriend = {
  user_email: string;
  user_familyname: string;
  user_givenname: string;
  user_id: number;
};

export type FriendFeedScreenRouteProp = RouteProp<
  PostStackParams,
  'Friend Feed'
>;

export type RegisterScreenProp = StackNavigationProp<
  RootStackParams,
  'Register'
>;

export type PostScreenRouteProp = RouteProp<PostStackParams, 'Post'>;

export type LoginScreenProp = StackNavigationProp<RootStackParams, 'Login'>;

export type UserUpdateScreenProp = StackNavigationProp<SettingStackParams>;

export type PostUserScreenRouteProp = RouteProp<PostStackParams, 'User Post'>;

export type UserPostScreenProp = StackNavigationProp<PostStackParams>;
export type SettingScreenProp = StackNavigationProp<
  SettingStackParams,
  'Settings'
>;
