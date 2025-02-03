import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import HomescreenBar from '@/components/TopBar'; // Import the HomescreenBar
import { useFonts } from 'expo-font';

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
      {/* Render the HomescreenBar */}
      <HomescreenBar />

      {/* Render the Stack for navigation */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cookingVideoScreen" options={{ headerShown: false }} />
        <Stack.Screen name="recipes" options={{ headerShown: false }} />
        <Stack.Screen name="shoppingListScreen" options={{ headerShown: false }} />
        <Stack.Screen name="cameraScreen" options={{ headerShown: false }} />
        <Stack.Screen name="recipeDetailScreen" options={{ headerShown: false }} />
        <Stack.Screen name="IngredientsListScreen" options={{ headerShown: false }} />
        <Stack.Screen name="cookingInformationScreen" options={{ headerShown: false }} />
        <Stack.Screen name="videoOverviewScreen" options={{ headerShown: false }} />
        <Stack.Screen name="timerScreen" options={{ headerShown: false }} />
        <Stack.Screen name="videoScreen" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;