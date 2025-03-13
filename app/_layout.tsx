import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import HomescreenBar from '@/components/TopBar'; // Import the HomescreenBar
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';

import { ShoppingListProvider } from './manager/ShoppingListContext';
import { DataProvider } from '../lib/DataProvider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Lorimer-BlackItalic": require("../assets/fonts/Lorimer_No2_CndTrial_Black_Italic-BF6736aace3a3f3.otf"),
    "Lorimer-Black": require("../assets/fonts/Lorimer_No2_CndTrial_Black-BF6736aace54a98.otf"),
    "Lorimer-BoldItalic": require("../assets/fonts/Lorimer_No2_CndTrial_Bold_Italic-BF6736aace21fbe.otf"),
    "Lorimer-Bold": require("../assets/fonts/Lorimer_No2_CndTrial_Bold-BF6736aacde4b88.otf"),
    "Lorimer-Light-Italic": require("../assets/fonts/Lorimer_No2_CndTrial_Light_Italic-BF6736aacd20a09.otf"),
    "Lorimer-Light": require("../assets/fonts/Lorimer_No2_CndTrial_Light-BF6736aacd4991d.otf"),
    "Lorimer-MediumItalic": require("../assets/fonts/Lorimer_No2_CndTrial_Medium_Italic-BF6736aacc148d3.otf"),
    "Lorimer-Medium": require("../assets/fonts/Lorimer_No2_CndTrial_Medium-BF6736aacc548fd.otf"),
    "Lorimer-SemiboldItalic": require("../assets/fonts/Lorimer_No2_CndTrial_Semibold_Italic-BF6736aacc21989.otf"),
    "Lorimer-Semibold": require("../assets/fonts/Lorimer_No2_CndTrial_Semibold-BF6736aacc53761.otf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <HomescreenBar />
      <DataProvider>
        <ShoppingListProvider>
          <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="index" />
              <Stack.Screen name="cookingVideoScreen" />
              <Stack.Screen name="recipes" />
              <Stack.Screen name="shoppingListScreen"  />
              <Stack.Screen name="cameraScreen" options={{ gestureEnabled: true }} /> 
              <Stack.Screen name="recipeDetailScreen" />
              <Stack.Screen name="IngredientsListScreen" />
              <Stack.Screen name="cookingInformationScreen" />
              <Stack.Screen name="generalVideoOverviewScreen" />
              <Stack.Screen name="manager/videoManager" />
              <Stack.Screen name="timerScreen" />
              <Stack.Screen name="videoOverviewScreen" />
            </Stack>
        </ShoppingListProvider>   
      </DataProvider>
      <Toast />

      <StatusBar backgroundColor="black" />
    </>
  );
};

export default RootLayout;