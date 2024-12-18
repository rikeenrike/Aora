import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/globalprovider';

const SignIn = () => {
  const { setUser, setIsLoggedin } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submitForm = async () => {
    if (!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all fields')
    }

    setIsSubmitting(true)

    try {
     await signIn(form.email, form.password)
     const result: any = await getCurrentUser();
     if (result) {
       setUser(result)
     } else {
       setUser(null)
     }
     setIsLoggedin(true)

     router.replace('/home')
     
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
          <Text className='text-2xl text-white text-semibold font-psemibold mt-10'>Log in to Aora</Text>

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
            title='Log in'
            handlePress={submitForm}
            containerStyle={'mt-7 w-full'}
            isLoading={isSumbitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-white text-center font-psemibold text-lg mt-5'>Don't have an account? {''}
              <Link className='text-secondary-200' href='/sign-up' >Sign up!</Link>
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;

