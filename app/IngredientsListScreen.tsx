import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { useShoppingList } from "./manager/ShoppingListContext";
import Toast from 'react-native-toast-message';

type SearchParams = {
  id?: string;
};

export default function IngredientsListScreen() {
  const { id } = useGlobalSearchParams<SearchParams>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToOpenList } = useShoppingList();

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
      console.error("Failed to fetch recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRecipe();
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

  const handleAddToShoppingList = (ingredient: string) => {
    addToOpenList(ingredient, "1 Stk."); // Default quantity
    Toast.show({
      type: "success",
      text1: `${ingredient} wurde zur Einkaufsliste hinzugefügt`,
      position: "bottom",
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <BackButton />
      <View className="mt-5">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Zutaten für {recipe.title}</Text>
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <View key={index} className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 text-lg">• {ingredient}</Text>
            <TouchableOpacity
              onPress={() => handleAddToShoppingList(ingredient)}
              className="ml-4"
            >
              <Ionicons name="cart-outline" size={24} color="green" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}