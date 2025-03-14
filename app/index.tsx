import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import VideoButton from "@/components/VideoButton";
import CameraButton from "@/components/CameraButton";
import { useRouter } from "expo-router";

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
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ flexGrow: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : lastRecipe ? (
          <View className="w-full bg-gray-200 rounded-2xl p-4 mb-6 flex-row items-center">
            <View className="flex-1">
              <Text className="font-light text-lg italic">Jetzt weitermachen...</Text>
              <Text className="text-2xl font-bold">{lastRecipe.title}</Text>
              <TouchableOpacity 
                className="bg-green-900 p-2 px-6 mt-3 shadow-sm rounded-3xl"
                onPress={() => router.push(`/cookingInformationScreen?id=${lastRecipe.$id}`)}
              >
                <Text className="text-white font-light text-xl text-center">Fortsetzen</Text>
              </TouchableOpacity>
            </View>
            <View className="w-24 h-24 bg-gray-300 rounded-lg" />
          </View>
        ) : (
          <Text className="text-gray-600 text-center">Kein Rezept gefunden</Text>
        )}

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold">Vorschläge für dich</Text>
          <TouchableOpacity onPress={() => router.push(`/recipes`)}>
            <Text className="text-green-900 underline">alle ansehen</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {recipes.map((recipe) => (
            <View key={recipe.$id} className="w-40 mr-4 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              <View className="w-full h-32 bg-gray-300" />
              <View className="p-3">
                <Text className="text-lg font-semibold">{recipe.title}</Text>
                <View className="flex-row justify-between mt-2">
                  <TouchableOpacity 
                    className="bg-green-900 px-3 py-1 rounded-xl"
                    onPress={() => router.push(`/recipeDetailScreen?id=${recipe.$id}`)}
                  >
                    <Text className="text-white text-sm">Zum Rezept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-300 px-3 py-1 rounded-xl">
                    <Text className="text-sm">Zutaten</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <CameraButton />
      <View className="absolute bottom-4 left-0 right-0 flex-row justify-around">
        <ShoppingCartButton />
        <VideoButton />
      </View>
    </View>
  );
}
