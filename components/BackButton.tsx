import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      className="flex-row items-center"
    >
      <Text className="text-lg font-semibold text-black">{`← Zurück`}</Text>
    </TouchableOpacity>
  );
}
