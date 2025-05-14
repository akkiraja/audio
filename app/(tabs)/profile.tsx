import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Moon, Settings, LogOut, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/auth';

export default function ProfileScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.replace('/auth');
    }
  };

  return (
    <LinearGradient
      colors={['#2A0845', '#6441A5']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Header title="Profile" />
        
        <View style={styles.content}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.email?.split('@')[0] || 'User'}</Text>
              <Text style={styles.profileUsername}>@{user?.email?.split('@')[0]?.toLowerCase() || 'user'}</Text>
            </View>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          </View>
          
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Bell size={22} color="white" />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#767577', true: '#8A2BE2' }}
                thumbColor={notifications ? '#FFFFFF' : '#F4F3F4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Moon size={22} color="white" />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: '#8A2BE2' }}
                thumbColor={darkMode ? '#FFFFFF' : '#F4F3F4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
            
            <Pressable style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Settings size={22} color="white" />
              </View>
              <Text style={styles.settingText}>App Settings</Text>
              <ChevronRight size={22} color="rgba(255, 255, 255, 0.7)" />
            </Pressable>
            
            <Pressable 
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <View style={[styles.settingIconContainer, styles.logoutIcon]}>
                <LogOut size={22} color="#E53E3E" />
              </View>
              <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
            </Pressable>
          </View>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#8A2BE2',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  profileUsername: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  settingsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'white',
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  logoutIcon: {
    backgroundColor: 'rgba(229, 62, 62, 0.15)',
  },
  logoutText: {
    color: '#E53E3E',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});