import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { databases, appwriteConfig } from "../lib/appwriteConfig"; // Adjust the import path
import CustomButtons from "@/components/CustomButtons"; // Import the custom button component
import ShoppingCartButton from "@/components/ShoppingCartButton";
import VideoButton from "@/components/VideoButton";
import CameraButton from "@/components/CameraButton";
import { useRouter } from "expo-router";

export default function Index() {
  const [lastRecipe, setLastRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLastRecipe = async () => {
      try {
        // Retrieve the last recipe ID from AsyncStorage
        const lastRecipeId = await AsyncStorage.getItem("lastRecipeId");
        if (!lastRecipeId) {
          setLoading(false);
          return;
        }

        // Fetch the recipe details from the database
        const response = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.recipesCollectionId,
          lastRecipeId
        );
        setLastRecipe(response);
      } catch (error) {
        console.error("Error fetching last recipe: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastRecipe();
  }, []);

  const handleStartCooking = () => {
    if (lastRecipe?.$id) {
      router.push(`/cookingInformationScreen?id=${lastRecipe.$id}`);
    }
  };

  const handleShowIngredients = () => {
    if (lastRecipe?.$id) {
      router.push(`/IngredientsListScreen?id=${lastRecipe.$id}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <Text className="font-lomedium text-4xl mt-3 ml-3">
          Zuletzt Geöffnet:
        </Text>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center px-4 py-6">
            {/* Last Recipe Section */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : lastRecipe ? (
              <View className="w-11/12 max-w-md bg-gray-200 rounded-lg p-4 mb-6">
                <Text className="text-3xl font-bold mb-2 font-lomedium">{lastRecipe.title}</Text>
                <View className="w-full h-40 bg-gray-300 rounded-lg mb-4" />
                <Text className="text-gray-700 mb-4 font-lolight text-xl">{lastRecipe.description}</Text>

                {/* Buttons */}
                <View className="flex-row justify-between mt-4">
                  <CustomButtons
                    title="Zutaten Anzeigen"
                    handlePress={handleShowIngredients}
                    buttonStyle={{ flex: 1, marginRight: 8 }}
                    textStyle={{ color: "white", fontWeight: "bold" }}
                    disabled={false}
                  />

                  <CustomButtons
                    title="Kochvorgang starten"
                    handlePress={handleStartCooking}
                    buttonStyle={{ flex: 1, marginLeft: 8 }}
                    textStyle={{ color: "white", fontWeight: "bold" }}
                    disabled={false}
                  />
                </View>
              </View>
            ) : (
              <Text className="text-gray-600 text-center">Kein Rezept gefunden</Text>
            )}
          </View>
        </ScrollView>

        <ShoppingCartButton />
        <VideoButton />
        <CameraButton />
      </View>
    </TouchableWithoutFeedback>
  );
}