import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, contentContainerStyle, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[42px] py-4 justify-center items-center px-6 mt-9 ${contentContainerStyle} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
