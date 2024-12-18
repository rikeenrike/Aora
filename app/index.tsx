import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '@/components/CustomButton';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/globalprovider';

export default function App() {
    const { isLoading, isLoggedin } = useGlobalContext();

    useEffect(() => {
        if (!isLoading && isLoggedin) {
            router.replace('/home');
        }
    }, [isLoading, isLoggedin]);

    if (isLoading) {
        return (
            <SafeAreaView className='bg-primary h-full'>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='px-4 min-h-[85vh] justify-center items-center'>
                    <Image
                        source={images.logo}
                        className='w-[130px] h-[84px]'
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className='max-w-[380px] w-full h-[300px]'
                        resizeMode='contain'
                    />

                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            Discover the endless possibilities with {""}
                            <Text className='text-secondary-200'>
                                Aora
                            </Text>
                        </Text>
                        <Image
                            source={images.path}
                            className='w-[136px] h-[15px] absolute -bottom-3 -right-8'
                            resizeMode='contain'
                        />
                    </View>

                    <Text className='font-pregular text-sm text-grey-100 text-white mt-7 text-center'>Where creativity meets innovation : embark on a journey of limitless exploration with Aora</Text>

                    <CustomButton
                        title='Get Started'
                        containerStyle='mt-7 w-full'
                        textStyle='text-xl'
                        handlePress={() => { router.push('/sign-in') }}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}