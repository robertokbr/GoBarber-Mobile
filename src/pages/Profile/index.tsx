import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

interface ProfileProps {
  children: ReactNode;
}

function Profile({ children }: ProfileProps) {
  const { signOut } = useAuth();

  return (
    <Container>
      <RectButton onPress={() => signOut}>
        <Text>Profile</Text>
        {children}
      </RectButton>
    </Container>
  );
}

export default Profile;
