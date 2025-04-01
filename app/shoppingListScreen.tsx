import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButtons from "@/components/CustomButtons";
import AddIngredientModal from "@/components/modals/AddIngredientModal";
import { useShoppingList } from "./manager/ShoppingListContext";
import { Ionicons } from '@expo/vector-icons';

export default function ShoppingListScreen() {
  const { openList, acquiredList, moveToAcquiredList, moveToOpenList, clearAcquiredList } = useShoppingList();
  const [tab, setTab] = useState<"open" | "acquired">("open");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row justify-between items-center py-4 px-6 bg-white rounded-2xl shadow-md mb-3">
      <Text className="text-lg font-lolight uppercase text-gray-800">{item.name}</Text>
      <Text className="text-lg font-lolight text-gray-600">{item.quantity}</Text>
      <TouchableOpacity
        className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center"
        onPress={() => (tab === "open" ? moveToAcquiredList(item.id) : moveToOpenList(item.id))}
      >
        <Ionicons name={tab === "open" ? "checkmark" : "remove"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <BackButton />
      
      {/* Tabs */}
      <View className="flex-row justify-center space-x-4 my-4 pb-3">
        <TouchableOpacity
          className={`px-6 py-3 rounded-full ${tab === "open" ? "bg-green-800" : "bg-gray-300"}`}
          onPress={() => setTab("open")}
        >
          <Text className={`text-xl font-lomedium ${tab === "open" ? "text-white" : "text-gray-800"}`}>offen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-6 py-3 rounded-full ${tab === "acquired" ? "bg-gray-400" : "bg-gray-300"}`}
          onPress={() => setTab("acquired")}
        >
          <Text className={`text-xl font-lomedium ${tab === "acquired" ? "text-white" : "text-gray-800"}`}>besorgt</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={tab === "open" ? openList : acquiredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500">Keine Einträge vorhanden.</Text>
        )}
      />
      
      {/* Button */}
      <View className="mt-5">
        {tab === "open" ? (
          <TouchableOpacity
            className="bg-green-800 py-4 rounded-full flex items-center"
            onPress={() => setIsModalVisible(true)}
          >
            <Text className="text-white text-2xl font-lomedium">Zutat hinzufügen</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-red-500 py-4 rounded-full flex items-center"
            onPress={clearAcquiredList}
          >
            <Text className="text-white text-2xl font-lomedium">Besorgte Zutaten entfernen</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Add Ingredient Modal */}
      <AddIngredientModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}