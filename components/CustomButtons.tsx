import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  activeOpacity?: number;
}

const CustomButtons: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  buttonStyle,
  textStyle,
  disabled = false,
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={activeOpacity}
      disabled={disabled}
      className={`bg-stone-500 rounded-md min-h-[50px] justify-center items-center ${
        disabled ? 'opacity-50' : ''
      }`}
      style={buttonStyle}
    >
      <Text
        className="text-lg"
        style={textStyle}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButtons;
