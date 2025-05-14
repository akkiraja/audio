import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Play, RotateCcw, Send } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface AudioPreviewProps {
  duration: number;
  onDiscard: () => void;
  onSend?: () => void;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ duration, onDiscard }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const progress = useSharedValue(0);
  const isMounted = useRef(true);
  const isInitialized = useRef(false);

  useEffect(() => {
    isInitialized.current = true;
    return () => {
      isMounted.current = false;
      isInitialized.current = false;
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isPlaying && isInitialized.current) {
      interval = setInterval(() => {
        if (isMounted.current) {
          setCurrentTime((prev) => {
            if (prev >= duration) {
              setIsPlaying(false);
              return 0;
            }
            const next = prev + 1;
            progress.value = withTiming(next / duration, {
              duration: 1000,
              easing: Easing.linear,
            });
            return next;
          });
        }
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration, progress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
      progress.value = 0;
    }
    setIsPlaying(!isPlaying);
  };

  const handleSend = () => {
    if (isMounted.current) {
      router.push('/send');
    }
  };

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Audio Message</Text>
      
      <View style={styles.card}>
        <Text style={styles.timer}>{formatTime(currentTime)}</Text>
        
        <View style={styles.waveformContainer}>
          {Array.from({ length: 7 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.waveformBar,
                { height: 20 + Math.random() * 20 }
              ]}
            />
          ))}
        </View>

        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>

        <View style={styles.controls}>
          <Pressable style={styles.discardButton} onPress={onDiscard}>
            <RotateCcw size={24} color="#666666" />
            <Text style={styles.discardText}>Discard</Text>
          </Pressable>

          <Pressable style={styles.playButton} onPress={handlePlayPause}>
            <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
          </Pressable>

          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  timer: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 30,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 20,
  },
  waveformBar: {
    width: 4,
    backgroundColor: '#5B9BD5',
    borderRadius: 2,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E9ECEF',
    borderRadius: 2,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5B9BD5',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  discardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discardText: {
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#5B9BD5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});

export default AudioPreview;