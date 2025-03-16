import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import CameraButton from "@/components/CameraButton";
import VideoOVerviewButton from "@/components/VideoOverviewButton";
import TimerButton from "@/components/TimerButton";
import { Ionicons } from "@expo/vector-icons";
import { useShoppingList } from "./manager/ShoppingListContext";
import Toast from 'react-native-toast-message';
import BottomBar from "@/components/BottomBar";

type SearchParams = {
  id?: string;
};

export default function CookingInformationScreen() {
  const { id } = useGlobalSearchParams<SearchParams>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showIngredients, setShowIngredients] = useState(false);
  const router = useRouter();
  const { addToOpenList } = useShoppingList();

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
        <Text className="text-gray-600">Lädt...</Text>
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
    <View className="flex-1">
      <ScrollView className="flex-1 bg-white">
        <View className="flex-row items-center px-4 py-3 border-b border-gray-300">
          <BackButton text="← Kochvorgang beenden" />
        </View>

        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-4">{recipe.title}</Text>
          <View className="flex-row justify-center mb-4">
            <TouchableOpacity
              className="px-4 py-2 border rounded-l-lg bg-gray-200"
              onPress={() => setShowIngredients(false)}
            >
              <Text>Informationen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 border rounded-r-lg bg-gray-200"
              onPress={() => setShowIngredients(true)}
            >
              <Text>Zutaten</Text>
            </TouchableOpacity>
          </View>
          {showIngredients ? (
            <View>
              {recipe.ingredients?.map((ingredient: string, index: number) => (
                <View key={index} className="flex-row justify-between items-center mb-2">
                  <Text className="text-gray-800">- {ingredient}</Text>
                  <TouchableOpacity
                    onPress={() => handleAddToShoppingList(ingredient)}
                    className="ml-4"
                  >
                    <Ionicons name="cart-outline" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-gray-600">{recipe.description}</Text>
          )}
        </View>
      </ScrollView>
          
      <BottomBar/>

      <CameraButton />
      <VideoOVerviewButton id={id} />
      <TimerButton />
    </View>
  );
}