import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native';

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

const CreateAppointment: React.FC = ({ children }) => {
  const { params } = useRoute() as CreateAppointmentParams;
  const { user } = useAuth();

  const [providers, setProviders] = useState<IUser[]>([]);

  useEffect(() => {
    api
      .get<IUser[]>('/providers')
      .then(response => setProviders(response.data));
  }, [providers]);

  return (
    <S.Container>
      <Header subTitle="Cabeleireiros" withBackIcon>
        <CustomAvatar avatar={user.avatar_url} />
      </Header>
      <S.ProvidersList
        horizontal
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider, index }) => (
          <S.ProviderContainer isTheLast={index + 1 === providers.length}>
            <S.ProviderName>{provider.name}</S.ProviderName>
          </S.ProviderContainer>
        )}
      />
    </S.Container>
  );
};

export default CreateAppointment;
