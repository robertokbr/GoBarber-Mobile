import React, { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface AppointmentCreatedProps {
  children: ReactNode;
}

function AppointmentCreated({ children }: AppointmentCreatedProps) {
  return (
    <Container>
      <Text>AppointmentCreated</Text>
      {children}
    </Container>
  );
}

export default AppointmentCreated;
