import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu'; 
import { router } from 'expo-router';

const HomescreenBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center justify-between px-4 py-2 relative">
        <View className="absolute top-0 ml-6">
          <TouchableOpacity
            onPress={() => router.push(`/`)}
          >
            <Image
              source={require("../assets/images/bildlogo_app.png")}
              style={{ width: 50, height: 50 }}          
            />
          </TouchableOpacity>
        </View>

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
