import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image} from "react-native";
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
    <View className="flex-1 flex-row items-center px-3 h-14 bg-gray-100 rounded-2xl mt-12">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rezepte suchen"
        placeholderTextColor="gray"
        returnKeyType="search" // Changes the keyboard action button to "Search"
        onSubmitEditing={handleSearchSubmit} // Trigger navigation on Enter/Submit
        className="flex-1 text-black text-xl font-lolight mb-1"
      />
      <TouchableOpacity onPress={handleSearchSubmit}>
        <Image
          source={require("../assets/ui/search-icon-2-614x460.png")}
          style={{width: 40, height:40}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
