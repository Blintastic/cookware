import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import VideoButton from "@/components/VideoButton";
import CameraButton from "@/components/CameraButton";
import { useRouter } from "expo-router";

import BottomBar from "@/components/BottomBar";

export default function Index() {
  const [lastRecipe, setLastRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLastRecipe = async () => {
      try {
        const lastRecipeId = await AsyncStorage.getItem("lastRecipeId");
        if (!lastRecipeId) return setLoading(false);

        const cachedRecipe = await AsyncStorage.getItem(`recipe_${lastRecipeId}`);
        if (cachedRecipe) {
          setLastRecipe(JSON.parse(cachedRecipe));
        } else {
          const response = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.recipesCollectionId,
            lastRecipeId
          );
          setLastRecipe(response);
          await AsyncStorage.setItem(`recipe_${lastRecipeId}`, JSON.stringify(response));
        }
      } catch (error) {
        console.error("Error fetching last recipe: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchRecipes = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.recipesCollectionId,
          []
        );
        setRecipes(response.documents.sort(() => Math.random() - 0.5).slice(0, 6));
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };

    fetchLastRecipe();
    fetchRecipes();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : lastRecipe ? (
            <View className="w-full bg-gray-200 rounded-2xl p-3 mb-6 items-start">
              <Text className="font-lolight text-base text-gray-600">Jetzt weitermachen...</Text>
              <Text className="text-xl font-bold text-left mt-1">{lastRecipe.title}</Text>
              <TouchableOpacity 
                className="bg-green-900 p-2 px-6 mt-3 shadow-sm rounded-full self-start"
                onPress={() => router.push(`/cookingInformationScreen?id=${lastRecipe.$id}`)}
              >
                <Text className="text-white font-lolight text-lg">Fortsetzen</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text className="text-gray-600 text-center">Kein Rezept gefunden</Text>
          )}

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-bold">Vorschläge für dich</Text>
            <TouchableOpacity onPress={() => router.push(`/recipes`)}>
              <Text className="underline">alle ansehen</Text>
            </TouchableOpacity>
          </View>

          {/* Two-column grid layout */}
          <View className="flex-row flex-wrap justify-between mb-36">
            {recipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.$id}
                className="w-[48%] mb-4 bg-gray-100 rounded-lg overflow-hidden shadow-sm"
                onPress={() => router.push(`/recipeDetailScreen?id=${recipe.$id}`)}
              >
                <Image
                  source={{ uri: recipe.image_url }}
                  className="w-full h-56 bg-gray-300"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-lg font-semibold">{recipe.title}</Text>
                  <Text className="text-gray-600">⏱️ {recipe.cook_time} min</Text>
                  <TouchableOpacity 
                    className="bg-green-900 px-3 py-2 rounded-full mt-2"
                    onPress={() => router.push(`/recipeDetailScreen?id=${recipe.$id}`)}
                  >
                      <Text className="text-white text-center font-lomedium text-xl">Zum Rezept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="bg-gray-300 px-3 py-2 rounded-full mt-2"
                    onPress={() => router.push(`/IngredientsListScreen?id=${recipe.$id}`)}
                  >
                      <Text className="text-black text-center font-lolight text-xl">Zutaten</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomBar />
        <CameraButton />
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-around">
          <ShoppingCartButton />
          <VideoButton />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
