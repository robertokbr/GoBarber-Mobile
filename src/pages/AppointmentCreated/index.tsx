import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as S from './styles';

interface RouteParams {
  params: {
    date: number;
  };
}

const AppointmentCreated: React.FC = () => {
  const {
    params: { date },
  } = useRoute() as RouteParams;

  const { reset } = useNavigation();

  const handleConfirm = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(
    () =>
      format(
        new Date(date),
        "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
        {
          locale: ptBR,
        },
      ),
    [date],
  );

  return (
    <S.Container>
      <Feather name="check" size={80} color="#04d361" />
      <S.MessageTitle>
        Agendamento
        {'\n'}
        concluído
      </S.MessageTitle>
      <S.MessageDetails>{formattedDate}</S.MessageDetails>
      <S.ConfirmationButton onPress={handleConfirm}>
        <S.ConfirmationButtonText>Ok</S.ConfirmationButtonText>
      </S.ConfirmationButton>
    </S.Container>
  );
};

export default AppointmentCreated;
