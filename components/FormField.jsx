import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyBoardType,
  placeholder
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-psemibold">{title}</Text>
{/* 
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      > */}
        <View className="border-2 border-black-200 w-full h-16 px-8 py-5 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            className='w-full text-white'
            keyboardType={keyBoardType}
          />
          {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={title === "Password" ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default FormField;
