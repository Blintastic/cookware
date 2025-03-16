import React, { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function TimerButton() {
  const [timerActive, setTimerActive] = useState(false);

  const handlePress = () => {
    if (timerActive) {
      // Cancel the timer
      setTimerActive(false);
    } else {
      // Navigate to the timer selection screen
      router.push("/timerScreen");
    }
  };

  return (
    <TouchableOpacity
      className="absolute bottom-4 rounded-full p-6 z-10 right-7"
      onPress={handlePress}
    >
      <Image
        source={require("../assets/ui/TimerButton.png")}
        style={{height: 40, width:40}}
      />
    </TouchableOpacity>
  );
}