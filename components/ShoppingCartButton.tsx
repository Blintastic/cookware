import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

const ShoppingCartButton = () => {
  return (
    <TouchableOpacity
      className="absolute bottom-8 right-8 bg-slate-300 rounded-full w-20 h-20 justify-center items-center"
      onPress={() => router.push("/shoppingListScreen")}
    >
      <Text className="text-gray-600 text-base">🛒</Text>
    </TouchableOpacity>
  );
};

export default ShoppingCartButton;
