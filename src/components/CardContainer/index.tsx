import { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface CardContainerProps {
  children: ReactNode;
}

function CardContainer({ children }: CardContainerProps) {
  return (
    <Container>
      <Text>CardContainer</Text>
      {children}
    </Container>
  );
};

export default CardContainer;
