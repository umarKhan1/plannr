import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/features/splash/SplashScreen';
import AppNavigator from './src/core/navigation/AppNavigator';
import { useUserStore } from './src/core/store/useUserStore';

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const initializeAuth = useUserStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isShowSplash) {
    return <SplashScreen onFinish={() => setIsShowSplash(false)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({});
