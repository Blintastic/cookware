import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { Video } from "expo-av";
import { TouchableOpacity } from "react-native";

const cookingVideoScreen = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if(isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev -1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isTimerRunning]);
  
  const startTimer = () => {
    setTimeLeft(120);
    setIsTimerRunning(true);
  };

  return (
    <View className="flex-1 bg-black">
      {/* Full-Screen Video */}
      <Video
        source={require("../videos/cookvideo1.mp4")} // Path to your video
        className="absolute top-0 left-0 w-full h-full"
        useNativeControls
        isLooping
        shouldPlay
      />

      <View className="absolute top-12 w-full px-4">
        <Text className="text-2xl font-bold text-white text-center">
          "Recipe Name"
        </Text>
      </View>

      <View className="absolute bottom-20 w-full items-center">
        <View className="bg-black/50 rounded-lg px-6 py-2">
          <Text className="text-white text-2xl">
            {isTimerRunning
              ? `${Math.floor(timeLeft / 60)}:${
                  timeLeft % 60 < 10 ? "0" : ""
                }${timeLeft % 60}`
              : "00:00"}
          </Text>
        </View>
      </View>

      <View className="absolute bottom-6 w-full items-center">
        <TouchableOpacity
          onPress={startTimer}
          className="bg-blue-500 rounded-lg px-6 py-3"
          disabled={isTimerRunning}
        >
          <Text className="text-white text-lg">
            {isTimerRunning ? "Timer Running..." : "Start Timer"}
          </Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default cookingVideoScreen;
