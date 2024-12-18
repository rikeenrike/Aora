import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { createAccount } from '@/lib/appwrite';

const SignUp = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const submitForm = async () => {
    if (!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields')
    }
 
    setIsSubmitting(true)

    try {
     const res = await createAccount(form.email, form.password, form.username)

     if(res){
      router.replace('/home')
     }

    }catch(err){
      console.log(err)
    }finally{
      setIsSubmitting(false)
    }

  }

  const [isSumbitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold font-psemibold mt-10'>Create an Account!</Text>

          <FormField
            title='Username'
            placeholder='Enter your Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles='mt-7'
          />

          <FormField
            title='Email'
            placeholder='Enter your email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            placeholder='Enter your password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Create Account'
            handlePress={submitForm}
            containerStyle={'mt-7 w-full'}
            isLoading={isSumbitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-white text-center font-psemibold text-lg mt-5'>Have an Existing account? {''}
              <Text className='text-secondary-200' onPress={() => navigation.goBack()}>Log in!</Text>
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;