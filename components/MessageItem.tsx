import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface Message {
  id: string;
  sender: string;
  timestamp: number;
  duration: number;
  isPlaying: boolean;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const progressValue = useSharedValue(0);
  const progressWidth = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });
  
  // Handle play/pause toggle
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Reset to start if we reached the end
      if (currentTime >= message.duration) {
        setCurrentTime(0);
        progressValue.value = 0;
      }
    }
  };
  
  // Effect for playback progress
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next > message.duration) {
            clearInterval(interval);
            setIsPlaying(false);
            return message.duration;
          }
          
          // Update the progress bar
          progressValue.value = withTiming(next / message.duration, {
            duration: 1000,
            easing: Easing.linear,
          });
          
          return next;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, message.duration, progressValue]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format the timestamp
  const formatTimestamp = (timestamp: number) => {
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    // Less than a minute
    if (diff < 60 * 1000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes}m ago`;
    }
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours}h ago`;
    }
    
    // More than a day
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}d ago`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageInfo}>
        <Text style={styles.sender}>{message.sender}</Text>
        <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
      </View>
      
      <View style={styles.audioContainer}>
        <Pressable style={styles.playButton} onPress={togglePlayback}>
          {isPlaying ? (
            <Pause size={20} color="white" />
          ) : (
            <Play size={20} color="white" />
          )}
        </Pressable>
        
        <View style={styles.progressContainer}>
          <View style={styles.waveformContainer}>
            {/* Simplified waveform visualization */}
            {Array.from({ length: 20 }).map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.waveformBar,
                  index % 2 === 0 ? { height: 12 } : { height: 8 },
                ]} 
              />
            ))}
          </View>
          
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, progressWidth]} />
          </View>
          
          <View style={styles.timeContainer}>
            <Text style={styles.currentTime}>
              {formatTime(isPlaying ? currentTime : 0)}
            </Text>
            <Text style={styles.duration}>
              {formatTime(message.duration)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sender: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressContainer: {
    flex: 1,
  },
  waveformContainer: {
    flexDirection: 'row',
    height: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  waveformBar: {
    width: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1.5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6EE7B7',
    borderRadius: 1.5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6EE7B7',
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default MessageItem;