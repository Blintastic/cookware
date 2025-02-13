import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { DataContext } from "@/lib/DataProvider";
import BackButton from "@/components/BackButton";
import { useRouter, useGlobalSearchParams } from "expo-router";

export default function RecipesScreen() {
  const { recipes, allRecipes, loading, fetchRecipes, filterRecipes } =
    useContext(DataContext);
  const router = useRouter();
  const { query } = useGlobalSearchParams(); // Get the query parameter from the URL

  useEffect(() => {
    if (query) {
      filterRecipes(query); // Filter recipes based on the query
    } else {
      fetchRecipes(); // Fetch all recipes if no query
    }
  }, [query]);

  return (
    <View className="flex-1 bg-white">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
        <BackButton />
        <Text className="text-base font-medium text-gray-600">
          {recipes.length} Filtered Results / {allRecipes.length} Total Recipes
        </Text>
      </View>

      {/* Recipes List */}
      <ScrollView className="px-4 mt-4">
        <Text className="font-bold text-gray-800 mt-4 text-3xl">
          Gefundene Rezepte
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-20" />
        ) : (
          <>
            {/* Filtered Recipes */}
            {recipes.map((recipe) => (
              <View
                key={recipe.$id}
                className="mb-6 pb-4 border-b border-gray-200"
              >
                <Text className="text-lg font-bold text-gray-800 mb-2">
                  {recipe.title}
                </Text>
                <View className="w-full h-40 bg-gray-300 rounded-lg mb-2"></View>
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="flex-row items-center text-gray-600">
                    ⏱️ {recipe.prep_time} min
                  </Text>
                </View>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    className="border border-gray-600 rounded-full px-4 py-1"
                    onPress={() =>
                      router.push({
                        pathname: "/recipeDetailScreen",
                        params: { id: recipe.$id },
                      })
                    }
                  >
                    <Text className="text-gray-800">Zum Rezept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Divider */}
            <Text className="font-bold text-gray-800 mt-4 text-3xl">
              Alle Rezepte
            </Text>

            {/* All Recipes */}
            {allRecipes.map((recipe) => (
              <View
                key={recipe.$id}
                className="mb-6 pb-4 border-b border-gray-200"
              >
                <Text className="text-lg font-bold text-gray-800 mb-2">
                  {recipe.title}
                </Text>
                <View className="w-full h-40 bg-gray-300 rounded-lg mb-2"></View>
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="flex-row items-center text-gray-600">
                    ⏱️ {recipe.prep_time} min
                  </Text>
                </View>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    className="border border-gray-600 rounded-full px-4 py-1"
                    onPress={() =>
                      router.push({
                        pathname: "/recipeDetailScreen",
                        params: { id: recipe.$id },
                      })
                    }
                  >
                    <Text className="text-gray-800">Zum Rezept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}