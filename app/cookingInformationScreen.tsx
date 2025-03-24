import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { Ionicons } from "@expo/vector-icons";
import { useShoppingList } from "./manager/ShoppingListContext";
import Toast from 'react-native-toast-message';

export default function CookingInformationScreen() {
  const { id } = useGlobalSearchParams();
  const [recipe, setRecipe] = useState(null);
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
    if (id) fetchRecipe();
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

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        {/* Back Button */}
        <BackButton/>
        
        {/* Recipe Image */}
        <Image 
          source={require("../assets/images/recipeThumbnail.jpg")}
          className="rounded-xl object-center mt-4"
          style={{width: 360, height: 200, alignSelf: "center"}}
        />

        {/* Recipe Info */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</Text>
          <View className="flex-row items-center mb-4">
            <Ionicons name="time-outline" size={20} color="black" />
            <Text className="ml-2">{recipe.cookingTime} min.</Text>
          </View>
          <View className="flex-row mb-4">
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="water-outline"
                size={20}
                color={i < recipe.difficulty ? "black" : "gray"}
              />
            ))}
          </View>
          <Text className="text-gray-600 mb-4">{recipe.description}</Text>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-center p-4">
          <TouchableOpacity
            className="px-6 py-3 bg-green-800 rounded-full mr-4"
            onPress={() => setShowIngredients(true)}
          >
            <Text className="text-white">Zutaten</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-3 bg-green-800 rounded-full">
            <Text className="text-white">Kochvorgang starten</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}