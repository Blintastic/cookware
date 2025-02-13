import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
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
        if (!lastRecipeId) {
          setLoading(false);
          return;
        }
        const response = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.recipesCollectionId,
          lastRecipeId
        );
        setLastRecipe(response);
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
          appwriteConfig.recipesCollectionId
        );
        setRecipes(response.documents.sort(() => Math.random() - 0.5));
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
          <Text className="text-2xl font-bold mb-3">Jetzt weitermachen...</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : lastRecipe ? (
            <View className="w-full bg-gray-200 rounded-lg p-4 mb-6 shadow-md">
              <TouchableOpacity onPress={() => router.push(`/cookingInformationScreen?id=${lastRecipe.$id}`)}>
                <View className="w-full h-32 bg-gray-300 rounded-lg" />
                <Text className="text-xl font-semibold mt-2">{lastRecipe.title}</Text>
                <TouchableOpacity 
                  className="border-spacing-3 bg-gray-300 rounded-lg p-4 shadow-sm"
                  onPress={() => router.push(`/cookingInformationScreen?id=${lastRecipe.$id}`)}
                  >
                    <Text>fortsetzen</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ) : (
            <Text className="text-gray-600">Kein Rezept gefunden</Text>
          )}

          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold mb-2">Rezeptvorschläge</Text>
            <TouchableOpacity onPress={() => router.push(`/recipes`)}>
              <Text>Alle anzeigen...</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2 px-2 pb-52">
            {recipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.$id}
                className="mr-4 bg-gray-100 rounded-lg p-4 w-60 shadow-sm"
                onPress={() => router.push(`/recipeDetailScreen?id=${recipe.$id}`)}
              >
                <View className="w-full h-24 bg-gray-300 rounded-lg" />
                <Text className="text-lg font-semibold mt-2">{recipe.title}</Text>
                
                <Text className="flex-row items-center text-gray-600">
                  ⏱️ {recipe.cook_time} min
                </Text>

                <View className="flex-row justify-between items-center mt-4">
                  <TouchableOpacity 
                    className="border-spacing-3 bg-gray-300 rounded-lg p-4 shadow-sm"
                    onPress={() => router.push(`/IngredientsListScreen?id=${recipe.$id}`)}
                    >
                      <Text className="font-lomedium text-2xl">Zutaten</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    className="border-spacing-3 bg-gray-300 rounded-lg p-4 shadow-sm"
                    onPress={() => router.push(`/recipeDetailScreen?id=${recipe.$id}`)}
                    >
                      <Text className="font-lomedium text-2xl">Rezept</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
        <CameraButton />
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-around">
          <ShoppingCartButton />
          <VideoButton />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
