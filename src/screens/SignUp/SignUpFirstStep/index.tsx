import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpFirstStep() {
  const { goBack, navigate } = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleBack() {
    goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória.'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              value={name}
              onChangeText={setName}
              iconName='user'
              placeholder='Nome'
            />
            <Input
              value={email}
              onChangeText={setEmail}
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
            />
            <Input
              value={driverLicense}
              onChangeText={setDriverLicense}
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
            />
          </Form>
          <Button title='Próximo' onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
