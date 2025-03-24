import React, { useContext } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataContext } from "@/lib/DataProvider";

const VideoOverview = () => {
  const { id } = useLocalSearchParams();
  const { recipes, videos, kitchenHacks, loading } = useContext(DataContext);
  const [activeTab, setActiveTab] = React.useState("videos");
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
    return `${minutes} min.`;
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      className="mb-4 bg-white rounded-2xl shadow-lg overflow-hidden flex-row items-center p-2"
      onPress={() => router.push(`./manager/videoManager?videoId=${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} className="w-24 h-24 rounded-lg" />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Icon name="timer" size={16} color="#666" />
          <Text className="ml-1 text-gray-600">{formatDuration(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="flex-row justify-center mb-4">
        <TouchableOpacity
          className={`px-6 py-2 rounded-full shadow-md ${activeTab === "videos" ? "bg-green-700" : "bg-gray-300"}`}
          onPress={() => setActiveTab("videos")}
        >
          <Text className={`text-white text-lg ${activeTab === "videos" ? "font-bold" : "font-medium"}`}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-6 py-2 rounded-full shadow-md ml-2 ${activeTab === "hacks" ? "bg-gray-500" : "bg-gray-300"}`}
          onPress={() => setActiveTab("hacks")}
        >
          <Text className={`text-white text-lg ${activeTab === "hacks" ? "font-bold" : "font-medium"}`}>Kitchen Hacks</Text>
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
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text className="text-center text-lg text-gray-600">No videos found</Text>
        )
      ) : (
        <Text className="text-center text-lg text-gray-600">No kitchen hacks found</Text>
      )}
    </View>
  );
};

export default VideoOverview;
