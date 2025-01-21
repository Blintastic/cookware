import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleMenu} className="p-2">
        <Text className="text-2xl">☰</Text>
      </TouchableOpacity>

      {isOpen && (
        <View
          className="absolute right-0 top-12 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-40"
          style={{ elevation: 5 }} // For Android shadow
        >
          <TouchableOpacity
            onPress={() => alert("Navigate to Page 1")}
            className="px-4 py-3 border-b border-gray-200"
          >
            <Text className="text-black">Page 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Navigate to Page 2")}
            className="px-4 py-3 border-b border-gray-200"
          >
            <Text className="text-black">Page 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Navigate to Page 3")}
            className="px-4 py-3"
          >
            <Text className="text-black">Page 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HamburgerMenu;
