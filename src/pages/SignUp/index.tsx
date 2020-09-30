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

const SignUp: React.FC = () => {
  const navigation = useNavigation();
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
            <Input icon="user" name="name" placeholder="Name" />
            <Input icon="mail" name="email" placeholder="E-Mail" />
            <Input icon="lock" name="password" placeholder="Senha" />

            <Button
              onPress={() => {
                console.log(true);
              }}
            >
              Entrar
            </Button>
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
