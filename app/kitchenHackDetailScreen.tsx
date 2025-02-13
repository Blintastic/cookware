import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity} from "react-native";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

const KitchenHackDetailScreen = () => {
  const { hackId } = useLocalSearchParams(); // Get the hack ID from route params
  const [kitchenHack, setKitchenHack] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchKitchenHack = async () => {
      try {
        // Fetch the kitchen hack document by its ID
        const response = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.kitchenHacksCollectionId,
          hackId
        );

        setKitchenHack(response); // Store the fetched data
      } catch (error) {
        console.error("Error fetching kitchen hack:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKitchenHack();
  }, [hackId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!kitchenHack) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-600">Kitchen hack not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <BackButton/>  

      <Text className="text-2xl font-bold text-center mb-4">{kitchenHack.title}</Text>

      {/* Content */}
      <Text className="text-base text-gray-700 mb-4">{kitchenHack.content}</Text>
    </ScrollView>
  );
};

export default KitchenHackDetailScreen;