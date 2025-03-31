import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useRouter, useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import CustomButtons from "@/components/CustomButtons";

type SearchParams = {
  id?: string;
};

export default function RecipeDetail() {
  const { id } = useGlobalSearchParams<SearchParams>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id) throw new Error("Recipe ID is missing");

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

  const handleStartCooking = async () => {
    try {
      if (id) {
        await AsyncStorage.setItem("lastRecipeId", id);
      }
      router.push(`/cookingInformationScreen?id=${id}`);
    } catch (error) {
      console.error("Error saving last recipe ID: ", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <BackButton />

      <Image 
        source={{uri: recipe.thumbnail}}
        className="rounded-xl object-center mt-4"
        style={{width: 360, height: 200, alignSelf: "center"}}
      />

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-800 text-lg font-semibold">⏱️ {recipe.prep_time} min</Text>
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</Text>
      <Text className="text-gray-600 mb-4">{recipe.description}</Text>

      <View className="flex-row justify-center p-4">
        <TouchableOpacity
          className="px-6 py-3 bg-green-800 rounded-full mr-4"
          onPress={() => router.push(`/IngredientsListScreen?id=${id}`)}
        >
          <Text className="text-white">
            Zutaten
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="px-6 py-3 bg-green-800 rounded-full"
          onPress={handleStartCooking}
        >
          <Text className="text-white">Kochvorgang starten</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
