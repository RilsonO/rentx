import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enable?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enable = true,
  onPress,
  loading = false,
}: Props) {
  const theme = useTheme();
  return (
    <Container
      enabled={enable}
      onPress={onPress}
      color={color ?? theme.colors.main}
      style={{ opacity: !enable || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
