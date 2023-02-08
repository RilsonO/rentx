import React from 'react';
import LottieView from 'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json';
import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        autoPlay
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode='contain'
        loop
      />
    </Container>
  );
}
