// lib/DataContext.js
import React, { createContext, useState, useEffect } from "react";
import { databases, appwriteConfig } from "./appwriteConfig";
import { Audio } from "expo-av";

// Define a default value for the context
const defaultContextValue = {
  recipes: [],
  allRecipes: [],
  videos: [],
  kitchenHacks: [],
  loading: true,
  fetchRecipes: () => {},
  filterRecipes: () => {},
  fetchVideosAndHacks: () => {},
};

export const DataContext = createContext(defaultContextValue);

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [kitchenHacks, setKitchenHacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.recipesCollectionId
      );
      setAllRecipes(response.documents);
      setRecipes(response.documents); // Initially, all recipes are shown
    } catch (error) {
      console.error("Failed to fetch recipes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideosAndHacks = async () => {
    setLoading(true);
    try {
      // Fetch all videos
      const videoResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId
      );
      const videoDetails = videoResponse.documents.map((video) => ({
        id: video.$id,
        title: video.title,
        thumbnail: video.thumbnail,
        videoUrl: video.video,
      }));

      const videosWithDuration = await Promise.all(
        videoDetails.map(async (video) => {
          const duration = await getVideoDuration(video.videoUrl);
          return { ...video, duration };
        })
      );

      setVideos(videosWithDuration);

      // Fetch all kitchen hacks
      const kitchenHacksResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.kitchenHacksCollectionId
      );
      const kitchenHacksDetails = kitchenHacksResponse.documents.map((hack) => ({
        id: hack.$id,
        title: hack.title,
        content: hack.content,
      }));
      setKitchenHacks(kitchenHacksDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoDuration = async (videoUrl) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: videoUrl });
      const status = await sound.getStatusAsync();
      await sound.unloadAsync();
      return status.durationMillis;
    } catch (error) {
      console.error("Error fetching video duration:", error);
      return null;
    }
  };

  const filterRecipes = (query) => {
    if (!query) {
      setRecipes(allRecipes); // Show all recipes if no query
      return;
    }
    const lowercaseQuery = query.toLowerCase();
    const filtered = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowercaseQuery)
    );
    setRecipes(filtered);
  };

  useEffect(() => {
    if (allRecipes.length === 0) {
      fetchRecipes();
    }
    if (videos.length === 0 || kitchenHacks.length === 0) {
      fetchVideosAndHacks();
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        recipes,
        allRecipes,
        videos,
        kitchenHacks,
        loading,
        fetchRecipes,
        filterRecipes,
        fetchVideosAndHacks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};