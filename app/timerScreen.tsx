import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';
import { Picker } from '@react-native-picker/picker';

const TimerScreen = () => {
  const [hours, setHours] = useState('0'); // Store hours as a string
  const [minutes, setMinutes] = useState('0'); // Store minutes as a string

  const handleSetTimer = () => {
    const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
    if (totalSeconds > 0) {
      console.log(`Timer set for ${totalSeconds} seconds`);
      router.back();
    }
  };

  const handleCancelTimer = () => {
    setHours('0');
    setMinutes('0');
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      {/* Title */}
      <Text style={styles.title}>Set Timer Duration:</Text>

      {/* Selected Time Display */}
      <View style={styles.selectedTimeContainer}>
        <Text style={styles.selectedTimeText}>
          {`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`}
        </Text>
      </View>

      {/* Pickers Container */}
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

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Set Timer Button */}
        <TouchableOpacity style={styles.button} onPress={handleSetTimer}>
          <Text style={styles.buttonText}>Set Timer</Text>
        </TouchableOpacity>

        {/* Cancel Timer Button */}
        <TouchableOpacity style={styles.button} onPress={handleCancelTimer}>
          <Text style={styles.buttonText}>Cancel Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectedTimeContainer: {
    marginBottom: 20, // Add space below the selected time display
  },
  selectedTimeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  pickersContainer: {
    flexDirection: 'row', // Place pickers side by side
    alignItems: 'center',
    marginBottom: 30, // Add space below the pickers
  },
  picker: {
    height: 50,
    width: 100,
    marginHorizontal: 10, // Add horizontal spacing between pickers
  },
  buttonsContainer: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center', // Center buttons horizontally
  },
  button: {
    backgroundColor: '#4CAF50', // Green for Set Timer
    padding: 15,
    borderRadius: 8,
    marginBottom: 10, // Add vertical spacing between buttons
    width: '80%', // Make buttons take up 80% of the screen width
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TimerScreen;