import React from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu';

const HomescreenBar = () => {
  return (
    <SafeAreaView className="bg-white -mt-2">
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-black">
        <View className="w-10 h-10 bg-gray-300 rounded-md" />

        <SearchBar/>

        <HamburgerMenu/>
      </View>
    </SafeAreaView>
  );
};

export default HomescreenBar;
