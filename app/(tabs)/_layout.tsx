import { View, Text, Image, StatusBar } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import React from 'react';


interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
  className?: string;
}

const TabIcon = ({ className, icon, color, name, focused }: TabIconProps) => {
  return (
    <View className='items-center justify-center gap-2 w-20'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className={`w-6 h-6 ${className}`}
      />
      <Text className={`text-[10px] ${focused ? ' font-psemibold' : 'font-pregular'}`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}


const TabsLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
      <Tabs
        screenOptions={
          {
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA011',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: 'transparent',
              height: 80,
              paddingTop: 12
            }
          }
        }
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused} />
            )
          }}
        />

        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused} />
            )
          }}
        />

        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused} />
            )
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused} />
            )
          }}
        />

        <Tabs.Screen
          name='directustest'
          options={{
            title: 'DirectusTest',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.directus}
                color={color}
                name="DirectusTest"
                focused={focused} 
                />
            )
          }}
        />

      </Tabs>
    </>
  )
}

export default TabsLayout