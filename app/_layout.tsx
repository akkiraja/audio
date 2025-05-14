import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { View, Text } from 'react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="send" options={{ presentation: 'modal' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </AuthProvider>
    </View>
  );
}