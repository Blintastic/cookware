import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";

type SearchParams = {
  id?: string; // Define `id` as optional since it may not always be present
};

export default function IngredientsListScreen() {
  const { id } = useGlobalSearchParams<SearchParams>();
  const [recipe, setRecipe] = useState<any>(null); // Update types as needed
  const [loading, setLoading] = useState(true);

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

  if (!recipe || !recipe.ingredients) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">Zutaten nicht gefunden</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <BackButton />
      <View className="mt-5">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Zutaten für {recipe.title}</Text>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <Text key={index} className="text-gray-600 mb-2 text-lg"> {/* Increase font size here */}
            • {ingredient} {/* Add bullet point */}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
