import React from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable,
  Platform,
} from 'react-native';
import { Mic, Square } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface RecordButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({ 
  isRecording, 
  onToggleRecording,
  disabled = false,
}) => {
  // Animation values
  const scale = useSharedValue(1);
  const innerScale = useSharedValue(1);
  
  // Animated styles for the button
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const innerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: innerScale.value }],
    };
  });
  
  // Handle press to toggle recording
  const handlePress = () => {
    if (disabled) return;
    
    // Animate button press
    scale.value = withSpring(isRecording ? 1 : 1.1);
    innerScale.value = withSpring(isRecording ? 1 : 0.9);
    onToggleRecording();
  };

  // Web-specific rotation animation
  const rotationStyle = Platform.select({
    web: isRecording ? {
      animation: 'spin 3s linear infinite',
    } : {},
    default: {},
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => pressed ? styles.buttonPressed : null}
    >
      <Animated.View style={[styles.buttonOuter, animatedStyle]}>
        <View style={[styles.rotatingRing, rotationStyle]}>
          <Animated.View 
            style={[
              styles.buttonInner, 
              innerAnimatedStyle,
              isRecording && styles.buttonRecording
            ]}
          >
            {isRecording ? (
              <Square size={24} color="white" />
            ) : (
              <Mic size={24} color="white" />
            )}
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  rotatingRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#9F56FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRecording: {
    backgroundColor: '#FF5E5E',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
});

export default RecordButton;