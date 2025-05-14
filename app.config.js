export default {
  expo: {
    name: "bolt-expo-nativewind",
    slug: "bolt-expo-nativewind",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png"
    },
    plugins: ["expo-router", "expo-font", "expo-web-browser"],
    experiments: {
      typedRoutes: true
    },
    extra: {
      firebaseApiKey: "AIzaSyC3EdBGpnFMc3oFwzm2ke0jRfjq8iCYKLQ",
      firebaseAuthDomain: "tictactoe-de60e.firebaseapp.com",
      firebaseProjectId: "tictactoe-de60e",
      firebaseStorageBucket: "tictactoe-de60e.firebasestorage.app",
      firebaseMessagingSenderId: "937325040449",
      firebaseAppId: "1:937325040449:web:1bd6070de895ef050fc7c0",
      elevenLabsApiKey: "sk_63ac05f1dbe0ac1d23ec5d4721875415b0d5d19abf9d13e2"
    }
  }
};