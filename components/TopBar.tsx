import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu'; // Import the HamburgerMenu

const HomescreenBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-2 relative">
        <View className="absolute top-0 ml-6">
          <Image
            source={require("../assets/ui/logo.png")}
            style={{ width: 50, height: 44 }}          
          />
        </View>

        {/* Centered HOME text PLACEHOLDER*/}
        <Text className="font-lobold text-xl absolute top-2 left-1/2 -translate-x-1/2">
          HOME
        </Text>

        <SearchBar />

        <TouchableOpacity 
          style={{ position: 'absolute', right: 29, top: 14 }} 
          onPress={toggleMenu}
        >
          <Image
            source={require("../assets/ui/Hamburger_menu.png")} 
            style={{ width: 21, height: 16 }}         
          />
        </TouchableOpacity>
      </View>

      {/* Render HamburgerMenu and pass the state and toggle function */}
      <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </SafeAreaView>
  );
};

export default HomescreenBar;
