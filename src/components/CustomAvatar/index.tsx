import React, { useMemo } from 'react';
import * as S from './styles';

interface CustomAvatarProps {
  avatar: string;
  userName: string;
  imageStyle?: Object;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  avatar,
  imageStyle,
  userName,
}) => {
  const formattedUserName = useMemo(
    () => userName.trim().split('')[0].toUpperCase(),
    [userName],
  );

  return (
    <S.Container>
      {avatar ? (
        <S.Avatar style={imageStyle} source={{ uri: avatar }} />
      ) : (
        <S.UserNameContainer style={imageStyle}>
          <S.UserName>{formattedUserName}</S.UserName>
        </S.UserNameContainer>
      )}
    </S.Container>
  );
};

export default CustomAvatar;
