import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import BackButton from "@/components/BackButton";

export default function RecipesScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.recipesCollectionId
      );
      setRecipes(response.documents);
    } catch (error) {
      console.error("Failed to fetch recipes: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
        <BackButton />
        <Text className="text-base font-medium text-gray-600">
          {recipes.length} Suchergebnisse
        </Text>
      </View>

      {/* Recipes List */}
      <ScrollView className="px-4 mt-4">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-20" />
        ) : (
          recipes.map((recipe) => (
            <View key={recipe.$id} className="mb-6 pb-4 border-b border-gray-200">
              {/* Recipe Title */}
              <Text className="text-lg font-bold text-gray-800 mb-2">
                {recipe.title}
              </Text>

              {/* Recipe Image Placeholder */}
              <View className="w-full h-40 bg-gray-300 rounded-lg mb-2"></View>

              {/* Recipe Details */}
              <View className="flex-row items-center justify-between mt-2">
                {/* Prep Time */}
                <Text className="flex-row items-center text-gray-600">
                  ⏱️ {recipe.prep_time} min
                </Text>

                {/* Difficulty */}
                <View className="flex-row items-center">
                  {Array.from({ length: recipe.difficulty }).map((_, i) => (
                    <Text key={i} className="text-black">●</Text>
                  ))}
                  {Array.from({ length: 5 - recipe.difficulty }).map((_, i) => (
                    <Text key={i} className="text-gray-400">●</Text>
                  ))}
                </View>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  className="border border-gray-600 rounded-full px-4 py-1"
                  onPress={() => navigation.navigate("RecipeDetail", { id: recipe.$id })}
                >
                  <Text className="text-gray-800">Zum Rezept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border border-gray-600 rounded-full px-4 py-1"
                  onPress={() =>
                    navigation.navigate("recipeIngredientsScreen", { recipeId: recipe.$id })
                  }
                >
                  <Text className="text-gray-800">Zutaten</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
