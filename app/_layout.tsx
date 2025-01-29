import React from 'react';
import { Stack } from 'expo-router';
import HomescreenBar from '@/components/TopBar'; // 

const RootLayout = () => {
  return (
    <>
      <HomescreenBar />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cookingVideoScreen" options={{ headerShown: false }} />
        <Stack.Screen name="recipes" options={{ headerShown: false }} />
        <Stack.Screen name="shoppingListScreen" options={{ headerShown: false }} />
        <Stack.Screen name="cameraScreen" options={{ headerShown: false }} />
        <Stack.Screen name="recipeDetailScreen" options={{ headerShown: false }} />
        <Stack.Screen name="IngredientsListScreen" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
