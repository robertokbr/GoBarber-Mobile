import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? '120px' : '60px'};
`;

export const Title = styled.Text`
  font-size: 24px;
  margin: 64px 0 24px;
  color: #f4ede8;
  font-family: medium;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;
export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: regular;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: regular;
  margin-left: 16px;
`;
