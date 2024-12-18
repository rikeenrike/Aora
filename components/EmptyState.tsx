import { View, Text, Image } from 'react-native'
import { images } from '@/constants'
import React from 'react'
import CustomButton from './CustomButton';
import { router } from 'expo-router';


interface EmptyStateProps {
    title: string;
    description: string;
}



const EmptyState = ({ title, description }: EmptyStateProps) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image
                source={images.empty}
                className='w-[270px] h-[270px]'
                resizeMode='contain'
            />
            <Text className='text-2xl font-pmedium text-gray-100'>
                {title}
            </Text>
            <Text className='text-base font-pregular text-gray-100 mt-2 text-center'>
                {description}
            </Text>

            <CustomButton
                title='Create a video'
                handlePress={() => router.push('/create')}
                containerStyle='w-full my-5'
            />
        </View>
    )
}

export default EmptyState