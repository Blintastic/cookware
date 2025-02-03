import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  text?: string | null;
}

export default function BackButton({ text }: BackButtonProps) {
  const navigation = useNavigation();
  const buttonText = text ?? "← Zurück";

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
      className="flex-row items-center"
    >
      <Text className="text-lg font-semibold text-black">{buttonText}</Text>
    </TouchableOpacity>
  );
}
