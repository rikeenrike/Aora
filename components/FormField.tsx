import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

interface FormFieldProps {
    title: string
    value: string
    placeholder: string
    handleChangeText: (e: string) => void
    otherStyles?: string
    keyboardType?: 'email-address' | 'default'
}

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType, placeholder }: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium mb-2'>{title}</Text>
            <View className='w-full flex-row items-center h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary '>
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={'#7b7b8b'}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                        source= {showPassword ? icons.eye : icons.eyeHide}
                        className='w-6 h-6'
                        resizeMode='contain'
                        />
                    </TouchableOpacity>            
                )}
            </View>
        </View>
    )
}

export default FormField