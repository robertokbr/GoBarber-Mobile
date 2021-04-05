import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { ActivityIndicator, Alert } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import * as S from './styles';
import Header from '../../components/Header';
import CustomAvatar from '../../components/CustomAvatar';
import api from '../../services/api';
import IUser from '../../models/IUser';
import { useAuth } from '../../hooks/auth';

interface RouteParams {
  params: {
    provider_id: string;
  };
}

interface DayAvailability {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { params } = useRoute() as RouteParams;
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const today = useMemo(() => new Date(), []);

  const [selectedProvider, setSelectedProvider] = useState(params.provider_id);

  const [providers, setProviders] = useState<IUser[]>([]);

  const [selectedDate, setSelectedDate] = useState(today);

  const [availability, setAvailability] = useState<DayAvailability[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedHour, setSelectedHour] = useState(0);

  useEffect(() => {
    setLoading(true);
    api
      .get<DayAvailability[]>(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      .then(response => {
        setAvailability(response.data);
        setLoading(false);
      });
  }, [selectedDate, selectedProvider]);

  useEffect(() => {
    api
      .get<IUser[]>('/providers')
      .then(response => setProviders(response.data));
  }, []);

  const handleSelectProvider = useCallback((provider_id: string) => {
    setSelectedProvider(provider_id);
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      Alert.alert(
        'Ooops!',
        'Houve um erro no processo :(\nTente novamente mais tarde...',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ available, hour }) => ({
        hour,
        available,
        formated_hour: format(new Date().setHours(hour), `HH:00`),
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ available, hour }) => ({
        hour,
        available,
        formated_hour: format(new Date().setHours(hour), `HH:00`),
      }));
  }, [availability]);

  return (
    <S.Container>
      <Header subTitle="Cabeleireiros" withBackIcon>
        <CustomAvatar userName={user.name} avatar={user.avatar_url} />
      </Header>
      <ScrollView>
        <S.ProviderListContainer>
          <S.ProvidersList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider, index }) => (
              <S.ProviderContainer
                isSelected={provider.id === selectedProvider}
                isTheLast={index + 1 === providers.length}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <CustomAvatar
                  userName={provider.name}
                  avatar={provider.avatar_url}
                  imageStyle={{
                    height: 32,
                    width: 32,
                    borderRadius: 16,
                  }}
                />
                <S.ProviderName isSelected={provider.id === selectedProvider}>
                  {provider.name}
                </S.ProviderName>
              </S.ProviderContainer>
            )}
          />
        </S.ProviderListContainer>
        <S.Title>Selecione a data</S.Title>
        <S.CalendarContainer>
          <DatePicker
            locale="pt"
            mode="date"
            androidVariant="iosClone"
            date={selectedDate}
            onDateChange={handleDateChange}
            fadeToColor="none"
            textColor="#f4ede8"
            minimumDate={today}
          />
        </S.CalendarContainer>
        <S.Schedule>
          {!loading ? (
            <>
              <S.Title>Selecione o horário</S.Title>
              <S.Section>
                <S.SectionTitle>Manhã</S.SectionTitle>
                <S.SectionContent>
                  {morningAvailability.map(
                    ({ formated_hour, available, hour }) => (
                      <S.Hour
                        selected={selectedHour === hour}
                        available={available}
                        onPress={() => handleSelectHour(hour)}
                        key={hour}
                        enabled={available}
                      >
                        <S.HourText selected={selectedHour === hour}>
                          {formated_hour}
                        </S.HourText>
                      </S.Hour>
                    ),
                  )}
                </S.SectionContent>
              </S.Section>
              <S.Section>
                <S.SectionTitle>Tarde</S.SectionTitle>
                <S.SectionContent>
                  {afternoonAvailability.map(
                    ({ available, formated_hour, hour }) => (
                      <S.Hour
                        key={hour}
                        available={available}
                        onPress={() => handleSelectHour(hour)}
                        selected={selectedHour === hour}
                        enabled={available}
                      >
                        <S.HourText selected={selectedHour === hour}>
                          {formated_hour}
                        </S.HourText>
                      </S.Hour>
                    ),
                  )}
                </S.SectionContent>
              </S.Section>
            </>
          ) : (
            <ActivityIndicator
              size="small"
              color="#ff9000"
              style={{
                flex: 1,
                marginTop: 40,
              }}
            />
          )}
        </S.Schedule>
        <S.CreateAppointmentButton
          enabled={selectedHour >= 8}
          isEnabled={selectedHour >= 8}
          onPress={handleCreateAppointment}
        >
          <S.CreateAppointmentButtonText>Agendar</S.CreateAppointmentButtonText>
        </S.CreateAppointmentButton>
      </ScrollView>
    </S.Container>
  );
};

export default CreateAppointment;
