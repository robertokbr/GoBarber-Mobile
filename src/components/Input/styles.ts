import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
`;

export const Input = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: regular;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
