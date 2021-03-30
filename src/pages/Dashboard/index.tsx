import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import * as S from './styles';

import Header from '../../components/Header';
import CustomAvatar from '../../components/CustomAvatar';
import IUser from '../../models/IUser';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
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

  return (
    <S.Container>
      <Header title="Bem vindo!" subTitle={user.name}>
        <S.ProfileButton onPress={handleNavigate}>
          <CustomAvatar avatar={user.avatar_url} />
        </S.ProfileButton>
      </Header>
      <RectButton
        style={{ alignSelf: 'center', justifyContent: 'center' }}
        onPress={() => signOut()}
      >
        <Text>Sair</Text>
      </RectButton>
      <S.ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </S.Container>
  );
};

export default Dashboard;
