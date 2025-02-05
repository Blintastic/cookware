import React, { useState, useEffect } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroARImageMarker,

} from "@viro-community/react-viro";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { databases, appwriteConfig } from "../lib/appwriteConfig";

// Define types for icons and tracking targets
type Icon = {
  name: string;
  source: string;
  physicalWidth: number;
  videos: string; // Single video ID string
};

type TrackingTarget = {
  source: { uri: string };
  orientation: string;
  physicalWidth: number;
};

const CameraScreen = () => {
  const [iconsArray, setIconsArray] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(true);
  const [arNavigator, setArNavigator] = useState(true);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.iconsCollectionId
        );

        const icons = response.documents.map((icon: any) => {
          let videoId = "";

          if (Array.isArray(icon.videos) && icon.videos.length > 0) {
            videoId = icon.videos[0]?.$id || "";
          } else if (typeof icon.videos === "object" && icon.videos?.$id) {
            videoId = icon.videos.$id;
          } else if (typeof icon.videos === "string") {
            videoId = icon.videos;
          }

          return {
            name: icon.name,
            source: icon.image,
            physicalWidth: 0.1,
            videos: videoId,
          };
        });

        setIconsArray(icons);
      } catch (error) {
        console.error("Error fetching icons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  useEffect(() => {
    if (iconsArray.length > 0) {
      const trackingTargets: Record<string, TrackingTarget> = {};
      iconsArray.forEach((icon) => {
        trackingTargets[icon.name] = {
          source: { uri: icon.source },
          orientation: "Up",
          physicalWidth: icon.physicalWidth,
        };
      });
      ViroARTrackingTargets.createTargets(trackingTargets);
    }
  }, [iconsArray]);

  const handleAnchorFound = (iconName: string) => {
    const detectedIcon = iconsArray.find((icon) => icon.name === iconName);

    if (detectedIcon && detectedIcon.videos) {
      const videoId = detectedIcon.videos;

      router.push(`./manager/videoManager?videoId=${videoId}`)
    } else {
      console.warn(`No video ID found for icon: ${iconName}`);
    }
  };

  const handleAnchorLost = (iconName: string) => {
    console.log(`Lost: ${iconName}`);
  };

  const ARScene = () => (
    <ViroARScene>
      {iconsArray.map((icon) => (
        <ViroARImageMarker
          key={icon.name}
          target={icon.name}
          onAnchorFound={() => handleAnchorFound(icon.name)}
          onAnchorRemoved={() => handleAnchorLost(icon.name)}
        />
      ))}
    </ViroARScene>
  );

  return (
    <View className="flex-1 relative">
      <TouchableOpacity onPress={() => router.push("/")} className="flex-row items-center">
        <Text className="text-lg font-semibold text-black">← Zurück</Text>
      </TouchableOpacity>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Loading icons...</Text>
        </View>
      ) : (
        arNavigator && (
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{ scene: ARScene }}
            className="flex-1"
          />
        )
      )}
      <Image
        source={require("../images/ScanningOverlay.png")}
        className="absolute inset-0"
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: 350,
          height: 350,
          transform: [{ translateX: -55 }, { translateY: 10 }],
        }}
      />
    </View>
  );
};

export default CameraScreen;