import { Text, StyleSheet } from 'react-native';

type BodyTextProps = {
  children: string;
  center?: boolean;
};

export function BodyText({ children, center = true }: BodyTextProps) {
  return (
    <Text style={[styles.title, center && styles.centered]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '300',
    color: '#1A3A73',
    marginBottom: 30,
  },
  centered: {
    textAlign: 'center',
  },
});
