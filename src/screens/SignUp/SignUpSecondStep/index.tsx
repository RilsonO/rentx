import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { api } from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const theme = useTheme();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { user } = route.params as Params;

  function handleBack() {
    goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais.');
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigate('Confirmation', {
          nextScreenRoute: 'SignIn',
          title: 'Conta Criada!',
          message: 'Agora é só fazer login\ne aproveitar.',
        });
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar.');
      });
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>

          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              iconName='lock'
              placeholder='Senha'
            />
            <PasswordInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              iconName='lock'
              placeholder='Repetir Senha'
            />
          </Form>
          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
