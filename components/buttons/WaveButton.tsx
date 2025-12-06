import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface WaveButtonProps {
  label: string;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function WaveButton({
  label,
  onPress,
  size = 250,
  color = '#3478F6',
  style,
}: WaveButtonProps) {
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createLoop = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 2200,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createLoop(waveAnim1, 0);
    createLoop(waveAnim2, 1100); // offset second wave for overlapping
  }, [waveAnim1, waveAnim2]);

  const waveStyle = (anim: Animated.Value) => ({
    position: 'absolute' as const,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] }),
    transform: [
      {
        scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.5] }),
      },
    ],
  });

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Animated.View style={waveStyle(waveAnim1)} />
      <Animated.View style={waveStyle(waveAnim2)} />
      <View
        style={[
          styles.center,
          {
            width: size * 0.75,
            height: size * 0.75,
            borderRadius: (size * 0.75) / 2,
            backgroundColor: color,
          },
        ]}
      >
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
