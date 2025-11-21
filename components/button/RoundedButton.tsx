import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type ButtonColor = 'pink' | 'mint' | 'blue' | 'yellow' | 'darkBlue';

interface RoundedButtonProps {
  label: string;
  onPress: () => void;
  color?: ButtonColor;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  disabled?: boolean;
}

const colors: Record<ButtonColor, string> = {
  pink: '#E9A3A7',
  mint: '#A8D8C5',
  blue: '#CBE7E8',
  yellow: '#EEDC72',
  darkBlue: '#1A3A73',
};

export function RoundedButton({
  label,
  onPress,
  color = 'pink',
  size = 'medium',
  style,
  disabled = false,
}: RoundedButtonProps) {
  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        { backgroundColor: colors[color] },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}>
      <Text style={[styles.text, size === 'large' && styles.largeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    height: 44,
    paddingHorizontal: 16,
  },
  medium: {
    height: 54,
    paddingHorizontal: 24,
  },
  large: {
    height: 60,
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  largeText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.6,
  },
});
