import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  text?: string | null; // Optional custom text for the button
  onPress?: () => void; // Optional custom onPress handler
}

export default function BackButton({ text, onPress }: BackButtonProps) {
  const navigation = useNavigation();
  const buttonText = text ?? "← Zurück"; // Default text if none is provided

  const handlePress = () => {
    if (onPress) {
      // Use the custom onPress handler if provided
      onPress();
    } else {
      // Default behavior: Go back if possible
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress} // Use the combined onPress logic
      className="flex-row items-center"
    >
      <Text className="text-lg font-semibold text-black">{buttonText}</Text>
    </TouchableOpacity>
  );
}