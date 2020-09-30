import React, { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigate = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <S.Container>
            <Image source={logoImg} />
            <View>
              <S.Title>Faça seu Logon</S.Title>
            </View>
            <Input icon="mail" name="email" placeholder="E-mail" />
            <Input icon="lock" name="password" placeholder="Senha" />
            <Button
              onPress={() => {
                console.log(true);
              }}
            >
              Entrar
            </Button>
            <S.ForgotPassword
              onPress={() => {
                console.log(true);
              }}
            >
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <S.CreateAccountButton onPress={handleNavigate}>
        <Feather name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountButtonText>Criar conta</S.CreateAccountButtonText>
      </S.CreateAccountButton>
    </>
  );
};

export default SignIn;
