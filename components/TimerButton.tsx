import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export default function TimerButton() {
  const [timerActive, setTimerActive] = useState(false);

  const handlePress = () => {
    if (timerActive) {
      setTimerActive(false); // Reset timer state
    } else {
      router.push("/timerScreen");
    }
  };

  return (
    <TouchableOpacity
      className="absolute bottom-8 bg-gray-300 rounded-full p-6 z-10 ml-2 right-12"
      onPress={handlePress}
    >
      <Text className="text-gray-600 text-2xl">{timerActive ? "⏳" : "⏲️"}</Text>
    </TouchableOpacity>
  );
}
