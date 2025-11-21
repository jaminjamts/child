import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export function IconButton({ icon, onPress, size = 40, style }: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { width: size, height: size }, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
