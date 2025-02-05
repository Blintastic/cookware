import { Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { databases, appwriteConfig } from '../../lib/appwriteConfig';
import { SafeAreaView } from 'react-native';
import BackButton from '@/components/BackButton';
import { Ionicons } from '@expo/vector-icons';

const VideoManager = () => {
  const { videoId } = useLocalSearchParams();
  const [videoSource, setVideoSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const video = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.videosCollectionId,
          videoId
        );

        if (!video.video || typeof video.video !== 'string') {
          throw new Error("Invalid or missing video URL");
        }

        setVideoSource(video.video);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setVideoSource(null);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const skip = async (seconds) => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (status.positionMillis) {
      videoRef.current.setPositionAsync(status.positionMillis + seconds * 1000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-black">Loading video...</Text>
        </View>
      ) : videoSource ? (
        <View className="flex-1 justify-center items-center">
          <View className="mt-10 w-11/12 aspect-[9/16] border-2 border-black rounded-2xl overflow-hidden">
            <Video
              ref={videoRef}
              source={{ uri: videoSource }}
              style={{ width: '100%', height: '100%' }}
              shouldPlay={true}
              useNativeControls={false}
            />
          </View>

          <View className="flex-row justify-center items-center mt-2 mb-5 space-x-8">
            <TouchableOpacity onPress={() => skip(-5)}>
              <Ionicons name="play-back" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayback}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => skip(5)}>
              <Ionicons name="play-forward" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text className="text-black text-center">Video not found</Text>
      )}
    </SafeAreaView>
  );
};

export default VideoManager;
