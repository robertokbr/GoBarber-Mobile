import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  useFonts,
} from '@expo-google-fonts/roboto-slab';
import { AppLoading } from 'expo';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    light: RobotoSlab_300Light,
    regular: RobotoSlab_400Regular,
    medium: RobotoSlab_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <AppProvider>
        <View style={{ backgroundColor: '#312e38', flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
