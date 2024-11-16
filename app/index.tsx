import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">cookware</Text>
      <Link href="/cameraScreen" style={{color:'blue'}}>Go to Camera</Link>
    </View>
  );
}
