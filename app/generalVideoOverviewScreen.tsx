import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataContext } from "@/lib/DataProvider";

const GeneralVideoOverviewScreen = () => {
  const { videos, kitchenHacks, loading, fetchVideosAndHacks } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState("videos");
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
        videos.length > 0 ? (
          <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
            <View className="flex-row flex-wrap justify-between">
              {videos.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="w-[48%] mb-4 relative"
                  onPress={() => router.push(`./manager/videoManager?videoId=${item.id}`)}
                >
                  <Image source={{ uri: item.thumbnail }} className="w-full h-64 rounded-lg" resizeMode="cover" />
                  <View style={{ position: "absolute", bottom: 0, left: 0, width: "100%", backgroundColor: "rgba(0,0,0,0.3)", padding: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                  <Text className="text-white font-semibold text-base">{item.title}</Text>
                    <View className="flex-row items-center mt-1">
                      <Icon name="timer" size={16} color="#fff" />
                      <Text className="ml-1 text-white">{formatDuration(item.duration)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <Text className="text-center text-lg text-gray-800">No videos found</Text>
        )
      ) : kitchenHacks.length > 0 ? (
        <FlatList
          data={kitchenHacks}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center bg-white rounded-xl shadow-md p-4 mb-4"
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

export default GeneralVideoOverviewScreen;