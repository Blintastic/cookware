import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { databases } from "../lib/appwriteConfig";
import { appwriteConfig } from "../lib/appwriteConfig";
import BackButton from "@/components/BackButton";

export default function RecipeIngredientsScreen() {
  const route = useRoute();
  const { recipeId } = route.params as { recipeId: string };

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.recipesCollectionId,
          recipeId
        );
        setIngredients(response.ingredients || []);
      } catch (error) {
        console.error("Error fetching ingredients: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [recipeId]);

  return (
    <View className="flex-1 bg-white p-4">
      <BackButton />
      <Text className="text-lg font-bold mb-4">Zutaten</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ingredients.length > 0 ? (
        <FlatList
          data={ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 px-4 bg-gray-100 rounded-md mb-2">
              <Text>{item.name}</Text>
              <Text>{item.quantity}</Text>
            </View>
          )}
        />
      ) : (
        <Text className="text-gray-500 text-center">Keine Zutaten gefunden.</Text>
      )}
    </View>
  );
}
