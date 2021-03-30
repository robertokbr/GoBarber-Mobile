import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import IUser from '../../models/IUser';

export const Container = styled.View`
  flex: 1;
`;

export const ProfileButton = styled(RectButton)``;

export const ProvidersList = styled(FlatList as new () => FlatList<IUser>)``;
