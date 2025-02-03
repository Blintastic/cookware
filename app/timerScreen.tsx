import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';
import { Picker } from '@react-native-picker/picker'; // Import the picker

const TimerScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && remainingTime !== null) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 0) {
            clearInterval(interval!);
            setIsRunning(false);
            return null;
          }
          return prev! - 1000;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, remainingTime]);

  const handleSetTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60;
    if (totalSeconds > 0) {
      setRemainingTime(totalSeconds * 1000);
      setIsRunning(true);
      router.back();
    }
  };

  const handleCancelTimer = () => {
    setHours(0);
    setMinutes(0);
    setRemainingTime(null);
    setIsRunning(false);
    router.back();
  };

  const handleButtonPress = () => {
    if (isRunning) {
      setIsRunning(false);
      setRemainingTime(null);
    } else {
      const totalSeconds = hours * 3600 + minutes * 60;
      setRemainingTime(totalSeconds * 1000);
      setIsRunning(true);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <BackButton />

      <Text className="text-2xl mb-4">
        {remainingTime !== null
          ? `Remaining Time: ${Math.floor(remainingTime / 1000)}s`
          : 'Set Timer Duration:'}
      </Text>

      {!isRunning && remainingTime === null && (
        <View className="flex-row items-center">
          {/* Hours Picker */}
          <Picker
            selectedValue={hours}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => setHours(Number(itemValue))}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <Picker.Item key={i} label={`${i} h`} value={i} />
            ))}
          </Picker>

          {/* Minutes Picker */}
          <Picker
            selectedValue={minutes}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue) => setMinutes(Number(itemValue))}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <Picker.Item key={i} label={`${i} min`} value={i} />
            ))}
          </Picker>
        </View>
      )}

      {!isRunning && remainingTime === null && (
        <TouchableOpacity
          className="bg-green-500 p-4 rounded mt-4"
          onPress={handleSetTimer}
        >
          <Text className="text-white">Set Timer</Text>
        </TouchableOpacity>
      )}

      {isRunning && (
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded mt-4"
          onPress={handleButtonPress}
        >
          <Text className="text-white">Stop Timer</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className="bg-red-500 p-4 rounded mt-4"
        onPress={handleCancelTimer}
      >
        <Text className="text-white">Cancel Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerScreen;
