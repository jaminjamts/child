import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { BackButton } from './BackButton';

interface FixedBackButtonProps {
  onPress: () => void;
  showBackgroundOnScroll?: boolean;
  scrollOffset?: number;
}

export function FixedBackButton({
  onPress,
  showBackgroundOnScroll = false,
  scrollOffset = 0,
}: FixedBackButtonProps) {
  const insets = useSafeAreaInsets();
  const showBackground = showBackgroundOnScroll && scrollOffset > 50;

  return (
    <View style={[styles.fixedBackButton, { top: insets.top + 8 }]}>
      {showBackground && (
        <BlurView
          intensity={10}
          tint="light"
          style={styles.backButtonBackground}
        />
      )}
      <View style={styles.backButtonWrapper}>
        <BackButton onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedBackButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  backButtonBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    height: 44,
  },
  backButtonWrapper: {
    position: 'relative',
    zIndex: 1,
  },
});
