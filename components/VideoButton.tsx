import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

const VideoButton = () => {
  return (
    <TouchableOpacity
      className="absolute bottom-0 left-8 rounded-full w-20 h-20 justify-center items-center"
      onPress={() => router.push("/generalVideoOverviewScreen")}
    >
      <Image
        source={require("../assets/ui/InfoButton.png")}
        style={{height: 30, width:30}}
      />
    </TouchableOpacity>
  );
};

export default VideoButton;
