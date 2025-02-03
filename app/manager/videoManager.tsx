import { databases, appwriteConfig } from "../../lib/appwriteConfig";

interface VideoData {
  title: string;
  thumbnail: string;
  video: string;
}

const iconToVideoMap: Record<string, string> = {
  testIcon1: "Klare Suppe - Schneiden",
};

export const fetchVideoForIcon = async (iconName: string): Promise<VideoData | null> => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    const videos = response.documents;
    const matchedVideo = videos.find((video) => video.title === iconToVideoMap[iconName]);

    if (matchedVideo) {
      return {
        title: matchedVideo.title,
        thumbnail: matchedVideo.thumbnail,
        video: matchedVideo.video,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

export default fetchVideoForIcon;
