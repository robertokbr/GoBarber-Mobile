/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import * as S from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import CustomAvatar from '../../components/CustomAvatar';
import { useAuth } from '../../hooks/auth';
import IUser from '../../models/IUser';

interface ProfileUpdateData {
  name: string;
  email: string;
  old_pasword: string;
  pasword: string;
  pasword_confirmation: string;
}

type ImagePickerReturn = {
  cancelled: boolean;
  type: 'image' | 'video';
  uri: string;
  width: number;
  height: number;
  base64: string;
};

const Profile: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef(null);
  const nameInputref = useRef(null);
  const passwordInputRef = useRef(null);
  const oldPasswordInputRef = useRef(null);
  const passwordConfirmationInputRef = useRef(null);

  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ProfileUpdateData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .required('O E-mail é obrigatório')
            .email('Digite um E-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().min(6, 'A senha deve ter no minimo 6 digitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().min(6, 'A senha deve ter no minimo 6 digitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { data: updatedUser } = await api.put<IUser>('/profile', data);

        updateUser(updatedUser);

        navigate('Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro na atualização',
          'Ocorreu um erro na atualização do perfil!',
        );
      }
    },
    [navigate, updateUser],
  );

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUpdateAvatar = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Oooops!',
        'Precisamos da sua permissão para atualizar seu avatar',
      );
    }

    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    })) as ImagePickerReturn;

    if (!result.cancelled) {
      try {
        setLoading(true);

        const data = new FormData();
        const file: any = {
          type: 'image/jpeg',
          name: `${user.name}.jpg`,
          uri: result.uri,
        };

        data.append('avatar', file);

        api
          .patch<IUser>('users/avatar', data)
          .then(response => updateUser(response.data));
      } catch (err) {
        Alert.alert(
          'Oooops!',
          'Falha na atualização, tente novamente mais tarde',
        );
      } finally {
        setLoading(false);
      }
    }
  }, [updateUser, user.name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <S.Container>
          <S.BackButton onPress={handleBack}>
            <Feather name="chevron-left" size={24} color="#999591" />
          </S.BackButton>
          <S.AvatarButton onPress={handleUpdateAvatar}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#ff9000"
                style={{
                  height: 128,
                  width: 128,
                }}
              />
            ) : (
              <CustomAvatar
                imageStyle={{
                  height: 128,
                  width: 128,
                  borderRadius: 64,
                }}
                userName={user.name}
                avatar={user.avatar_url}
              />
            )}
          </S.AvatarButton>
          <S.TitleContainer>
            <S.Title>Meu Perfil</S.Title>
          </S.TitleContainer>
          <Form initialData={user} onSubmit={handleSubmit} ref={formRef}>
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
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordInputRef.current.focus();
              }}
            />
            <Input
              containerStyle={{
                marginTop: 8,
              }}
              ref={oldPasswordInputRef}
              icon="lock"
              name="old_password"
              placeholder="Senha atual"
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              icon="lock"
              name="password"
              placeholder="Nova Senha"
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current.focus();
              }}
            />
            <Input
              ref={passwordConfirmationInputRef}
              icon="lock"
              name="password_confirmation"
              placeholder="Confirmar Senha"
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
              Confirmar mudanças
            </Button>
          </Form>
        </S.Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
