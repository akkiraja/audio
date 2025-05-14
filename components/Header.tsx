import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="white" />
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  rightPlaceholder: {
    width: 24,
  },
});

export default Header;