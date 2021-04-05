import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 46px;
`;

export const MessageTitle = styled.Text`
  font-size: 32px;
  color: #f4ede8;
  font-family: medium;
  margin-top: 48px;
  text-align: center;
`;

export const MessageDetails = styled.Text`
  font-family: regular;
  font-size: 16px;
  color: #999591;
  margin-top: 16px;
`;

export const ConfirmationButton = styled(RectButton)`
  background: #ff9000;
  width: 100%;
  padding: 12px 12px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 24px;
`;

export const ConfirmationButtonText = styled.Text`
  font-family: medium;
  color: #fff;
  font-size: 18px;
`;
