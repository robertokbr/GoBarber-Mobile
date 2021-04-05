import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? '32px' : '16px'};
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-family: medium;
  margin: 12px 0;
`;

export const BackButton = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
  margin-top: 40px;
`;

export const AvatarButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.View`
  width: 100%;
  align-items: flex-start;
`;
