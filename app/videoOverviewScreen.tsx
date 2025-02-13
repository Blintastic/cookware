import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from "react-native";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons for icons
import { Audio } from "expo-av"; // Import expo-av for video metadata

const VideoOverview = () => {
  const { id } = useLocalSearchParams(); // Recipe ID from route params
  const [videos, setVideos] = useState([]);
  const [kitchenHacks, setKitchenHacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("videos"); // State to manage active tab
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recipe details
        const recipe = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.recipesCollectionId,
          id as string
        );

        // Extract video IDs and kitchen hack IDs from the recipe
        const videoIds = (recipe.videos || []).map(video => video.$id);
        const kitchenHackIds = (recipe.kitchenHacks || []).map(hack => hack.$id);

        // Fetch video details
        if (Array.isArray(videoIds) && videoIds.length > 0) {
          const videoDetails = await Promise.all(
            videoIds.map(async (videoId) => {
              const video = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.videosCollectionId,
                videoId
              );
              const duration = await getVideoDuration(video.video); // Fetch video duration
              return {
                id: video.$id,
                title: video.title,
                thumbnail: video.thumbnail,
                videoUrl: video.video,
                duration,
              };
            })
          );
          setVideos(videoDetails);
        } else {
          setVideos([]);
        }

        // Fetch kitchen hack details
        if (Array.isArray(kitchenHackIds) && kitchenHackIds.length > 0) {
          const hacksDetails = await Promise.all(
            kitchenHackIds.map(async (hackId) => {
              const hack = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.kitchenHacksCollectionId,
                hackId
              );
              return {
                id: hack.$id, // Use $id for consistency
                title: hack.title,
                content: hack.content,
              };
            })
          );
          setKitchenHacks(hacksDetails);
        } else {
          setKitchenHacks([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Function to get video duration using expo-av
  const getVideoDuration = async (videoUrl) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: videoUrl });
      const status = await sound.getStatusAsync();
      await sound.unloadAsync(); // Clean up the sound object
      return status.durationMillis; // Duration in milliseconds
    } catch (error) {
      console.error("Error fetching video duration:", error);
      return null;
    }
  };

  // Format duration into MM:SS
  const formatDuration = (durationMillis) => {
    if (!durationMillis) return "00:00";
    const minutes = Math.floor(durationMillis / 60000);
    const seconds = Math.floor((durationMillis % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Render a single video item
  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
      onPress={() => router.push(`./manager/videoManager?videoId=${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} className="w-full h-48 object-cover" />
      <View className="p-2">
        <Text className="text-lg font-semibold text-center">{item.title}</Text>
        {/* Display duration with an icon */}
        <View className="flex-row items-center justify-center mt-1">
          <Icon name="timer" size={16} color="#666" />
          <Text className="ml-1 text-gray-600">{formatDuration(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render a single kitchen hack item
  const renderHackItem = ({ item }) => (
    <TouchableOpacity
      className="mb-4 bg-white rounded-lg shadow-md p-4"
      onPress={() => router.push(`./kitchenHackDetailScreen?hackId=${item.id}`)} // Navigate to hack detail
    >
      <Text className="text-lg font-semibold text-center">{item.title}</Text>
      <Text className="mt-2 text-gray-600">{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {/* Tab Selector */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${activeTab === "videos" ? "bg-blue-500" : "bg-gray-300"}`}
          onPress={() => setActiveTab("videos")}
        >
          <Text className={`text-white ${activeTab === "videos" ? "font-bold" : ""}`}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${activeTab === "hacks" ? "bg-blue-500" : "bg-gray-300"}`}
          onPress={() => setActiveTab("hacks")}
        >
          <Text className={`text-white ${activeTab === "hacks" ? "font-bold" : ""}`}>Kitchen Hacks</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : activeTab === "videos" ? (
        videos.length > 0 ? (
          <FlatList
            data={videos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text className="text-center text-lg text-gray-600">No videos found</Text>
        )
      ) : kitchenHacks.length > 0 ? (
        <FlatList
          data={kitchenHacks}
          renderItem={renderHackItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <Text className="text-center text-lg text-gray-600">No kitchen hacks found</Text>
      )}
    </View>
  );
};

export default VideoOverview;