import React from 'react';
import * as S from './styles';

interface HeaderProps {
  title: string;
  subTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ children, title, subTitle }) => {
  return (
    <S.Container>
      <S.HeaderTitle>
        {title}
        {'\n'}
        <S.UserName>{subTitle}</S.UserName>
      </S.HeaderTitle>
      {children}
    </S.Container>
  );
};

export default Header;
