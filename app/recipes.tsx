import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { DataContext } from "@/lib/DataProvider";
import BackButton from "@/components/BackButton";
import { useRouter, useGlobalSearchParams } from "expo-router";

export default function RecipesScreen() {
  const { recipes, allRecipes, loading, fetchRecipes, filterRecipes } =
    useContext(DataContext);
  const router = useRouter();
  const { query } = useGlobalSearchParams();

  useEffect(() => {
    if (query) {
      filterRecipes(query);
    } else {
      fetchRecipes();
    }
  }, [query]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300">
        <BackButton />
        <Text className="text-base font-medium text-gray-600">
          {recipes.length} gefilterte Rezepte / {allRecipes.length} Alle Rezepte
        </Text>
      </View>

      <ScrollView className="px-4 mt-4">
        {loading ? (
          <ActivityIndicator size="large" color="#0000" className="mt-20" />
        ) : (
          <>
            {recipes.map((recipe) => (
              <View
                key={recipe.$id}
                className="flex-row bg-white shadow-lg rounded-2xl p-4 mb-4 items-center"
              >
                <Image
                  source={{ uri: recipe.thumbnail_transparent }}
                  className="w-36 h-36 rounded-lg"
                  resizeMode="cover"
                />

                <View className="flex-1 ml-6">
                  <Text className="text-base font-bold text-gray-800">
                    {recipe.title}
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-gray-600">
                      ⏱️ {Number(recipe.prep_time) + Number(recipe.cook_time)} min
                    </Text>
                  </View>
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      className="rounded-full px-4 py-2 bg-green-800"
                      onPress={() =>
                        router.push({
                          pathname: "/recipeDetailScreen",
                          params: { id: recipe.$id },
                        })
                      }
                    >
                      <Text className="text-white text-xs">Zum Rezept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="rounded-full px-3 py-2 bg-gray-300"
                      onPress={() =>
                        router.push({
                          pathname: "/IngredientsListScreen",
                          params: { id: recipe.$id },
                        })
                      }
                    >
                      <Text className="text-black text-xs">Zutaten</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <Text className="font-bold text-gray-800 mt-4 text-3xl">
              Alle Rezepte
            </Text>

            {allRecipes.map((recipe) => (
              <View
                key={recipe.$id}
                className="flex-row bg-white shadow-lg rounded-2xl p-4 mb-4 items-center"
              >
                <Image
                  source={{uri: recipe.thumbnail_transparent}}
                  className="w-40 h-32 rounded-lg"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-base font-bold text-gray-800 mb-2">
                    {recipe.title}
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-gray-600">⏱️ {recipe.prep_time} min</Text>
                  </View>
                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      className="rounded-full px-4 py-2 bg-green-800"
                      onPress={() =>
                        router.push({
                          pathname: "/recipeDetailScreen",
                          params: { id: recipe.$id },
                        })
                      }
                    >
                      <Text className="text-white text-xs">Zum Rezept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="rounded-full px-3 py-2 bg-gray-300"
                      onPress={() =>
                        router.push({
                          pathname: "/IngredientsListScreen",
                          params: { id: recipe.$id },
                        })
                      }
                    >
                      <Text className="text-black text-xs">Zutaten</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
