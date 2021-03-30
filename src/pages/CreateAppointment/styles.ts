import { FlatList, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import IUser from '../../models/IUser';

interface ListProps {
  isTheLast: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IUser>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)<ListProps>`
  background: #3e3b47;
  border-radius: 10px;
  padding: 8px;
  margin-right: ${props => (props.isTheLast ? 20 : 8)}px;
  align-items: center;
  height: 112px;
`;

export const ProviderName = styled.Text`
  font-family: regular;
  font-size: 12px;
  color: #f4ede8;
`;
