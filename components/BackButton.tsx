import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  text?: string | null; // Optional custom text for the button
  onPress?: () => void; // Optional custom onPress handler
}

export default function BackButton({ text, onPress }: BackButtonProps) {
  const navigation = useNavigation();
  const buttonText = text ?? "Zurück"; // Default text if none is provided

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress} 
      className="flex-row items-center mb-3"
    >
      <Image 
        source={require("../assets/ui/backButton.png")} 
        className="w-6 h-6 mr-2" // Größe des Icons anpassen
        resizeMode="contain"
      />
      <Text className="text-2xl font-semibold text-black font-lomedium">
        {text !== null ? buttonText : ""}
      </Text>
    </TouchableOpacity>

  );
}
