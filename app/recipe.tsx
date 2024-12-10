import { View, Text, ScrollView } from "react-native";

export default function RecipeScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-4">
      <View className="items-center mt-8">
        <Text className="text-4xl font-bold text-gray-800">Recipe Title</Text>
        <Text className="text-lg text-gray-600 mt-2">A short recipe description.</Text>
      </View>

      <View className="mt-8">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">Recipe Overview</Text>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Text className="text-gray-700">
            - Prep Time: 20 minutes
          </Text>
          <Text className="text-gray-700 mt-2">
            - Cook Time: 30 minutes
          </Text>
          <Text className="text-gray-700 mt-2">
            - Servings: 4
          </Text>
        </View>
      </View>

      <View className="mt-8">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</Text>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Text className="text-gray-700">- 1 cup of flour</Text>
          <Text className="text-gray-700 mt-2">- 2 eggs</Text>
          <Text className="text-gray-700 mt-2">- 1/2 cup of milk</Text>
          <Text className="text-gray-700 mt-2">- 1 tsp salt</Text>
          <Text className="text-gray-700 mt-2">- 1 tbsp sugar</Text>
        </View>
      </View>

      <View className="mt-8 mb-12">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">Shopping List</Text>
        <View className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Text className="text-gray-700">- Buy fresh eggs</Text>
          <Text className="text-gray-700 mt-2">- Get 1 pack of flour</Text>
          <Text className="text-gray-700 mt-2">- Milk (2 liters)</Text>
          <Text className="text-gray-700 mt-2">- Salt</Text>
          <Text className="text-gray-700 mt-2">- Sugar</Text>
        </View>
      </View>
    </ScrollView>
  );
}
