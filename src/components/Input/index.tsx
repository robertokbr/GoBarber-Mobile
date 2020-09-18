import React from 'react';
import { TextInputProps } from 'react-native';
import * as S from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ icon, name, ...rest }) => {
  return (
    <S.Container>
      <S.Icon name={icon} size={20} color="#666360" />
      <S.Input
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </S.Container>
  );
};

export default Input;
