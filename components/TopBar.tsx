import React from 'react';
import { View, SafeAreaView } from 'react-native';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu'; // Import the HamburgerMenu

const HomescreenBar = () => {
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-black relative">
        {/* Placeholder for logo or other content */}
        <View className="w-10 h-10 bg-gray-300 rounded-md" />

        {/* SearchBar */}
        <SearchBar />

        {/* HamburgerMenu with absolute positioning */}
        <View style={{ position: 'absolute', right: 16, top: 16, zIndex: 100 }}>
          <HamburgerMenu />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomescreenBar;