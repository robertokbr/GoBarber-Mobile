import React from 'react';
import * as S from './styles';

interface CustomAvatarProps {
  avatar: string;
  imageStyle?: Object;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  children,
  avatar,
  imageStyle,
}) => {
  return (
    <S.Container>
      <S.Avatar style={imageStyle} source={{ uri: avatar }} />
      {children}
    </S.Container>
  );
};

export default CustomAvatar;
