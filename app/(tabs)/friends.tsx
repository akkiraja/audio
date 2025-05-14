import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import Header from '@/components/Header';
import FriendListItem from '@/components/FriendListItem';

// Mock data for friends list
const FRIENDS = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', lastActive: 'Now' },
  { id: '2', name: 'Jessica Smith', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', lastActive: '5m ago' },
  { id: '3', name: 'Mike Thompson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', lastActive: '1h ago' },
  { id: '4', name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg', lastActive: '2h ago' },
  { id: '5', name: 'David Garcia', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', lastActive: 'Yesterday' },
  { id: '6', name: 'Emma Martinez', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', lastActive: 'Yesterday' },
  { id: '7', name: 'James Rodriguez', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', lastActive: '2d ago' },
  { id: '8', name: 'Olivia Lopez', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', lastActive: '1w ago' },
];

export default function FriendsScreen() {
  return (
    <LinearGradient
      colors={['#2A0845', '#6441A5']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Header title="Friends" />
        
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Search size={20} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search friends..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
          
          <FlatList
            data={FRIENDS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FriendListItem friend={item} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginVertical: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  listContent: {
    paddingBottom: 16,
  },
});