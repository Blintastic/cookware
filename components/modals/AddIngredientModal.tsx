import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { databases, appwriteConfig } from "@/lib/appwriteConfig";
import { useShoppingList } from "@/app/manager/ShoppingListContext";

interface AddIngredientModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const units = ["Kg.", "L.", "Stk."];

export default function AddIngredientModal({ isVisible, onClose }: AddIngredientModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(units[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { addToOpenList } = useShoppingList();

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

    if (isVisible) fetchIngredients();
  }, [isVisible]);

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

  const handleAdd = () => {
    if (selectedIngredient) {
      addToOpenList(selectedIngredient, `${quantity} ${unit}`);
      onClose();
    }
  };

  const handleIngredientSelect = (ingredient: string) => {
    setSelectedIngredient(ingredient);
    setSearchTerm(ingredient);
    setShowDropdown(false);
    Keyboard.dismiss();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Zutat hinzufügen</Text>

            <TextInput
              style={styles.input}
              placeholder="Zutat suchen..."
              placeholderTextColor="#888888"
              value={searchTerm}
              onChangeText={handleSearch}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setShowDropdown(false)}
            />

            {showDropdown && searchTerm && (
              <FlatList
                data={filteredIngredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleIngredientSelect(item)}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
              />
            )}

            <View style={styles.unitPicker}>
              <Text style={styles.label}>Einheit:</Text>
              <View style={styles.unitButtons}>
                {units.map((u) => (
                  <TouchableOpacity
                    key={u}
                    style={[styles.unitButton, unit === u && styles.selectedUnitButton]}
                    onPress={() => setUnit(u)}
                  >
                    <Text style={styles.unitButtonText}>{u}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.quantitySelector}>
              <Text style={styles.label}>Menge:</Text>
              <View style={styles.quantityButtons}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity((prev) => prev + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Hinzufügen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownText: {
    fontSize: 16,
  },
  unitPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  unitButtons: {
    flexDirection: "row",
  },
  unitButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 5,
  },
  selectedUnitButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  unitButtonText: {
    color: "#000",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#dc3545",
    fontSize: 16,
    fontWeight: "bold",
  },
});