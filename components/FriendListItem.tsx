import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Send } from 'lucide-react-native';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
}

interface FriendListItemProps {
  friend: Friend;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  return (
    <Pressable style={({ pressed }) => [
      styles.container,
      pressed && styles.pressed
    ]}>
      <Image source={{ uri: friend.avatar }} style={styles.avatar} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.lastActive}>
          {friend.lastActive === 'Now' ? (
            <View style={styles.activeNowContainer}>
              <View style={styles.activeNowDot} />
              <Text style={[styles.lastActive, styles.activeNow]}>Active now</Text>
            </View>
          ) : (
            friend.lastActive
          )}
        </Text>
      </View>
      
      <Pressable style={styles.sendButton}>
        <Send size={18} color="white" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  pressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 4,
  },
  lastActive: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeNowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  activeNow: {
    color: '#10B981',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendListItem;