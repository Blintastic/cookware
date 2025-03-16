import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

const ShoppingCartButton = () => {
  return (
    <TouchableOpacity
      className="absolute bottom-0 right-10 rounded-full w-20 h-20 justify-center items-center"
      onPress={() => router.push("/shoppingListScreen")}
    >
      <Image
        source={require("../assets/ui/ShoppingCartButton.png")}
        style={{height: 35, width: 35}}
      />
    </TouchableOpacity>
  );
};

export default ShoppingCartButton;
