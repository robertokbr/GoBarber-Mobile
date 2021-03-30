import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import IUser from '../../models/IUser';

interface ListProps {
  isTheLast: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const ProfileButton = styled(RectButton)``;

export const ProvidersList = styled(FlatList as new () => FlatList<IUser>)`
  padding: 32px 24px 0;
`;

export const ProviderListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: medium;
`;

export const ProviderContainer = styled(RectButton)<ListProps>`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: ${props => (props.isTheLast ? 48 : 16)}px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: regular;
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: regular;
`;
