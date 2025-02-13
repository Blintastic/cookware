import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export default function CameraButton() {
  return (
    <TouchableOpacity 
        className="absolute bottom-8 self-center bg-gray-300 rounded-full p-10 z-10"
        onPress={() => router.replace("/cameraScreen")} // Use replace instead of push
    >
        <Text className="text-gray-600 text-2xl">📷</Text>
    </TouchableOpacity>
  );
}