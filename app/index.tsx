import { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import CustomButtons from "@/components/CustomButtons";

import { Text } from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <View className="absolute right-1 top-32 space-y-4 z-10 mt-5">
          <TouchableOpacity className="w-14 h-14 bg-slate-300 rounded-full justify-center items-center" onPress={() => router.push("/shoppingListScreen")}>
            <Text className="text-gray-600 text-base">🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-14 bg-slate-300 rounded-full justify-center items-center">
            <Text className="text-gray-600 text-base">▶️</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-14 bg-slate-300 rounded-full justify-center items-center">
            <Text className="text-gray-600 text-base">🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-14 h-14 bg-slate-300 rounded-full justify-center items-center">
            <Text className="text-gray-600 text-base">☰</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center px-4 py-6">
            {/* Recipe of the Day */}
            <View className="w-11/12 max-w-md bg-gray-200 rounded-lg p-4 mb-6">
              <Text className="text-xl font-bold mb-2">Rezept des Tages</Text>
              <View className="w-full h-40 bg-gray-300 rounded-lg mb-4" />
              <Text className="text-gray-700 text-base mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <View className="flex-row justify-between space-x-4">
                <CustomButtons
                  title="Zutaten Anzeigen"
                  handlePress={() => alert('Button Pressed!')}
                  buttonStyle={{ backgroundColor: 'grey', paddingHorizontal: 8 }}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                  disabled={false}
                />

                <CustomButtons
                  title="Jetzt Kochen"
                  handlePress={() => alert('Button Pressed!')}
                  buttonStyle={{ backgroundColor: 'grey', paddingHorizontal: 10 }}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                  disabled={false}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          className="absolute bottom-8 self-center bg-gray-300 rounded-full p-10 z-10"
          onPress={() => router.push("/cameraScreen")}
        >
          <Text className="text-gray-600 text-2xl">📷</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
