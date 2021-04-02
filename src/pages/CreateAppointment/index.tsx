import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

import * as S from './styles';
import Header from '../../components/Header';
import CustomAvatar from '../../components/CustomAvatar';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import IUser from '../../models/IUser';

interface CreateAppointmentParams {
  params: {
    provider_id: string;
  };
}

const CreateAppointment: React.FC = () => {
  const { params } = useRoute() as CreateAppointmentParams;
  const { user } = useAuth();

  const [providers, setProviders] = useState<IUser[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(params.provider_id);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [providerDayAvailability, setProviderDayAvailability] = useState([]);

  useEffect(() => {
    api
      .get<IUser[]>('/providers')
      .then(response => setProviders(response.data));
  }, [providers]);

  useEffect(() => {
    api
      .get<any[]>(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        console.log(response.data);
        setProviderDayAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((provider_id: string) => {
    setSelectedProvider(provider_id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChange = useCallback(
    (date: Date) => {
      const currentDate = date || selectedDate;

      setSelectedDate(currentDate);
    },
    [selectedDate],
  );

  return (
    <S.Container>
      <Header subTitle="Cabeleireiros" withBackIcon>
        <CustomAvatar avatar={user.avatar_url} />
      </Header>
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
      <S.CalendarContainer>
        <S.CalendarTitle>Selecione a data</S.CalendarTitle>
        <S.OpenDatePickerButton onPress={handleToggleDatePicker}>
          <S.OpenDatePickerText>Selecionar data</S.OpenDatePickerText>
        </S.OpenDatePickerButton>
        {showDatePicker && (
          <DatePicker
            locale="pt"
            mode="date"
            androidVariant="iosClone"
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        )}
      </S.CalendarContainer>
    </S.Container>
  );
};

export default CreateAppointment;
