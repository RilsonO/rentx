import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { Container, Header, Title, SubTitle, Footer, Form } from './styles';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const { navigate } = useNavigation();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória.'),
      });

      await schema.validate({ email, password });
      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  }

  function handleNewAccount() {
    navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            translucent
            backgroundColor={'transparent'}
          />
          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              value={password}
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
