import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import * as S from './styles';

import Header from '../../components/Header';
import CustomAvatar from '../../components/CustomAvatar';
import IUser from '../../models/IUser';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [providers, setProviders] = useState<IUser[]>([]);

  useEffect(() => {
    api
      .get<IUser[]>('/providers')
      .then(response => setProviders(response.data));
  }, [providers]);

  const handleNavigate = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToCreateAppointment = useCallback(
    (provider_id: string) => {
      navigation.navigate('CreateAppointment', { provider_id });
    },
    [navigation],
  );

  return (
    <S.Container>
      <Header title="Bem vindo!" subTitle={user.name}>
        <S.ProfileButton onPress={handleNavigate}>
          <CustomAvatar userName={user.name} avatar={user.avatar_url} />
        </S.ProfileButton>
      </Header>
      <S.ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <S.ProviderListTitle>Barbeiros</S.ProviderListTitle>
        }
        renderItem={({ item: provider, index }) => (
          <S.ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
            isTheLast={index + 1 === providers.length}
          >
            <CustomAvatar
              imageStyle={{
                width: 72,
                height: 72,
                borderRadius: 36,
              }}
              userName={provider.name}
              avatar={provider.avatar_url}
            />
            <S.ProviderInfo>
              <S.ProviderName>{provider.name}</S.ProviderName>
              <S.ProviderMeta>
                <Feather name="calendar" size={14} color="#ff9000" />
                <S.ProviderMetaText>Segunda a Sexta</S.ProviderMetaText>
              </S.ProviderMeta>
              <S.ProviderMeta>
                <Feather name="clock" size={14} color="#ff9000" />
                <S.ProviderMetaText>08:00 ás 17:00</S.ProviderMetaText>
              </S.ProviderMeta>
            </S.ProviderInfo>
          </S.ProviderContainer>
        )}
      />
    </S.Container>
  );
};

export default Dashboard;
