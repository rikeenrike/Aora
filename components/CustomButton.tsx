import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title?: string;
    handlePress: () => void;
    containerStyle?: any;
    textStyle?: any;
    isLoading?: boolean;
}



const CustomButton = ({title, handlePress, containerStyle, textStyle, isLoading} : CustomButtonProps ) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.8}
    disabled={isLoading}
    className={`bg-secondary rounded-xl border min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}>
      
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton