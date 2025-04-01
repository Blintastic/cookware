import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image} from "react-native";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
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
          <View key={index} className="flex-row items-center justify-between bg-white p-4 mb-2 rounded-2xl shadow-md"> 
            <Text className="text-lg font-bold text-gray-800 flex-1" numberOfLines={1} ellipsizeMode="tail">{ingredient.toUpperCase()}</Text>
            <Text className="text-gray-500 mr-4">1 Stk.</Text>
            <TouchableOpacity
              onPress={() => handleAddToShoppingList(ingredient)}
              className="bg-green-800 p-2 rounded-xl ml-4"
            >
              <Image 
                source={require("../assets/ui/ShoppingCartIcon.png")}
                className="h-7 w-7 left-[-2px]"
              />

            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
