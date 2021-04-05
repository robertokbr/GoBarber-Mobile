import { FlatList, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import IUser from '../../models/IUser';

interface ListProps {
  isTheLast: boolean;
  isSelected: boolean;
}

interface HourPops {
  available: boolean;
  selected: boolean;
}

interface AppointmentButtonProps {
  isEnabled: boolean;
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

export const CalendarContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-family: medium;
  font-size: 24px;
  margin: 0 24px 24px;
  color: #fff;
`;

export const CreateAppointmentButton = styled(RectButton)<
  AppointmentButtonProps
>`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
  opacity: ${props => (props.isEnabled ? 1 : 0.3)};
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: medium;
  font-size: 18px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: regular;
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})``;

export const Hour = styled(RectButton)<HourPops>`
  padding: 12px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<Pick<HourPops, 'selected'>>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: regular;
  font-size: 16px;
`;
