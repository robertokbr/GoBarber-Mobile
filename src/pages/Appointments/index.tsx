/* eslint-disable no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import * as S from './styles';
import Header from '../../components/Header';
import CustomAvatar from '../../components/CustomAvatar';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import IAppointments from '../../models/IAppointments';
import AppointmentsList from '../../components/AppointmentsList/AppointmentsList';

interface Item {
  key: string;
  render: () => JSX.Element;
  isTitle?: boolean;
}

const Appointments: React.FC = () => {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState<IAppointments[]>([]);

  useEffect(() => {
    api.get<IAppointments[]>('/appointments/users/me').then(response => {
      const appointmentsFormated = response.data.map(appointment => ({
        ...appointment,
        formattedHour: format(parseISO(appointment.date), 'HH:mm'),
        formattedDate: format(parseISO(appointment.date), 'EEEE, dd/MM/yyyy', {
          locale: ptBR,
        }),
      }));

      const sortedAppointments = appointmentsFormated.sort((a, b) =>
        a.date > b.date ? -1 : 1,
      );

      setAppointments(sortedAppointments);
    });
  }, []);

  const { allAppointments, nextAppointment } = useMemo(() => {
    const nextAppointmentIndex = [...appointments]
      .reverse()
      .findIndex(appointment =>
        isAfter(parseISO(appointment.date), new Date()),
      );

    const allAppointments = appointments.map(appointment => ({
      provider: appointment.provider.userAccount.user,
      formattedDate: appointment.formattedDate,
      formattedHour: appointment.formattedHour,
    }));

    const nextAppointment = allAppointments[nextAppointmentIndex];

    allAppointments.splice(nextAppointmentIndex, 1);

    return { allAppointments, nextAppointment };
  }, [appointments]);

  const { data, indexes } = useMemo(() => {
    const indexes: number[] = [];

    const items: Item[] = [
      {
        key: 'NEXT_APPOINTMENT_TITLE',
        render: () => (
          <S.TitleContainer>
            <S.Title>Próximos agendamentos</S.Title>
          </S.TitleContainer>
        ),
        isTitle: true,
      },
      {
        key: 'NEX_APPOINTMENT',
        render: () =>
          nextAppointment && (
            <AppointmentsList appointments={[nextAppointment]} />
          ),
      },
      {
        key: 'PAST_APPOINTMENTS_TITLE',
        render: () => (
          <S.TitleContainer>
            <S.Title>Agendamentos passados</S.Title>
          </S.TitleContainer>
        ),
        isTitle: true,
      },
      {
        key: 'PAST_APPOINTMENTS',
        render: () => <AppointmentsList appointments={[...allAppointments]} />,
      },
    ];

    items.forEach((item, index) => item.isTitle && indexes.push(index));

    return {
      data: items,
      indexes,
    };
  }, [allAppointments, nextAppointment]);

  return (
    <S.Container>
      <Header title="Bem vindo!" subTitle={user.name}>
        <CustomAvatar userName={user.name} avatar={user.avatar_url} />
      </Header>
      <FlatList<Item>
        contentContainerStyle={{
          paddingTop: 24,
        }}
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={indexes}
        refreshing={false}
      />
    </S.Container>
  );
};

export default Appointments;
