import { Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { databases, appwriteConfig } from '../../lib/appwriteConfig';
import { SafeAreaView } from 'react-native';
import BackButton from '@/components/BackButton';

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
          <View className="mt-10 w-10/12 aspect-[9/16] overflow-hidden relative">
            <Video
              ref={videoRef}
              source={{ uri: videoSource }}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
              shouldPlay={true}
              useNativeControls={false}
            />
            <View className="absolute bottom-5 left-0 right-0 flex-row justify-center items-center space-x-8">
              <TouchableOpacity onPress={() => skip(-5)}>
                <Image source={require("../../assets/ui/zurueckSpulenButton.png")} className="w-14 h-14" resizeMode="contain" tintColor="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlayback}>
                <Image source={require("../../assets/ui/PlayButton.png")} className="w-24 h-24" resizeMode="contain" tintColor="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => skip(5)}>
                <Image source={require("../../assets/ui/vorSpulenButton.png")} className="w-14 h-14" resizeMode="contain" tintColor="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Text className="text-black text-center">Video not found</Text>
      )}
    </SafeAreaView>
  );
};

export default VideoManager;
