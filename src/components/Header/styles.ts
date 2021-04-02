import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  padding: 24px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: light;
  line-height: 28px;
  flex: 1;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: regular;
`;
