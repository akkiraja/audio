import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Check, Send } from 'lucide-react-native';

// Mock data for recent and all friends
const RECENT_FRIENDS = [
  { id: '1', name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg', lastMessage: '2 minutes ago' },
  { id: '2', name: 'Mike Thompson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', lastMessage: '1 hour ago' },
  { id: '3', name: 'Jessica Smith', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', lastMessage: 'Yesterday' },
];

const ALL_FRIENDS = [
  { id: '4', name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', lastMessage: '3 days ago' },
  { id: '5', name: 'Emma Martinez', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', lastMessage: '1 week ago' },
  { id: '6', name: 'David Garcia', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', lastMessage: '2 weeks ago' },
  { id: '7', name: 'James Rodriguez', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', lastMessage: '3 weeks ago' },
];

const FriendItem = ({ friend, isSelected, onSelect }) => (
  <Pressable 
    style={({ pressed }) => [
      styles.friendItem,
      pressed && styles.friendItemPressed,
      isSelected && styles.friendItemSelected
    ]}
    onPress={() => onSelect(friend)}
  >
    <Image source={{ uri: friend.avatar }} style={styles.avatar} />
    <View style={styles.friendInfo}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <Text style={styles.lastMessage}>{friend.lastMessage}</Text>
    </View>
    {isSelected && (
      <View style={styles.checkmark}>
        <Check size={20} color="#FFFFFF" />
      </View>
    )}
  </Pressable>
);

export default function SendScreen() {
  const [selectedFriends, setSelectedFriends] = useState(new Set());

  const handleFriendSelect = (friend) => {
    setSelectedFriends(prev => {
      const newSet = new Set(prev);
      if (newSet.has(friend.id)) {
        newSet.delete(friend.id);
      } else {
        newSet.add(friend.id);
      }
      return newSet;
    });
  };

  const handleSend = () => {
    // Here you would handle sending the audio to all selected friends
    const selectedFriendsList = [...selectedFriends].map(id => 
      [...RECENT_FRIENDS, ...ALL_FRIENDS].find(f => f.id === id)
    );
    console.log('Sending audio to:', selectedFriendsList.map(f => f.name));
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
        <Text style={styles.title}>Send to</Text>
        {selectedFriends.size > 0 && (
          <Text style={styles.selectedCount}>
            {selectedFriends.size} selected
          </Text>
        )}
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666666" />
        <Text style={styles.searchPlaceholder}>Search friends...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent</Text>
        <FlatList
          data={RECENT_FRIENDS}
          renderItem={({ item }) => (
            <FriendItem 
              friend={item} 
              isSelected={selectedFriends.has(item.id)}
              onSelect={handleFriendSelect}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentList}
        />
      </View>

      <View style={[styles.section, styles.allFriendsSection]}>
        <Text style={styles.sectionTitle}>All Friends</Text>
        <FlatList
          data={ALL_FRIENDS}
          renderItem={({ item }) => (
            <FriendItem 
              friend={item}
              isSelected={selectedFriends.has(item.id)}
              onSelect={handleFriendSelect}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {selectedFriends.size > 0 && (
        <View style={styles.sendButtonContainer}>
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>
              Send to {selectedFriends.size} {selectedFriends.size === 1 ? 'friend' : 'friends'}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    flex: 1,
  },
  selectedCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#8A2BE2',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    margin: 20,
    padding: 12,
    borderRadius: 12,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    marginBottom: 16,
  },
  recentList: {
    paddingRight: 20,
  },
  allFriendsSection: {
    flex: 1,
    marginTop: 24,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  friendItemPressed: {
    opacity: 0.7,
  },
  friendItemSelected: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendInfo: {
    marginLeft: 12,
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 4,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  sendButton: {
    backgroundColor: '#8A2BE2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});