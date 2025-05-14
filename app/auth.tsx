import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    // In a real app, you would handle authentication here
    // For now, we'll just navigate to the dashboard
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#2A0845', '#6441A5']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg' }}
            style={styles.headerImage}
          />
          <Text style={styles.title}>VoiceConnect</Text>
          <Text style={styles.subtitle}>Share moments through voice</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Mail size={20} color="rgba(255, 255, 255, 0.7)" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="rgba(255, 255, 255, 0.7)" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Lock size={20} color="rgba(255, 255, 255, 0.7)" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry
              />
            </View>
          )}

          {isLogin && (
            <Link href="/forgot-password" style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Link>
          )}

          <Pressable style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Text>
            <ArrowRight size={20} color="white" />
          </Pressable>

          <Pressable
            onPress={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#8A2BE2',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  button: {
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  switchButton: {
    alignItems: 'center',
  },
  switchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});