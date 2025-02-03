import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    setIsOpen(false); // Close the menu after navigation
  };

  return (
    <View style={{ position: 'relative' }}>
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleMenu} style={{ padding: 8 }}>
        <Text style={{ fontSize: 24 }}>☰</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: 40, // Adjust this value to position the dropdown below the hamburger icon
            right: 0,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#d1d5db', // Tailwind's gray-300
            borderRadius: 8, // Tailwind's rounded-lg
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5, // For Android shadow
            zIndex: 100, // Ensure it overlaps other components
            width: 160, // Tailwind's w-40
          }}
        >
          <TouchableOpacity
            onPress={() => navigateTo("Home")}
            style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }} // Tailwind's px-4 py-3 border-b border-gray-200
          >
            <Text style={{ color: 'black' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Settings")}
            style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }} // Tailwind's px-4 py-3 border-b border-gray-200
          >
            <Text style={{ color: 'black' }}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateTo("Profile")}
            style={{ paddingHorizontal: 16, paddingVertical: 12 }} // Tailwind's px-4 py-3
          >
            <Text style={{ color: 'black' }}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HamburgerMenu;