import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButtons from "@/components/CustomButtons";
import AddIngredientModal from "@/components/modals/AddIngredientModal";
import { useShoppingList } from "./manager/ShoppingListContext";

export default function ShoppingListScreen() {
  const { openList, acquiredList, moveToAcquiredList, moveToOpenList, clearAcquiredList, addToOpenList } =
    useShoppingList();
  const [tab, setTab] = useState<"open" | "acquired">("open");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row justify-between items-center py-2 px-4 bg-gray-100 rounded-md mb-2">
      <Text className="text-base">{item.name}</Text>
      <Text className="text-base">{item.quantity}</Text>
      <TouchableOpacity
        className="ml-4 bg-green-500 px-3 py-1 rounded-md"
        onPress={() =>
          tab === "open" ? moveToAcquiredList(item.id) : moveToOpenList(item.id)
        }
      >
        <Text className="text-white text-sm">{tab === "open" ? "-" : "+"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <BackButton />

      {/* Tabs */}
      <View className="flex-row justify-around mb-4 mt-3">
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${tab === "open" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setTab("open")}
        >
          <Text className={`text-sm ${tab === "open" ? "text-white" : "text-gray-800"}`}>
            Offen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${tab === "acquired" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setTab("acquired")}
        >
          <Text className={`text-sm ${tab === "acquired" ? "text-white" : "text-gray-800"}`}>
            Besorgt
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tab === "open" ? openList : acquiredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500 mt-4">
            Keine Einträge vorhanden.
          </Text>
        )}
      />

      {/* Conditional Rendering of Buttons */}
      <View className="mb-5">
        {tab === "open" ? (
          <CustomButtons
            title="Zutat hinzufügen"
            handlePress={() => setIsModalVisible(true)}
            buttonStyle={{ backgroundColor: "green", paddingHorizontal: 10 }}
            textStyle={{ color: "white", fontWeight: "medium" }}
            disabled={false}
          />
        ) : (
          <TouchableOpacity
            className="p-4 bg-red-500 rounded-md"
            onPress={clearAcquiredList}
          >
            <Text className="text-center text-white text-lg">
              Besorgte Zutaten entfernen
            </Text>
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