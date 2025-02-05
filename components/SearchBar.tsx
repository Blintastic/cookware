import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard } from "react-native";
import { router } from "expo-router";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/recipes?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <View className="flex-1 flex-row items-center border border-black rounded-full px-3 mx-3 h-10 mr-8">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for recipes..."
        placeholderTextColor="gray"
        returnKeyType="search" // Changes the keyboard action button to "Search"
        onSubmitEditing={handleSearchSubmit} // Trigger navigation on Enter/Submit
        className="flex-1 text-black text-base"
      />
      <TouchableOpacity onPress={handleSearchSubmit}>
        <Text className="text-black text-base">🔍</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
