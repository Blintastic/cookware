import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from "react-native";
import { databases, appwriteConfig } from "../lib/appwriteConfig";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

const GeneralVideoOverviewScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        // Fetch all videos from the "videos" collection
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videosCollectionId
        );

        // Map the fetched documents to a simplified structure
        const videoDetails = response.documents.map((video) => ({
          id: video.$id,
          title: video.title,
          thumbnail: video.thumbnail, // Assuming the thumbnail URL is stored in the database
          videoUrl: video.video, // Assuming the video URL is stored in the database
        }));

        setVideos(videoDetails);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVideos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="mb-4 bg-white rounded-lg shadow-md overflow-hidden"
      onPress={() => router.push(`./manager/videoManager?videoId=${item.id}`)} // Navigate to videoManager
    >
      <Image source={{ uri: item.thumbnail }} className="w-full h-48 object-cover" />
      <Text className="p-2 text-lg font-semibold text-center">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
        <BackButton />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : videos.length > 0 ? (
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <Text className="text-center text-lg text-gray-600">No videos found</Text>
      )}
    </View>
  );
};

export default GeneralVideoOverviewScreen;