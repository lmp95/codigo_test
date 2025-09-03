import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function LoadingCard() {
  const progress = useSharedValue(0);

  progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [-width, width]),
        },
      ],
    };
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '50%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    transform: [{ rotate: '20deg' }],
  },
});
