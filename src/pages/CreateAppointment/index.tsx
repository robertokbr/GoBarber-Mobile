import React, { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface CreateAppointmentProps {
  children: ReactNode;
}

function CreateAppointment({ children }: CreateAppointmentProps) {
  return (
    <Container>
      <Text>CreateAppointment</Text>
      {children}
    </Container>
  );
}

export default CreateAppointment;
