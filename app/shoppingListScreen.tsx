import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
}

export default function ShoppingListScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState<"open" | "acquired">("open");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: "1", name: "Karotten", quantity: "1 Stk." },
    { id: "2", name: "Mehl", quantity: "2 Kg" },
    { id: "3", name: "Salz", quantity: "1 Pkg." },
  ]);
  const [acquiredList, setAcquiredList] = useState<ShoppingItem[]>([]);

  const toggleTab = (selectedTab: "open" | "acquired") => {
    setTab(selectedTab);
  };

  const handleRemove = (id: string) => {
    if (tab === "open") {
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
    } else {
      setAcquiredList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <View className="flex-row justify-between items-center py-2 px-4 bg-gray-100 rounded-md mb-2">
      <Text className="text-base">{item.name}</Text>
      <Text className="text-base">{item.quantity}</Text>
      <TouchableOpacity
        className="ml-4 bg-red-500 px-3 py-1 rounded-md"
        onPress={() => handleRemove(item.id)}
      >
        <Text className="text-white text-sm">-</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      {/* Back Button */}
      <TouchableOpacity
        className="mb-4"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-blue-500">← Startseite</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            tab === "open" ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPress={() => toggleTab("open")}
        >
          <Text
            className={`text-sm ${
              tab === "open" ? "text-white" : "text-gray-800"
            }`}
          >
            Offen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            tab === "acquired" ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPress={() => toggleTab("acquired")}
        >
          <Text
            className={`text-sm ${
              tab === "acquired" ? "text-white" : "text-gray-800"
            }`}
          >
            Besorgt
          </Text>
        </TouchableOpacity>
      </View>

      {/* Shopping List */}
      <FlatList
        data={tab === "open" ? shoppingList : acquiredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500 mt-4">
            Keine Einträge vorhanden.
          </Text>
        )}
      />

      {/* Add Button */}
      <TouchableOpacity
        className="mt-4 bg-green-500 py-2 rounded-md items-center"
        onPress={() => {
          /* Add item functionality here */
        }}
      >
        <Text className="text-white text-base">Zutat hinzufügen</Text>
      </TouchableOpacity>
    </View>
  );
}
