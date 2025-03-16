import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function CameraButton() {
  return (
    <TouchableOpacity 
      className="absolute bottom-14 self-center bg-green-800 rounded-full p-5 z-10"
      onPress={() => router.replace(`/cameraScreen?key=${Date.now()}`)} // Add a unique key
    >
      <Image
        source={require("../assets/ui/CameraButton.png")}
        style={{height: 50, width: 50}}
      />
    </TouchableOpacity>
  );
}