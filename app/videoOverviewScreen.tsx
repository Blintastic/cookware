import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataContext } from "@/lib/DataProvider";
import BackButton from "@/components/BackButton";

const VideoOverview = () => {
  const { id } = useLocalSearchParams();
  const { recipes, videos, kitchenHacks, loading } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState("videos");
  const router = useRouter();

  const recipe = recipes.find((recipe) => recipe.$id === id);
  const recipeVideos = recipe?.videos || [];
  const recipeKitchenHacks = recipe?.kitchenHacks || [];

  const filteredVideos = videos.filter((video) =>
    recipeVideos.some((recipeVideo) => recipeVideo.$id === video.id)
  );

  const filteredKitchenHacks = kitchenHacks.filter((hack) =>
    recipeKitchenHacks.some((recipeHack) => recipeHack.$id === hack.id)
  );

  const formatDuration = (durationMillis) => {
    if (!durationMillis) return "00:00";
    const minutes = Math.floor(durationMillis / 60000);
    const seconds = Math.floor((durationMillis % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      className="relative w-[48%] mb-4"
      onPress={() => router.push(`./manager/videoManager?videoId=${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} className="w-full h-64 bg-gray-300 rounded-lg" resizeMode="cover" />
      <View className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 rounded-b-lg">
        <Text className="text-white font-semibold text-sm">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Icon name="timer" size={14} color="#FFF" />
          <Text className="ml-1 text-white text-xs">{formatDuration(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <BackButton />
      <View className="flex-row justify-center space-x-4 mb-4">
        <TouchableOpacity
          className={`px-6 py-2 rounded-full shadow-md ${activeTab === "videos" ? "bg-green-800" : "bg-gray-300"}`}
          onPress={() => setActiveTab("videos")}
        >
          <Text className={`text-white ${activeTab === "videos" ? "font-bold" : "font-medium"}`}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-6 py-2 rounded-full shadow-md ${activeTab === "hacks" ? "bg-green-800" : "bg-gray-300"}`}
          onPress={() => setActiveTab("hacks")}
        >
          <Text className={`text-white ${activeTab === "hacks" ? "font-bold" : "font-medium"}`}>Kitchen Hacks</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : activeTab === "videos" ? (
        filteredVideos.length > 0 ? (
          <FlatList
            data={filteredVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text className="text-center text-lg text-gray-600">No videos found</Text>
        )
      ) : filteredKitchenHacks.length > 0 ? (
        <FlatList
          data={filteredKitchenHacks}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-full bg-white rounded-xl shadow-md p-4 mb-4"
              onPress={() => router.push(`./kitchenHackDetailScreen?hackId=${item.id}`)}
            >
              <Text className="text-lg font-semibold flex-1">{item.title}</Text>
            </TouchableOpacity>
          )}
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