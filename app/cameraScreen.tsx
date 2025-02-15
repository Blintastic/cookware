import React, { useState, useEffect, useRef } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from "@viro-community/react-viro";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { databases, appwriteConfig } from "../lib/appwriteConfig";

type Icon = {
  name: string;
  source: string;
  physicalWidth: number;
  videos: string;
  recipes: string;
  icon_type: "video" | "recipe" | "timer";
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
  const arNavigatorRef = useRef<any>(null);

  // Extract the key from route params to force remounting
  const { key } = useLocalSearchParams<{ key: string }>();

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.iconsCollectionId
        );

        const icons = response.documents.map((icon: any) => {
          let videoId = "";
          let recipeId = "";

          if (Array.isArray(icon.videos) && icon.videos.length > 0) {
            videoId = icon.videos[0]?.$id || "";
          } else if (typeof icon.videos === "object" && icon.videos?.$id) {
            videoId = icon.videos.$id;
          } else if (typeof icon.videos === "string") {
            videoId = icon.videos;
          }

          if (typeof icon.recipes === "object" && icon.recipes?.$id) {
            recipeId = icon.recipes.$id;
          } else if (typeof icon.recipes === "string") {
            recipeId = icon.recipes;
          }

          return {
            name: icon.name,
            source: icon.image,
            physicalWidth: 0.1,
            videos: videoId,
            recipes: recipeId,
            icon_type: icon.icon_type || "video",
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

    return () => {
      // Cleanup: Reset AR session and delete all tracking targets
      if (arNavigatorRef.current) {
        arNavigatorRef.current.reset();
        arNavigatorRef.current = null;
      }

      // Delete all tracking targets individually
      iconsArray.forEach((icon) => {
        ViroARTrackingTargets.deleteTarget(icon.name);
      });

      setArNavigator(false);
    };
  }, [key]); // Add key as a dependency to force remounting

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

    if (!detectedIcon) {
      console.warn(`No icon found for name: ${iconName}`);
      return;
    }

    switch (detectedIcon.icon_type) {
      case "video":
        if (detectedIcon.videos) {
          router.push(`./manager/videoManager?videoId=${detectedIcon.videos}`);
        } else {
          console.warn(`No video ID found for icon: ${iconName}`);
        }
        break;

      case "recipe":
        if (detectedIcon.recipes) {
          router.push(`./cookingInformationScreen?id=${detectedIcon.recipes}`);
        } else {
          console.warn(`No recipe ID found for icon: ${iconName}`);
        }
        break;

      case "timer":
        console.log("Timer functionality not implemented yet.");
        break;

      default:
        console.warn(`Unknown icon type: ${detectedIcon.icon_type}`);
        break;
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
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/")} className="flex-row items-center">
        <Text className="text-lg font-semibold text-black">← Zurück</Text>
      </TouchableOpacity>

      {/* Loading State */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Loading icons...</Text>
        </View>
      ) : (
        arNavigator && (
          <ViroARSceneNavigator
            ref={arNavigatorRef}
            autofocus={true}
            initialScene={{ scene: ARScene }}
            className="flex-1"
          />
        )
      )}

      {/* Scanning Overlay */}
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