import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

import { router, usePathname } from 'expo-router'


const SearchInput = ({ initialQuery = '' }: { initialQuery?: string }) => {

    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery)


    return (
            <View className='w-full flex-row items-center h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary space-x-4'>
                <TextInput
                    className='flex-1 text-white font-pregular text-base'
                    value={query}
                    placeholder='Search for a video'
                    placeholderTextColor={'#7b7b8b'}
                    onChangeText={(e) => setQuery(e)}
                   
                />

                <TouchableOpacity
                onPress={() => {
                    if(!query) return

                    if(pathname.startsWith('/search')) router.setParams({ query })
                        else router.push(`/search/${ query }`)
                }}
                >
                    <Image
                    source= {icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
    )
}

export default SearchInput