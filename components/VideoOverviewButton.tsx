import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

type VideoOverviewButtonProps = {
  id?: string; // Make `id` optional to prevent crashes
};

export default function VideoOverviewButton({ id }: VideoOverviewButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-4 p-6 z-10 ml-9"
      onPress={() => {
        if (!id) {
          console.error("No recipe ID provided to VideoOverviewButton");
          return;
        }
        router.push({ pathname: "/videoOverviewScreen", params: { id } });
      }}
    >
      <Image
        source={require("../assets/ui/VideoOverviewButton.png")}
        style={{height: 40, width:40}}
      />
    </TouchableOpacity>
  );
}
