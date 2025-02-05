import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
}

interface ShoppingListContextType {
  openList: ShoppingItem[];
  acquiredList: ShoppingItem[];
  addToOpenList: (name: string, quantity: string) => void;
  moveToAcquiredList: (id: string) => void;
  moveToOpenList: (id: string) => void;
  clearAcquiredList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openList, setOpenList] = useState<ShoppingItem[]>([]);
  const [acquiredList, setAcquiredList] = useState<ShoppingItem[]>([]);

  // Load shopping lists from local storage on app start
  useEffect(() => {
    const loadShoppingLists = async () => {
      try {
        const storedOpenList = await AsyncStorage.getItem("openList");
        const storedAcquiredList = await AsyncStorage.getItem("acquiredList");

        if (storedOpenList) setOpenList(JSON.parse(storedOpenList));
        if (storedAcquiredList) setAcquiredList(JSON.parse(storedAcquiredList));
      } catch (error) {
        console.error("Error loading shopping lists:", error);
      }
    };
    loadShoppingLists();
  }, []);

  // Save shopping lists to local storage whenever they change
  useEffect(() => {
    const saveShoppingLists = async () => {
      try {
        await AsyncStorage.setItem("openList", JSON.stringify(openList));
        await AsyncStorage.setItem("acquiredList", JSON.stringify(acquiredList));
      } catch (error) {
        console.error("Error saving shopping lists:", error);
      }
    };

    saveShoppingLists();
  }, [openList, acquiredList]);

  const addToOpenList = (name: string, quantity: string) => {
    const newItem: ShoppingItem = { id: Date.now().toString(), name, quantity };
    setOpenList((prev) => [...prev, newItem]);
  };

  const moveToAcquiredList = (id: string) => {
    const itemToMove = openList.find((item) => item.id === id);
    if (itemToMove) {
      setOpenList((prev) => prev.filter((item) => item.id !== id));
      setAcquiredList((prev) => [...prev, itemToMove]);
    }
  };

  const moveToOpenList = (id: string) => {
    const itemToMove = acquiredList.find((item) => item.id === id);
    if (itemToMove) {
      setAcquiredList((prev) => prev.filter((item) => item.id !== id));
      setOpenList((prev) => [...prev, itemToMove]);
    }
  };

  const clearAcquiredList = () => {
    setAcquiredList([]);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        openList,
        acquiredList,
        addToOpenList,
        moveToAcquiredList,
        moveToOpenList,
        clearAcquiredList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) throw new Error("useShoppingList must be used within a ShoppingListProvider");
  return context;
};