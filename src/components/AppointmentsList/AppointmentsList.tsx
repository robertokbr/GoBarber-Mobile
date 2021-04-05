import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import CustomAvatar from '../CustomAvatar';

import * as S from './styles';
import IUser from '../../models/IUser';

type FormattedAppointments = {
  provider: IUser;
  formattedDate: string;
  formattedHour: string;
};

interface AppointmentsListProps {
  appointments: FormattedAppointments[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
}) => {
  return (
    <ScrollView>
      {appointments.map(appointment => (
        <S.ProviderContainer>
          <CustomAvatar
            imageStyle={{
              width: 72,
              height: 72,
              borderRadius: 36,
            }}
            userName={appointment.provider.name}
            avatar={appointment.provider.avatar_url}
          />
          <S.ProviderInfo>
            <S.ProviderName>{appointment.provider.name}</S.ProviderName>
            <S.ProviderMeta>
              <Feather name="calendar" size={14} color="#ff9000" />
              <S.ProviderMetaText>
                {appointment.formattedDate}
              </S.ProviderMetaText>
            </S.ProviderMeta>
            <S.ProviderMeta>
              <Feather name="clock" size={14} color="#ff9000" />
              <S.ProviderMetaText>
                {appointment.formattedHour}
              </S.ProviderMetaText>
            </S.ProviderMeta>
          </S.ProviderInfo>
        </S.ProviderContainer>
      ))}
    </ScrollView>
  );
};

export default AppointmentsList;
