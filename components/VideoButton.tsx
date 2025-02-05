import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

const VideoButton = () => {
  return (
    <TouchableOpacity
      className="absolute bottom-8 left-8 bg-slate-300 rounded-full w-20 h-20 justify-center items-center"
      onPress={() => router.push("/generalVideoOverviewScreen")}
    >
      <Text className="text-gray-600 text-base">ℹ️</Text>
    </TouchableOpacity>
  );
};

export default VideoButton;
