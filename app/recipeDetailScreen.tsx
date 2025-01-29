import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useRouter, useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import CustomButtons from "@/components/CustomButtons";

type SearchParams = {
  id?: string; // Define `id` as optional since it may not always be present
};

export default function RecipeDetail() {
  const { id } = useGlobalSearchParams<SearchParams>(); // Explicitly type the search params
  const [recipe, setRecipe] = useState<any>(null); // Update types as needed
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRecipe = async () => {
    try {
      if (!id) {
        throw new Error("Recipe ID is missing");
      }
      const response = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.recipesCollectionId,
        id
      );
      setRecipe(response);
    } catch (error) {
      console.error("Failed to fetch recipe: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">Rezept nicht gefunden</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-blue-600">Zurück</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
        <BackButton />
        <Text className="text-base font-medium text-gray-600">{recipe.title}</Text>
      </View>

      {/* Recipe Details */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">{recipe.title}</Text>
        <Text className="text-gray-600 mb-4">{recipe.description}</Text>
        <Text className="text-gray-800 mb-2">⏱️ Vorbereitung: {recipe.prep_time} min</Text>
        <Text className="text-gray-800 mb-2">🍳 Kochen: {recipe.cook_time} min</Text>
        <Text className="text-gray-800 mb-2">🍴 Portionen: {recipe.servings}</Text>
        <Text className="text-gray-800 font-bold mt-4">👨‍🍳 Anleitung:</Text>
        <Text className="text-gray-600">{recipe.making}</Text>
      </View>

      <View className='flex-row items-center justify-between ml-4 mr-4 mt-7'>
        <CustomButtons
          title="Zutaten Anzeigen"
          handlePress={() => router.push(`/IngredientsListScreen?id=${id}`)} // Navigate to IngredientsListScreen
          buttonStyle={{ backgroundColor: 'grey', paddingHorizontal: 8 }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
          disabled={false}
        />

        <CustomButtons
          title="Kochvorgang starten"
          handlePress={() => router.push(`/IngredientsListScreen?id=${id}`)} // Navigate to IngredientsListScreen
          buttonStyle={{ backgroundColor: 'grey', paddingHorizontal: 8 }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
          disabled={false}
        />
      </View>
    </ScrollView>
  );
}
