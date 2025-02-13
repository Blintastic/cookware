import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { router } from "expo-router";
import BackButton from "@/components/BackButton";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";

type TimerScreenProps = {
  onSaveTimer: (duration: number) => void;
};

const TimerScreen = ({ onSaveTimer }: TimerScreenProps) => {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSetTimer = () => {
    const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
    if (totalSeconds > 0) {
      onSaveTimer(totalSeconds); // Pass the timer duration back to the parent
      router.back();
    }
  };

  const handleCancelTimer = () => {
    setHours("0");
    setMinutes("0");
    router.back();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Back Button */}
      <BackButton />

      {/* Title */}
      <Text style={styles.title}>Setze die Kochzeit</Text>

      {/* Time Display */}
      <View style={styles.timeDisplay}>
        <Text style={styles.timeText}>
          {`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`}
        </Text>
      </View>

      {/* Pickers */}
      <View style={styles.pickersContainer}>
        {/* Hours Picker */}
        <Picker
          selectedValue={hours}
          style={styles.picker}
          onValueChange={(itemValue) => setHours(itemValue)}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item key={i} label={`${i} h`} value={i.toString()} />
          ))}
        </Picker>

        {/* Minutes Picker */}
        <Picker
          selectedValue={minutes}
          style={styles.picker}
          onValueChange={(itemValue) => setMinutes(itemValue)}
        >
          {Array.from({ length: 60 }, (_, i) => (
            <Picker.Item key={i} label={`${i} min`} value={i.toString()} />
          ))}
        </Picker>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSetTimer}>
          <Text style={styles.buttonText}>Timer starten</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelTimer}>
          <Text style={styles.buttonText}>Abbrechen</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  timeDisplay: {
    alignItems: "center",
    marginBottom: 30,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ff6f61",
  },
  pickersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  picker: {
    width: 120,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#ff6f61",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default TimerScreen;