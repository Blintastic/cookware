import { View, Text, ScrollView, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import {databases, appwriteConfig} from "../lib/appwriteConfig"

export default function RecipeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try{
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.recipesCollectionId
      );
      setRecipes(response.documents);
    } catch(error) {
      console.error("Failed to fetch recipes: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white px-4">
      <Text className="text-4xl font-bold text-gray-800 text-center mt-20">
        All Recipes
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        recipes.map((recipe) => (
          <View
            key={recipe.$id}
            className="bg-gray-100 p-4 mt-6 rounded-lg shadow-md"
          >
            <Text className="text-2xl font-semibold text-gray-800">
              {recipe.title}
            </Text>
            <Text className="text-gray-600 mt-2">{recipe.description}</Text>
            <View className="mt-4">
              <Text className="text-gray-700">
                Prep Time: {recipe.prep_time} minutes
              </Text>
              <Text className="text-gray-700 mt-1">
                Cook Time: {recipe.cook_time} minutes
              </Text>
              <Text className="text-gray-700 mt-1">
                Servings: {recipe.servings}
              </Text>
              <Text className="text-gray-700 mt-1">
                Making: {recipe.making}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
