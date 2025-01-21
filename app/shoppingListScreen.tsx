import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { databases } from "../lib/appwriteConfig";
import { appwriteConfig } from "../lib/appwriteConfig";
import BackButton from "@/components/BackButton";
import CustomButtons from "@/components/CustomButtons";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
}

export default function ShoppingListScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState<"open" | "acquired">("open");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: "1", name: "Karotten", quantity: "1 Stk." },
    { id: "2", name: "Mehl", quantity: "2 Kg" },
    { id: "3", name: "Salz", quantity: "1 Pkg." },
  ]);
  const [acquiredList, setAcquiredList] = useState<ShoppingItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.ingredientsCollectionId
        );
        const fetchedIngredients = response.documents.map((doc) => doc.ingredient);
        setIngredients(fetchedIngredients);
        setFilteredIngredients(fetchedIngredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  const toggleTab = (selectedTab: "open" | "acquired") => {
    setTab(selectedTab);
  };

  const handleRemove = (id: string) => {
    if (tab === "open") {
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
    } else {
      const itemToMove = acquiredList.find((item) => item.id === id);
      if (itemToMove) {
        setAcquiredList((prev) => prev.filter((item) => item.id !== id));
        setShoppingList((prev) => [...prev, itemToMove]);
      }
    }
  };

  const handleMoveToAcquired = (id: string) => {
    const itemToMove = shoppingList.find((item) => item.id === id);
    if (itemToMove) {
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
      setAcquiredList((prev) => [...prev, itemToMove]);
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim()) {
      const matches = ingredients.filter((ingredient) =>
        typeof ingredient === "string" &&
        ingredient.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredIngredients(matches);
      setShowDropdown(true);
    } else {
      setFilteredIngredients(ingredients);
      setShowDropdown(false);
    }
  };

  const handleAddToShoppingList = (name: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      quantity: "1 Pkg.",
    };
    setShoppingList((prev) => [...prev, newItem]);
    setIsModalVisible(false);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => (
    <View className="flex-row justify-between items-center py-2 px-4 bg-gray-100 rounded-md mb-2">
      <Text className="text-base">{item.name}</Text>
      <Text className="text-base">{item.quantity}</Text>
      <TouchableOpacity
        className="ml-4 bg-green-500 px-3 py-1 rounded-md"
        onPress={() =>
          tab === "open" ? handleMoveToAcquired(item.id) : handleRemove(item.id)
        }
      >
        <Text className="text-white text-sm">-</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <BackButton/>

      {/* Tabs */}
      <View className="flex-row justify-around mb-4 mt-3">
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            tab === "open" ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPress={() => toggleTab("open")}
        >
          <Text
            className={`text-sm ${
              tab === "open" ? "text-white" : "text-gray-800"
            }`}
          >
            Offen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            tab === "acquired" ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPress={() => toggleTab("acquired")}
        >
          <Text
            className={`text-sm ${
              tab === "acquired" ? "text-white" : "text-gray-800"
            }`}
          >
            Besorgt
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tab === "open" ? shoppingList : acquiredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-500 mt-4">
            Keine Einträge vorhanden.
          </Text>
        )}
      />
      <View className='mb-5'>
        <CustomButtons
          title="Zutat hinzufügen"
          handlePress={() => setIsModalVisible(true)}
          buttonStyle={{ backgroundColor: 'green', paddingHorizontal: 10 }}
          textStyle={{ color: 'white', fontWeight: 'medium' }}
          disabled={false}
        />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center mb-40">
          <View className="bg-slate-200 w-4/5 p-6 rounded-lg">
            <Text className="text-lg font-bold mb-4">Zutat hinzufügen</Text>

            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-2"
              placeholder="Zutat suchen..."
              placeholderTextColor="#888888"
              value={searchTerm}
              onChangeText={handleSearch}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setShowDropdown(false)}
            />

            {showDropdown && (
              <View style={{ maxHeight: 100, width: '100%' }}>
                <FlatList
                  data={filteredIngredients}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-2 bg-gray-100 rounded-md mb-2"
                      onPress={() => handleAddToShoppingList(item)}
                    >
                      <Text className="text-gray-800">{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyboardShouldPersistTaps="handled" // Ensures FlatList remains tappable with the keyboard open
                />
              </View>
            )}

            <TouchableOpacity
              className="mt-4 p-4 bg-blue-500 rounded-md"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-center text-white text-lg">Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



    </View>
  );
}
