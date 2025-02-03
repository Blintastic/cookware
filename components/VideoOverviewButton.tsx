import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

type VideoOverviewButtonProps = {
  id?: string; // Make `id` optional to prevent crashes
};

export default function VideoOverviewButton({ id }: VideoOverviewButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-8 bg-gray-300 rounded-full p-6 z-10 ml-12"
      onPress={() => {
        if (!id) {
          console.error("No recipe ID provided to VideoOverviewButton");
          return;
        }
        router.push({ pathname: "/videoOverviewScreen", params: { id } });
      }}
    >
      <Text className="text-gray-600 text-2xl">🎥</Text>
    </TouchableOpacity>
  );
}
