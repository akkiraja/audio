import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface WaveformVisualizerProps {
  isActive: boolean;
  barCount?: number;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ 
  isActive, 
  barCount = 25
}) => {
  // Initialize all shared values at component mount using Array.from
  const animatedValues = Array.from({ length: barCount }, () => useSharedValue(0.1));
  
  useEffect(() => {
    if (isActive) {
      // Start random animations for each bar when active
      animatedValues.forEach((value) => {
        // Random duration between 500ms and 1000ms
        const duration = Math.random() * 500 + 500;
        
        // Animate with repeating random heights
        value.value = withRepeat(
          withSequence(
            withTiming(Math.random() * 0.8 + 0.2, { 
              duration,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(Math.random() * 0.8 + 0.2, { 
              duration,
              easing: Easing.inOut(Easing.ease),
            })
          ),
          -1, // Infinite repetition
          true // Reverse
        );
      });
    } else {
      // Reset all bars to small height when inactive
      animatedValues.forEach(value => {
        value.value = withTiming(0.1, { duration: 300 });
      });
    }
  }, [isActive]);
  
  // Create bar components with their animated styles
  const bars = animatedValues.map((value, index) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: `${value.value * 100}%`,
      };
    });
    
    return (
      <Animated.View 
        key={index}
        style={[
          styles.bar,
          animatedStyle,
          // Alternate between two colors for visual effect
          index % 2 === 0 ? styles.barPrimary : styles.barSecondary,
          // Add more gap in the middle to create a symmetric pattern
          index === Math.floor(barCount / 2) ? { marginHorizontal: 4 } : null,
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.waveform}>
        {bars}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    width: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  barPrimary: {
    backgroundColor: '#9F56FF',
  },
  barSecondary: {
    backgroundColor: '#6EE7B7',
  },
});

export default WaveformVisualizer;