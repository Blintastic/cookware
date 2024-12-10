import { useState } from "react";
import { Text, TextInput, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import CustomButtons from "@/components/CustomButtons";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/recipe?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center bg-white px-4">
        {/* Header */}
        <Text className="text-3xl font-bold text-gray-800 mb-6">Welcome to Cookware</Text>
        <Text className="text-lg text-gray-600 mb-8">
          Search for your favorite recipes or explore our features!
        </Text>

        {/* Search Bar */}
        <View className="w-full max-w-md mb-6">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for recipes..."
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-lg shadow-sm"
            placeholderTextColor="gray"
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
        </View>

        {/* Buttons */}
        <CustomButtons
          title="Scanning Feature"
          handlePress={() => router.push("/cameraScreen")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
