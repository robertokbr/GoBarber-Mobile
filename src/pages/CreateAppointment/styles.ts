import { FlatList, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import IUser from '../../models/IUser';

interface ListProps {
  isTheLast: boolean;
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const ProviderListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IUser>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ListProps>`
  background: ${props => (props.isSelected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  padding: 8px 12px;
  margin-right: ${props => (props.isTheLast ? 32 : 16)}px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ProviderName = styled.Text<Omit<ListProps, 'isTheLast'>>`
  font-family: medium;
  font-size: 16px;
  color: ${props => (props.isSelected ? '#232129' : '#f4ede8')};
  margin-left: 8px;
`;

export const CalendarContainer = styled.View``;

export const CalendarTitle = styled.Text`
  font-family: medium;
  font-size: 24px;
  margin: 0 24px 24px;
  color: #fff;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerText = styled.Text`
  font-family: medium;
  font-size: 16px;
  color: #232129;
`;
