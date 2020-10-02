import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import * as S from './styles';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef(null);
  const nameInputref = useRef(null);
  const passwordInputRef = useRef(null);

  interface SingUpFormData {
    name: string;
    email: string;
    pasword: string;
  }

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Pelo menos 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [navigation],
  );

  const handleNavigate = useCallback(() => {
    navigation.goBack();
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
              <S.Title>Crie sua conta</S.Title>
            </View>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Input
                ref={nameInputref}
                icon="user"
                name="name"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                icon="mail"
                name="email"
                placeholder="E-Mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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
                textContentType="newPassword"
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
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <S.BackToSignIn onPress={handleNavigate}>
        <Feather name="arrow-left" size={20} color="#fff" />
        <S.BackToSignInText>Voltar para Logon</S.BackToSignInText>
      </S.BackToSignIn>
    </>
  );
};

export default SignUp;
