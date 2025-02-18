import React, { useContext, useState, useEffect} from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import Icon from "react-native-vector-icons/MaterialIcons"; 
import { DataContext } from "@/lib/DataProvider";

const GeneralVideoOverviewScreen = () => {
  const { videos, kitchenHacks, loading, fetchVideosAndHacks } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState("videos"); // State to manage active tab
  const router = useRouter();

  useEffect(() => {
    if (!videos || !kitchenHacks) {
      fetchVideosAndHacks();
    }
  }, []);

  const formatDuration = (durationMillis) => {
    if (!durationMillis) return "00:00";
    const minutes = Math.floor(durationMillis / 60000);
    const seconds = Math.floor((durationMillis % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
      onPress={() => router.push(`./manager/videoManager?videoId=${item.id}`)}
    >
      <Image source={{ uri: item.thumbnail }} className="w-full h-48 object-cover" />
      <View className="p-2">
        <Text className="text-lg font-semibold text-center">{item.title}</Text>
        <View className="flex-row items-center justify-center mt-1">
          <Icon name="timer" size={16} color="#666" />
          <Text className="ml-1 text-gray-600">{formatDuration(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
      <BackButton />
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

export default GeneralVideoOverviewScreen;