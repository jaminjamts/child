import { Text, StyleSheet } from 'react-native';

interface TitleTextProps {
  children: string;
  center?: boolean;
}

export function TitleText({ children, center = true }: TitleTextProps) {
  return <Text style={[styles.title, center && styles.centered]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A3A73',
    marginBottom: 30,
  },
  centered: {
    textAlign: 'center',
  },
});
