import React, { useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface HeaderProps {
  title?: string;
  subTitle?: string;
  withBackIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  children,
  title,
  subTitle,
  withBackIcon,
}) => {
  const navigation = useNavigation();

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <S.Container>
      {withBackIcon && (
        <Feather
          style={{ marginRight: 16 }}
          name="chevron-left"
          size={24}
          color="#999591"
          onPress={handleNavigateBack}
        />
      )}
      <S.HeaderTitle>
        {title && `${title}\n`}
        {subTitle && <S.UserName>{subTitle}</S.UserName>}
      </S.HeaderTitle>
      {children}
    </S.Container>
  );
};

export default Header;
