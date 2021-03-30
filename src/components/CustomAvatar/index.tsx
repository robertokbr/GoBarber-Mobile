import React from 'react';
import * as S from './styles';

interface CustomAvatarProps {
  avatar: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ children, avatar }) => {
  return (
    <S.Container>
      <S.Avatar source={{ uri: avatar }} />
      {children}
    </S.Container>
  );
};

export default CustomAvatar;
