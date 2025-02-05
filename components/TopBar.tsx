import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu'; // Import the HamburgerMenu

const HomescreenBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-black relative">
        {/* Placeholder for logo or other content */}
        <View className="w-10 h-10 bg-gray-300 rounded-md" />

        {/* SearchBar */}
        <SearchBar />

        {/* Hamburger Menu Button */}
        <TouchableOpacity 
          style={{ position: 'absolute', right: 16, top: 16 }} 
          onPress={toggleMenu}
        >
          <Text style={{ fontSize: 24 }}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Render HamburgerMenu and pass the state and toggle function */}
      <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </SafeAreaView>
  );
};

export default HomescreenBar;
