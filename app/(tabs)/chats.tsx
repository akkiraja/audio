import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Pause } from 'lucide-react-native';
import Header from '@/components/Header';
import MessageItem from '@/components/MessageItem';

// Mock data for chat messages
const MESSAGES = [
  { id: '1', sender: 'Alex', timestamp: new Date().getTime() - 1000 * 60 * 5, duration: 12, isPlaying: false },
  { id: '2', sender: 'Jessica', timestamp: new Date().getTime() - 1000 * 60 * 25, duration: 8, isPlaying: false },
  { id: '3', sender: 'Mike', timestamp: new Date().getTime() - 1000 * 60 * 60, duration: 15, isPlaying: false },
  { id: '4', sender: 'Sarah', timestamp: new Date().getTime() - 1000 * 60 * 60 * 2, duration: 20, isPlaying: false },
  { id: '5', sender: 'David', timestamp: new Date().getTime() - 1000 * 60 * 60 * 24, duration: 5, isPlaying: false },
];

export default function ChatScreen() {
  return (
    <LinearGradient
      colors={['#2A0845', '#6441A5']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Header title="Chats" />
        
        <View style={styles.content}>
          {MESSAGES.length > 0 ? (
            <FlatList
              data={MESSAGES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MessageItem message={item} />
              )}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySubtext}>
                Record and send an audio message to start chatting
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
});