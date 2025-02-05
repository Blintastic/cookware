import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  Modal,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  index: undefined;
  cameraScreen: undefined;
  recipes: undefined;
  shoppingListScreen: undefined;
};

const HamburgerMenu = ({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Create an animated value for the drawer
  const [drawerAnimation] = useState(new Animated.Value(300)); // Start off-screen

  useEffect(() => {
    // Animate the drawer based on the isOpen state
    Animated.timing(drawerAnimation, {
      toValue: isOpen ? 0 : 300, // Slide in (0) or out (300)
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]); // Run animation every time isOpen changes

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    toggleMenu(); // Close the menu after navigation
  };

  return (
    <Modal transparent={true} visible={isOpen} animationType="none" onRequestClose={toggleMenu}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={styles.overlay}>
          {/* Drawer Menu */}
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.drawer,
                {
                  transform: [{ translateX: drawerAnimation }], // Animate sliding in/out
                },
              ]}
            >
              {/* Close Button */}
              <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                <Text style={styles.closeText}>✖️</Text>
              </TouchableOpacity>

              {/* Menu Items */}
              <TouchableOpacity onPress={() => navigateTo("index")} style={styles.menuItem}>
                <Text style={styles.menuText}>Zuhause</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo("cameraScreen")} style={styles.menuItem}>
                <Text style={styles.menuText}>Kamera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo("recipes")} style={styles.menuItem}>
                <Text style={styles.menuText}>Rezepte</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateTo("shoppingListScreen")} style={styles.menuItem}>
                <Text style={styles.menuText}>Einkaufswagen</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "flex-end", // Align drawer to the right
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    width: "75%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 40,
  },
  closeButton: {
    alignItems: "flex-end",
  },
  closeText: {
    fontSize: 24,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    color: "black",
    fontSize: 18,
  },
});

export default HamburgerMenu;