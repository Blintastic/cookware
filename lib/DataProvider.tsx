// lib/DataContext.js
import React, { createContext, useState, useEffect } from "react";
import { databases, appwriteConfig } from "./appwriteConfig";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.recipesCollectionId
      );
      setAllRecipes(response.documents);
      setRecipes(response.documents); // Initially, all recipes are shown
    } catch (error) {
      console.error("Failed to fetch recipes: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allRecipes.length === 0) {
      fetchRecipes();
    }
  }, []);

  const filterRecipes = (query) => {
    if (!query) {
      setRecipes(allRecipes); // Show all recipes if no query
      return;
    }
    const lowercaseQuery = query.toLowerCase();
    const filtered = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowercaseQuery)
    );
    setRecipes(filtered);
  };

  return (
    <DataContext.Provider
      value={{ recipes, allRecipes, loading, fetchRecipes, filterRecipes }}
    >
      {children}
    </DataContext.Provider>
  );
};