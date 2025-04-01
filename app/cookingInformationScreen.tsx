import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useShoppingList } from "./manager/ShoppingListContext";
import BottomBar from "@/components/BottomBar";
import VideoOverviewButton from "@/components/VideoOverviewButton";
import CameraButton from "@/components/CameraButton";
import TimerButton from "@/components/TimerButton";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function CookingInformationScreen() {
  const { id } = useGlobalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("information");
  const { addToOpenList } = useShoppingList();
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
    <View className="flex-1 bg-white p-4">
      <ScrollView className="mb-40">
        <BackButton />
        <View className="bg-white rounded-xl shadow-lg p-4">
          <Text className="text-center text-lg font-bold">{recipe.title}</Text>
          <Image 
            source={{uri: recipe.thumbnail}}
            className="rounded-lg my-2"
            style={{ width: "100%", height: 180 }}
          />
          {/* Tabs moved above the content and properly aligned */}
          <View className="flex-row justify-between mt-6 px-4">
            <TouchableOpacity 
              className={`px-6 py-4 rounded-full ${activeTab === "information" ? "bg-green-800" : "bg-gray-200"}`}
              onPress={() => setActiveTab("information")}
            >
              <Text className={`${activeTab === "information" ? "text-white" : "text-gray-800"}`}>Informationen</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-6 py-4 rounded-full ${activeTab === "ingredients" ? "bg-green-800" : "bg-gray-200"}`}
              onPress={() => setActiveTab("ingredients")}
            >
              <Text className={`${activeTab === "ingredients" ? "text-white" : "text-gray-800"}`}>Zutaten</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-2">
            <Text className="text-gray-700 text-sm font-semibold">Kitchen Hack 01: How to…</Text>
            {activeTab === "information" && (
              <ScrollView style={{ maxHeight: 200 }}>
                <Text className="text-gray-600 mt-2">{recipe.description}</Text>
              </ScrollView>
            )}
            {activeTab === "ingredients" && (
              <ScrollView>
                <View className="mt-5">
                  <Text className="text-2xl font-bold text-gray-800 mb-4">Zutaten für {recipe.title}</Text>
                  {recipe.ingredients?.map((ingredient, index) => (
                    <View key={index} className="flex-row items-center justify-between bg-white p-4 mb-2 rounded-2xl shadow-md">
                      <Text className="text-lg font-bold text-gray-800 flex-1" numberOfLines={1} ellipsizeMode="tail">{ingredient.toUpperCase()}</Text>
                      <Text className="text-gray-500 mr-4">1 Stk.</Text>
                      <TouchableOpacity onPress={() => {
                        addToOpenList(ingredient, "1 Stk.");
                        Toast.show({
                          type: "success",
                          text1: `${ingredient} wurde zur Einkaufsliste hinzugefügt`,
                          position: "bottom",
                          visibilityTime: 2000,
                          autoHide: true,
                        });
                      }} className="bg-green-800 p-2 rounded-lg">
                        <Image 
                          source={require("../assets/ui/ShoppingCartIcon.png")}
                          className="h-7 w-7 left-[-2px]"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
      <BottomBar />
      <CameraButton />
      <VideoOverviewButton id={Array.isArray(id) ? id[0] : id} />
      <TimerButton />
    </View>
  );
}