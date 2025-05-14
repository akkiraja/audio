import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation
} from 'react-native-reanimated';
import { Mic } from 'lucide-react-native';
import RecordButton from '@/components/RecordButton';
import AudioPreview from '@/components/AudioPreview';

export default function RecordScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const recordingIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording and show preview
      setIsRecording(false);
      setShowPreview(true);
      cancelAnimation(scale);
      cancelAnimation(opacity);
      scale.value = withSpring(1);
      opacity.value = withSpring(1);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingDuration(0);
      setShowPreview(false);
      
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
      
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.7, { duration: 500 })
        ),
        -1,
        true
      );
    }
  };

  const handleDiscard = () => {
    setShowPreview(false);
    setRecordingDuration(0);
  };

  const handleSend = () => {
    // Here you would implement the logic to send the recording
    setShowPreview(false);
    setRecordingDuration(0);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const webWaveformStyle = Platform.select({
    web: {
      animation: isRecording ? 'wave 1s ease-in-out infinite' : 'none',
    },
    default: {},
  });

  if (showPreview) {
    return (
      <SafeAreaView style={styles.container}>
        <AudioPreview
          duration={recordingDuration}
          onDiscard={handleDiscard}
          onSend={handleSend}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Record Audio</Text>
        
        <View style={styles.mainContent}>
          <Text style={styles.instructions}>
            {isRecording ? 'Recording...' : 'Tap the button to start recording'}
          </Text>
          
          <Text style={styles.timer}>
            {formatDuration(recordingDuration)}
          </Text>

          {isRecording && (
            <View style={styles.waveformContainer}>
              {Array.from({ length: 7 }).map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.waveformBar,
                    Platform.OS === 'web' ? webWaveformStyle : recordingIndicatorStyle,
                    { height: 20 + Math.random() * 30 }
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <RecordButton
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 40,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 40,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 4,
  },
  waveformBar: {
    width: 4,
    backgroundColor: '#8A2BE2',
    borderRadius: 2,
  },
  buttonContainer: {
    marginBottom: 100,
  },
  '@keyframes wave': {
    '0%': {
      transform: 'scaleY(0.5)',
    },
    '50%': {
      transform: 'scaleY(1)',
    },
    '100%': {
      transform: 'scaleY(0.5)',
    },
  },
});