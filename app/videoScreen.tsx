import React from "react";
import { View, Text } from "react-native";
import Video from "react-native-video";
import { useRoute } from "@react-navigation/native";
import BackButton from "@/components/BackButton";

const VideoScreen = () => {
  const route = useRoute();
  const { videoUrl, title } = route.params as { videoUrl: string; title: string };

  return (
    <View className="flex-1 bg-black">
      <BackButton />
      <Text className="text-white text-lg font-bold p-4">{title}</Text>
      <Video
        source={{ uri: videoUrl }}
        style={{ width: "100%", height: "80%" }}
        controls
        resizeMode="contain"
      />
    </View>
  );
};

export default VideoScreen;
