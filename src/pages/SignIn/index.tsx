/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  View,
  ScrollView,
  TextInputProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as S from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef(null);

  const handleNavigate = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleSubmit = useCallback(async (data: Object) => {
    console.log(data);
  }, []);

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
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                icon="mail"
                name="email"
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                icon="lock"
                name="password"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
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
