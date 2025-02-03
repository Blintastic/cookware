import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { databases, appwriteConfig} from "../lib/appwriteConfig";
import { useLocalSearchParams } from "expo-router";

const VideoOverview = () => {
  const { id } = useLocalSearchParams();
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Step 1: Fetch the recipe document
        const recipe = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.recipesCollectionId,
          id as string
        );

        const videoIds = (recipe.videos || []).map(video => video.$id);

        if (!Array.isArray(videoIds) || videoIds.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }

        // Step 3: Extract titles
        const videoTitles = videoIds.map((video) => video.title);

        console.log("Video Titles:", videoTitles);

        setVideos(videoTitles);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : videos.length > 0 ? (
        videos.map((title, index) => <Text key={index}>{title}</Text>)
      ) : (
        <Text>No videos found</Text>
      )}
    </View>
  );
};

export default VideoOverview;
