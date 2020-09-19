import React from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as S from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
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
              <S.ForgotPasswordText>Esquci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <S.CreateAccountButton>
        <S.CreateAccountButtonText>Criar conta</S.CreateAccountButtonText>
        <Feather name="log-in" size={20} color="#ff9000" />
      </S.CreateAccountButton>
    </>
  );
};

export default SignIn;
